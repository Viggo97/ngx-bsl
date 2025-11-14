import {Component,
    DOCUMENT,
    ElementRef,
    inject,
    input,
    OnDestroy,
    output,
    Renderer2} from '@angular/core';
import {RangeMoveDirection} from '../range-move-direction.enum';

@Component({
    selector: 'ngx-bsl-range-thumb',
    imports: [],
    template: '',
    styleUrl: './range-thumb.component.scss',
    host: {
        '(keydown.arrowLeft)': 'positionChanged.emit(RangeMoveDirection.BACKWARD)',
        '(keydown.arrowRight)': 'positionChanged.emit(RangeMoveDirection.FORWARD)',
        '(pointerdown)': 'onPointerDown($event)',
    },
})
export class RangeThumbComponent implements OnDestroy {
    private renderer = inject(Renderer2);
    private document = inject(DOCUMENT);
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

    ratio = input(0);

    positionChanged = output<RangeMoveDirection>();

    protected readonly RangeMoveDirection = RangeMoveDirection;
    private pointerUpListener: (() => void) | null = null;
    private pointerMoveListener: (() => void) | null = null;

    protected onPointerDown(event: PointerEvent): void {
        this.elementRef.nativeElement.setPointerCapture(event.pointerId);
        this.pointerUpListener = this.renderer.listen(
            this.document,
            'pointerup',
            this.onPointerUp.bind(this),
        );
        this.pointerMoveListener = this.renderer.listen(
            this.document,
            'pointermove',
            this.onPointerMove.bind(this),
        );
    }

    private onPointerUp(event: PointerEvent): void {
        this.elementRef.nativeElement.releasePointerCapture(event.pointerId);
        this.disposePointerUpListener();
        this.disposePointerMoveListener();
    }

    private onPointerMove(event: PointerEvent): void {
        const thumbPositionLeft = this.elementRef.nativeElement.getBoundingClientRect().left;
        const thumbWidth = this.elementRef.nativeElement.offsetWidth;
        const thumbPositionCenter = thumbPositionLeft + thumbWidth / 2;
        const pointerPosition = event.pageX;

        if (pointerPosition > thumbPositionCenter + this.ratio() / 2) {
            this.positionChanged.emit(RangeMoveDirection.FORWARD);
        }
        else if (pointerPosition <= thumbPositionCenter - this.ratio() / 2) {
            this.positionChanged.emit(RangeMoveDirection.BACKWARD);
        }
    }

    private disposePointerUpListener(): void {
        if (this.pointerUpListener) {
            this.pointerUpListener();
        }
    }

    private disposePointerMoveListener(): void {
        if (this.pointerMoveListener) {
            this.pointerMoveListener();
        }
    }

    ngOnDestroy(): void {
        this.disposePointerUpListener();
        this.disposePointerMoveListener();
    }
}
