import {ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    forwardRef,
    inject,
    input,
    model,
    signal,
    ViewEncapsulation, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CdkConnectedOverlay, CdkOverlayOrigin} from '@angular/cdk/overlay';
import {IconChevronDownComponent} from '../icons/icon-chevron-down.component';
import {ListBoxDirective} from '../list-box/list-box.directive';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'ngx-bsl-select',
    imports: [
        CdkOverlayOrigin,
        CdkConnectedOverlay,
        IconChevronDownComponent,
    ],
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [
        {
            directive: ListBoxDirective,
            inputs: ['listBoxId', 'listBoxAriaLabel', 'listBoxAriaLabelledby', 'optionValueEquality'],
        },
    ],
})
export class SelectComponent<TOption, TValue> implements ControlValueAccessor, OnInit {
    protected listBox = inject(ListBoxDirective<TOption>);
    private destroyRef = inject(DestroyRef);

    id = input.required<string>();
    placeholder = input<string>('');
    ariaLabel = input<string>();
    ariaLabelledBy = input<string>();
    iconMode = input(false);
    customIcon = input(false);
    dropdownWidth = input<string>();
    optionValueParse = input<(option: TOption) => TValue>((option) => option as unknown as TValue);
    displayLabel = input<string>();

    onChange = (_value: TValue) => {};
    onTouch = () => {};

    value = model<TValue>();

    protected open = signal(false);
    protected ariaActiveDescendant = computed<string | null>(() => this.listBox.ariaActiveDescendant() ?? null);
    protected displayValue = computed(() => {
        const displayLabel = this.displayLabel();
        const value = this.value();

        if (displayLabel && value && typeof value === 'object' && displayLabel in value) {
            return value[displayLabel as keyof TValue];
        } else {
            return value;
        }
    });

    ngOnInit(): void {
        this.listBox.hasAriaSelected = true;
        this.subscribeSelectOption();
    }

    private subscribeSelectOption(): void {
        this.listBox.selectOption.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(option => {
            if (option) {
                this.value.set(this.optionValueParse()(option));
                this.onChange(this.value() as TValue);
            }
            this.hideListBox();
        });
    }

    protected showListBox(): void {
        this.open.set(true);
        this.listBox.initSelectedOption(this.value());
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

    protected onListBoxClick(event: MouseEvent): void {
        this.listBox.onClick(event);
    }

    protected onKeydown(event: KeyboardEvent) {
        event.preventDefault();

        if (!this.open()) {
            this.showListBox();
            if (event.code === 'ArrowUp') {
                this.listBox.setVisualFocus(this.listBox.listBoxOptions().length - 1);
                this.showListBox();
            } else if (event.code === 'ArrowDown') {
                if (!this.listBox.listBoxOptions().length) return;
                this.listBox.setVisualFocus(0);
                this.showListBox();
            }
        } else {
            this.listBox.onKeydown(event);
        }
    }

    registerOnChange(onChange: (value: TValue) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouch: () => void): void {
        this.onTouch = onTouch;
    }

    writeValue(value: TValue): void {
        this.value.set(value);
    }
}
