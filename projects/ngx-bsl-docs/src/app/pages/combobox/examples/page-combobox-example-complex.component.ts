import {Component, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, map} from 'rxjs';
import {ComboboxComponent, ListBoxOptionComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-combobox-example-complex',
    imports: [
        ReactiveFormsModule,
        ComboboxComponent,
        ListBoxOptionComponent,
    ],
    template: `
        <section>
            <h3>Combobox with options of complex type and FormControl with filtering</h3>
            <p>To ensure correct mapping between value and options, optionValueParse must be set!</p>

            <ngx-bsl-combobox
                style="width: 200px"
                [formControl]="form"
                [id]="'combobox-complex'"
                [optionValueParse]="valueOptionParse">
                @for (option of options(); track option; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'combobox-complex-option-' + index"
                        [value]="option">
                        {{option.name}} [id: {{option.id}}]
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-combobox>
            <p>Current value: {{form.value}}</p>

            <pre><code class="language-xml" [innerHTML]="comboboxTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="comboboxClass()"></code></pre>
        </section>
  `,
})
export class PageComboboxExampleComplexComponent {
    private availableOptions: City[] = [
        {
            id: 'la',
            name: 'Los Angeles',
        },
        {
            id: 'mi',
            name: 'Miami',
        },
        {
            id: 'nw',
            name: 'New York',
        },
        {
            id: 'sf',
            name: 'San Francisco',
        },
        {
            id: 'wg',
            name: 'Washington',
        },
    ];
    form = new FormControl('', {nonNullable: true});
    options = toSignal(this.form.valueChanges.pipe(
        debounceTime(500),
        map((search) => this.availableOptions
            .filter(option => option.name.toLowerCase().includes(search.toLowerCase())),
        ),
    ), {initialValue: this.availableOptions});
    valueOptionParse = (option: City) => option.name;

    private comboboxTemplateCode = `\
<ngx-bsl-combobox
    [formControl]="form"
     [id]="'combobox-complex'"
     [optionValueParse]="optionValueParse">
        @for (option of options(); track option; let index = $index) {
            <ngx-bsl-list-box-option
                [id]="'combobox-complex-option-' + index"
                [value]="option">
                    {{option.name}} [id: {{option.id}}]
            </ngx-bsl-list-box-option>
        }
</ngx-bsl-combobox>
`;

    private comboboxClassCode = `\
export class ExampleComponent {
    private availableOptions: City[] = [
        {
            id: 'la',
            name: 'Los Angeles',
        },
        {
            id: 'mi',
            name: 'Miami',
        },
        {
            id: 'nw',
            name: 'New York',
        },
        {
            id: 'sf',
            name: 'San Francisco',
        },
        {
            id: 'wg',
            name: 'Washington',
        },
    ];
    form = new FormControl('', {nonNullable: true});
    options = toSignal(this.form.valueChanges.pipe(
        debounceTime(500),
        map((search) => this.availableOptions
            .filter(option => option.name.toLowerCase().includes(search.toLowerCase())),
        ),
    ), {initialValue: this.availableOptions});
    optionValueParse = (option: City) => option.name;
}

interface City {
    id: string;
    name: string;
}`;
    protected comboboxTemplate = signal(highlight.highlightAuto(this.comboboxTemplateCode, ['xml']).value);
    protected comboboxClass = signal(highlight.highlightAuto(this.comboboxClassCode, ['typescript']).value);

}

interface City {
    id: string;
    name: string;
}
