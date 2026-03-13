import {ChangeDetectionStrategy, Component, input, model, signal, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'ngx-bsl-checkbox-button',
    imports: [],
    templateUrl: './checkbox-button.component.html',
    styleUrl: './checkbox-button.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: CheckboxButtonComponent,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CheckboxButtonComponent implements ControlValueAccessor {
    id = input.required<string>();
    disabled = model(false);

    protected checked = signal(false);

    onChange = (_value: boolean) => {};
    onTouch = () => {};

    registerOnChange(onChange: (value: boolean) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouch: () => void): void {
        this.onTouch = onTouch;
    }

    writeValue(value: boolean): void {
        this.checked.set(value);
    }

    setDisabledState(disabled: boolean): void {
        this.disabled.set(disabled);
    }

    onKeydown(event: Event): void {
        event.preventDefault();
    }

    onSelect(): void {
        if (this.disabled()) {
            return;
        }

        this.checked.set(!this.checked());
        this.onChange(this.checked());
    }
}
