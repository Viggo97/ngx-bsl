import {ChangeDetectionStrategy,
    Component,
    computed, effect,
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
export class ComboboxComponent<TOption extends Record<string, unknown> | string> implements ControlValueAccessor {
    id = input.required<string>();
    options = input.required<TOption[] | string>();
    bindLabel = input<string>();
    groupBy = input<string>();
    comparisonField = input<string>();
    placeholder = input<string>('');
    ariaLabel = input<string>();
    ariaLabelledBy = input<string>();

    confirmSelection = output();

    private listBox = viewChild(ListBoxComponent);

    onChange = (_value: string) => {};
    onTouch = () => {};

    protected value = signal<string>('');
    protected open = signal(false);
    protected ariaActiveDescendant = computed<string | null>(() => this.listBox()?.ariaActiveDescendant() ?? null);
    protected initialFocusedOptionIndex = signal<number | null>(null);
    protected groupedOptions = computed(() => {
        const groupByKey = this.groupBy();
        if (groupByKey) {
            return this.groupDataBy(groupByKey, this.options() as Record<string, unknown>[]);
        }
        return [];
    });
    private ignoreOptionsUpdate = false;

    constructor() {
        effect(() => {
            if (!this.options().length || this.ignoreOptionsUpdate) {
                this.ignoreOptionsUpdate = false;
                this.hideListBox();
            } else {
                this.showListBox();
            }
        });
    }

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
            if (this.options().length) {
                this.showListBox();
            }
        }
    }

    protected onSelectOption(value: TOption | string): void {
        let valueToSet: string;
        if (typeof value === 'string') {
            valueToSet = value;
        } else {
            const comparisonField = this.comparisonField() as string;
            if (comparisonField) {
                if (typeof value[comparisonField] === 'string') {
                    valueToSet = value[comparisonField];
                } else {
                    throw new Error('Type of property pointed by comparisonField must be a string.');
                }
            } else {
                throw new Error('comparisonField is not provided.');
            }
        }

        this.ignoreOptionsUpdate = true;
        this.value.set(valueToSet);
        this.onChange(this.value());
        this.hideListBox();
    }

    protected onInputChange(event: InputEvent) {
        const value = (event.target as HTMLInputElement).value;
        this.value.set(value);
        this.onChange(this.value());
    }

    protected onKeydown(event: KeyboardEvent) {
        event.preventDefault();

        if (!this.open()) {
            if (event.code === 'ArrowUp') {
                if (!this.options().length)
                    return;
                this.initialFocusedOptionIndex.set(this.options().length - 1);
                this.showListBox();
            } else if (event.code === 'ArrowDown') {
                if (!this.options().length)
                    return;
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
