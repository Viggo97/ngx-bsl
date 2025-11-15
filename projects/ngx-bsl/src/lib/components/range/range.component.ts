import {Component, ElementRef, inject, input, model, signal, OnInit, computed, viewChild, OnDestroy} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {RangeThumbComponent} from './range-thumb/range-thumb.component';
import {RangeMoveDirection} from './range-move-direction.enum';
import {getDigitsNumber, round} from '../../utils/number.util';

class Range {
    from: number;
    to: number;

    constructor(from = 0, to = 10) {
        this.from = from;
        this.to = to;
    }
}

enum Thumb {
    FROM = 'from',
    TO = 'to',
}

@Component({
    selector: 'ngx-bsl-range',
    imports: [
        RangeThumbComponent,
    ],
    templateUrl: './range.component.html',
    styleUrl: './range.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: RangeComponent,
        },
    ],
    host: {
        '[attr.aria-label]': 'null',
        '[attr.aria-labelledby]': 'null',
    },
})
export class RangeComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private elementRef = inject(ElementRef<HTMLElement>) as ElementRef<HTMLElement>;

    min = input(0);
    max = input(5);
    step = input(1);
    value = model(new Range(0, 5));
    ariaLabel = input<string | null>(null, {alias: 'aria-label'});
    ariaLabelledBy = input<string | null>(null, {alias: 'aria-labelledby'});

    protected thumbFromRef = viewChild.required<RangeThumbComponent, ElementRef<HTMLElement>>('thumbFrom',
        {read: ElementRef<HTMLElement>});
    protected thumbToRef = viewChild.required<RangeThumbComponent, ElementRef<HTMLElement>>('thumbTo',
        {read: ElementRef<HTMLElement>});

    protected _step = signal(1);
    protected disabled = signal(false);
    protected ratio = signal(0);
    protected thumbFromPosition = signal(0);
    protected thumbToPosition = signal(0);
    protected overlappingThumb = signal(Thumb.FROM);
    private stepDigits = computed(() => getDigitsNumber(this._step()));
    private thumbWidth = computed(() => this.thumbFromRef().nativeElement.offsetWidth || 0);
    protected trackerLeft = computed(() => `${this.thumbFromPosition() + this.thumbWidth() / 2}px`);
    protected trackerRight = computed(() => {
        const railWidth = this.elementRef.nativeElement.getBoundingClientRect().width || 0;
        return `${railWidth - this.thumbToPosition() - this.thumbWidth() / 2}px`;
    });

    protected readonly Thumb = Thumb;
    private resizeObserver!: ResizeObserver;

    onChange = (_value: number) => {
    };
    onTouch = () => {
    };

    ngOnInit(): void {
        this.validateRange();
        this.validateStep();
        this.initResizeObserver();
    }

    private validateRange(): void {
        let range: Range | null = null;

        if (Number.isNaN(this.value().from) || !this.valueInRange(this.value().from)) {
            range = new Range(this.min(), this.value().to);
        }

        if (Number.isNaN(this.value().to) || !this.valueInRange(this.value().to)) {
            if (range) {
                range.to = this.max();
            } else {
                range = new Range(this.value().from, this.max());
            }
        }

        if (this.value().from > this.value().to) {
            if (range) {
                range.from = this.min();
                range.to = this.max();
            } else {
                range = new Range(this.min(), this.max());
            }
        }

        if (range) {
            this.value.update(() => range);
        }
    }

    private valueInRange(value: number): boolean {
        return this.min() <= value && value <= this.max();
    }

    private validateStep(): void {
        const isStepDividerOfRange = (this.max() - this.min()) % this.step() === 0;
        this._step.set(isStepDividerOfRange ? this.step() : parseFloat(((this.max() - this.min()) / 10).toFixed(0)));
    }

    private initResizeObserver(): void {
        this.resizeObserver = new ResizeObserver(() => {
            this.computeRatio();
            this.computeFromThumbPosition();
            this.computeToThumbPosition();
        });
        this.resizeObserver.observe(this.elementRef.nativeElement);
    }

    private computeRatio(): void {
        const graduation = (this.max() - this.min()) / this._step();
        const hostWidth = this.elementRef.nativeElement.offsetWidth - this.thumbWidth();
        this.ratio.set(parseFloat((hostWidth / graduation).toFixed(3)));
    }

    private computeFromThumbPosition(): void {
        this.thumbFromPosition.set((this.value().from / this._step()) * this.ratio());
    }

    private computeToThumbPosition(): void {
        this.thumbToPosition.set(this.value().to / this._step() * this.ratio());
    }

    protected onPositionChangedThumbFrom(direction: RangeMoveDirection): void {
        if (this.disabled()) {
            return;
        }

        if (this.minReached(direction) || this.toReached(direction)) {
            return;
        }

        const diff = direction === RangeMoveDirection.BACKWARD ? -this._step() : this._step();
        const newFrom = this.value().from + diff;
        this.value.update((value) => new Range(round(newFrom, this.stepDigits()), value.to));
        this.computeFromThumbPosition();
        this.overlappingThumb.set(Thumb.FROM);
    }

    protected onPositionChangedThumbTo(direction: RangeMoveDirection): void {
        if (this.disabled()) {
            return;
        }

        if (this.maxReached(direction) || this.fromReached(direction)) {
            return;
        }

        const diff = direction === RangeMoveDirection.BACKWARD ? -this._step() : this._step();
        const newTo = this.value().to + diff;
        this.value.update((value) => new Range(value.from, round(newTo, this.stepDigits())));
        this.computeToThumbPosition();
        this.overlappingThumb.set(Thumb.TO);
    }

    private minReached(direction: RangeMoveDirection): boolean {
        return direction === RangeMoveDirection.BACKWARD && this.value().from === this.min();
    }

    private maxReached(direction: RangeMoveDirection): boolean {
        return direction === RangeMoveDirection.FORWARD && this.value().to === this.max();
    }

    private fromReached(direction: RangeMoveDirection): boolean {
        return direction === RangeMoveDirection.BACKWARD && this.value().from === this.value().to;
    }

    private toReached(direction: RangeMoveDirection): boolean {
        return direction === RangeMoveDirection.FORWARD && this.value().from === this.value().to;
    }

    protected onRailClick(event: MouseEvent): void {
        if (this.disabled()) {
            return;
        }

        const pointerPosition = event.pageX;
        const newValue = this.computeNewValueOnClick(pointerPosition);
        const thumb = this.selectThumbToMove(pointerPosition);
        if (thumb === Thumb.FROM) {
            this.value.update((value) => new Range(newValue, value.to));
            this.computeFromThumbPosition();
        } else {
            this.value.update((value) => new Range(value.from, newValue));
            this.computeToThumbPosition();
        }
    }

    private computeNewValueOnClick(pointerPosition: number): number {
        const hostPositionLeft = this.elementRef.nativeElement.getBoundingClientRect().left;
        const pointerOffsetFromHostEdge = pointerPosition - hostPositionLeft;
        const stepIndex = round((pointerOffsetFromHostEdge - this.thumbWidth() / 2) / this.ratio());
        return round(stepIndex * this._step(), this.stepDigits());
    }

    private selectThumbToMove(pointerPosition: number): Thumb {
        const fromThumbPosition = this.thumbFromRef().nativeElement.getBoundingClientRect().left;
        const toThumbPosition = this.thumbToRef().nativeElement.getBoundingClientRect().left;

        const pointerFromThumbDiff = Math.abs(pointerPosition - fromThumbPosition);
        const pointerToThumbDiff = Math.abs(pointerPosition - toThumbPosition);

        if (pointerFromThumbDiff < pointerToThumbDiff) {
            return Thumb.FROM;
        }

        if (pointerFromThumbDiff > pointerToThumbDiff) {
            return Thumb.TO;
        }

        // Pointer in the middle
        if (pointerPosition < pointerFromThumbDiff) {
            return Thumb.FROM;
        }

        return Thumb.TO;
    }

    registerOnChange(onChange: (value: number) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouch: () => void): void {
        this.onTouch = onTouch;
    }

    writeValue(value: { from: number, to: number }): void {
        this.value.set(value);
    }

    setDisabledState(disabled: boolean): void {
        this.disabled.set(disabled);
    }

    ngOnDestroy(): void {
        this.resizeObserver.disconnect();
    }
}
