import {ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    input,
    output,
    signal,
    viewChild,
    ViewEncapsulation} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ListBoxComponent } from '../list-box/list-box.component';
import { ListBoxOptionComponent } from '../list-box/list-box-option/list-box-option.component';
import { ListBoxGroupComponent } from '../list-box/list-box-group/list-box-group.component';
import { ListBoxOptionValueConverterPipe } from '../list-box/list-box-option/list-box-option-value-converter.pipe';
import { GroupData } from './group-data.interface';

@Component({
    selector: 'ngx-bsl-combobox',
    imports: [
        CdkOverlayOrigin,
        CdkConnectedOverlay,
        ListBoxComponent,
        ListBoxOptionComponent,
        ListBoxGroupComponent,
        ListBoxOptionValueConverterPipe,
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
})
export class ComboboxComponent<TOption> implements ControlValueAccessor {
    id = input.required<string>();
    options = input.required<TOption[]>();
    bindLabel = input<string>();
    placeholder = input<string>('');
    ariaLabel = input<string>();
    ariaLabelledBy = input<string>();
    comparisonField = input<keyof TOption>();
    groupBy = input<string>();
    noOptionsMessage = input<string>();

    confirmSelection = output();

    private listBox = viewChild(ListBoxComponent);

    onChange = (_value: TOption) => {};
    onTouch = () => {};
    protected value: TOption | null = null;

    protected open = signal(false);
    protected ariaActiveDescendant = computed<string | null>(() => this.listBox()?.ariaActiveDescendant() ?? null);
    protected initialFocusedOptionIndex = signal<number | null>(null);
    protected optionsGroup = computed(() => {
        const groupByKey = this.groupBy();
        if (groupByKey) {
            return this.groupDataBy(groupByKey, this.options() as Record<string, unknown>[]);
        }
        return [];
    });

    protected showListBox(): void {
        this.open.set(true);
    }

    protected hideListBox(): void {
        this.initialFocusedOptionIndex.set(null);
        this.open.set(false);
    }

    protected onClick(): void {
        if (this.open()) {
            this.hideListBox();
        } else {
            this.showListBox();
        }
    }

    protected onSelectOption(value: TOption): void {
        this.value = value;
        this.onChange(this.value);
        this.hideListBox();
    }

    protected onInputChange(event: InputEvent) {
        const value = (event.target as HTMLInputElement).value as TOption;

        if (!this.open()) {
            this.showListBox();
        }

        this.value = value;
        this.onChange(this.value);
    }

    protected onKeydown(event: KeyboardEvent) {
        event.preventDefault();

        if (!this.open()) {
            if (event.code === 'ArrowUp') {
                this.initialFocusedOptionIndex.set(this.options().length - 1);
                this.showListBox();
            } else if (event.code === 'ArrowDown') {
                this.initialFocusedOptionIndex.set(0);
                this.showListBox();
            } else if (event.code === 'Enter') {
                this.confirmSelection.emit();
            }
        } else {
            this.listBox()?.onKeydown(event);
        }
    }

    private groupDataBy(field: string, data: Record<string, unknown>[]): GroupData<TOption>[] {
        const groupsMap = data.reduce((map, value) => {
            const key = value[field] as string;
            if (!map.has(key)) {
                map.set(key, []);
            }
            map.get(key)?.push(value);
            return map;
        }, new Map<string, Record<string, unknown>[]>);

        return Array.from(groupsMap, ([group, data]) => ({ group, data })) as GroupData<TOption>[];
    }

    registerOnChange(onChange: (value: TOption) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouch: () => void): void {
        this.onTouch = onTouch;
    }

    writeValue(value: TOption): void {
        this.value = value;
    }
}
