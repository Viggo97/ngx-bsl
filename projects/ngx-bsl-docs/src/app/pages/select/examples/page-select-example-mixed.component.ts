import {Component, signal} from '@angular/core';
import highlight from '../../../../highlightjs';
import {ListBoxOptionComponent, SelectComponent} from '@ngx-bsl-lib';

@Component({
    selector: 'ngx-bsl-docs-page-select-example-mixed',
    imports: [
        ListBoxOptionComponent,
        SelectComponent,
    ],
    template: `
        <section>
            <h3>Select with options of complex type. Value is of type string and options are objects</h3>
            <p>
               Use [displayLabel] to set proper label of the select.
               To ensure correct marking selected option in a dropdown, optionValueEquality should be set.
               Otherwise, object references will be used compared (===).
               To bind specific option value to control value, optionValueParse must be set.
            </p>

            <ngx-bsl-select
                style="width: 200px"
                [(value)]="value"
                [id]="'select-mixed'"
                [displayLabel]="'name'"
                [optionValueParse]="optionValueParse"
                [optionValueEquality]="optionValueEquality">
                @for (option of options(); track option.id; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'select-mixed-option-' + index"
                        [value]="option">
                            {{option.name}} [{{option.id}}]
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-select>

            <p>Current value: {{value()}}</p>

            <pre><code class="language-xml" [innerHTML]="selectTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="selectClass()"></code></pre>
        </section>
  `,
})
export class PageSelectExampleSimpleMixedComponent {
    options = signal<City[]>([
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
    ]);
    value = signal('');
    optionValueEquality = (o1: string, o2: City) => o1 === o2.name;
    optionValueParse = (option: City) => option.name;

    private selectTemplateCode = `
<ngx-bsl-select
    [(value)]="value"
    [id]="'select-mixed'"
    [displayLabel]="'name'"
    [optionValueParse]="optionValueParse"
    [optionValueEquality]="optionValueEquality">
        @for (option of options(); track option.id; let index = $index) {
            <ngx-bsl-list-box-option
                [id]="'select-mixed-option-' + index"
                [value]="option">
                    {{option.name}} [{{option.id}}]
            </ngx-bsl-list-box-option>
        }
</ngx-bsl-select>
    `;
    private selectClassCode = `
export class ExampleComponent {
    options = signal<City[]>([
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
    ]);
    value = signal('');
    optionValueEquality = (o1: string, o2: City) => o1 === o2.name;
    optionValueParse = (option: City) => option.name;
}

interface City {
    id: string;
    name: string;
}`;

    protected selectTemplate = signal(highlight.highlightAuto(this.selectTemplateCode, ['xml']).value);
    protected selectClass = signal(highlight.highlightAuto(this.selectClassCode, ['typescript']).value);
}

interface City {
    id: string;
    name: string;
}
