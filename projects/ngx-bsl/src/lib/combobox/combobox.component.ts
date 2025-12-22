import {ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    inject,
    input,
    output,
    signal,
    ViewEncapsulation,
    OnInit,
    effect,
    DestroyRef,
    model} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CdkConnectedOverlay, CdkOverlayOrigin} from '@angular/cdk/overlay';
import {ListBoxDirective} from '../list-box/list-box.directive';

@Component({
    selector: 'ngx-bsl-combobox',
    imports: [
        CdkOverlayOrigin,
        CdkConnectedOverlay,
    ],
    templateUrl: './combobox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboboxComponent),
            multi: true,
        },
    ],
    hostDirectives: [
        {
            directive: ListBoxDirective,
            inputs: ['listBoxId', 'listBoxAriaLabel', 'listBoxAriaLabelledby', 'optionValueEquality'],
        },
    ],
})
export class ComboboxComponent<TOption>
implements ControlValueAccessor, OnInit {
    protected listBox = inject(ListBoxDirective<TOption>);
    private destroyRef = inject(DestroyRef);

    id = input.required<string>();
    placeholder = input<string>('');
    ariaLabel = input<string>();
    ariaLabelledBy = input<string>();
    optionValueParse = input<(option: TOption) => string>((option) => option as string);

    confirmSelection = output();

    onChange = (_value: string) => {};
    onTouch = () => {};

    value = model<string>('');

    protected open = signal(false);
    protected ariaActiveDescendant = computed<string | null>(() => this.listBox.ariaActiveDescendant() ?? null);
    private optionSelecting = false;
    private optionChangedBy: 'selection' | 'input' | null = null;

    constructor() {
        effect(() => {
            const hasOptions = this.listBox.listBoxOptions().length;
            if (this.optionChangedBy === 'input' && hasOptions) {
                this.showListBox();
            } else if (this.optionChangedBy === 'selection') {
                this.hideListBox();
            }
            this.optionChangedBy = null;
        });
    }

    ngOnInit(): void {
        this.listBox.hasAriaSelected = false;
        this.subscribeSelectOption();
    }

    private subscribeSelectOption(): void {
        this.listBox.selectOption.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(option => {
            if (option) {
                this.optionChangedBy = 'selection';
                this.value.set(this.optionValueParse()(option));
                this.onChange(this.value());
            }
            this.hideListBox();
        });
    }

    protected showListBox(): void {
        this.open.set(true);
    }

    protected hideListBox(): void {
        this.listBox.clearVisualFocus();
        this.open.set(false);
    }

    protected onClick(): void {
        if (this.open()) {
            this.hideListBox();
        } else {
            if (this.listBox.listBoxOptions().length) {
                this.showListBox();
            }
        }
    }

    protected onBlur(): void {
        if (!this.optionSelecting) {
            this.hideListBox();
        }
    }

    protected onListBoxPointerDown(event: PointerEvent): void {
        event.preventDefault();
        this.optionSelecting = true;
    }

    protected onListBoxClick(event: MouseEvent): void {
        this.listBox.onClick(event);
        this.optionSelecting = false;
    }

    protected onInputChange(event: InputEvent) {
        const value = (event.target as HTMLInputElement).value;
        this.value.set(value);
        this.optionChangedBy = 'input';
        if (this.listBox.listBoxOptions().length) {
            if (this.open()) {
                this.listBox.initSelectedOption(this.value());
            }
            else {
                this.showListBox();
            }
        }
        this.onChange(this.value());
    }

    protected onKeydown(event: KeyboardEvent) {
        event.preventDefault();

        if (!this.open()) {
            if (event.code === 'ArrowUp') {
                if (!this.listBox.listBoxOptions().length) return;
                this.listBox.setVisualFocus(this.listBox.listBoxOptions().length - 1);
                this.showListBox();
            } else if (event.code === 'ArrowDown') {
                if (!this.listBox.listBoxOptions().length) return;
                this.listBox.setVisualFocus(0);
                this.showListBox();
            } else if (event.code === 'Enter') {
                this.confirmSelection.emit();
            }
        } else {
            this.listBox.onKeydown(event);
        }
    }

    registerOnChange(onChange: (value: string) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouch: () => void): void {
        this.onTouch = onTouch;
    }

    writeValue(value: string): void {
        this.value.set(value);
    }
}
