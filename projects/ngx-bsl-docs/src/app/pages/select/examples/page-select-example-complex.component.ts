import {Component, signal} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {ListBoxOptionComponent, SelectComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-select-example-complex',
    imports: [
        JsonPipe,
        SelectComponent,
        ListBoxOptionComponent,
    ],
    template: `
        <section>
            <h3>Select with options of complex type. Both value and options are objects</h3>
            <p>Use [displayLabel] to set proper label of the select.
               To ensure correct marking selected option in a dropdown, optionValueEquality should be set.
               Otherwise, object references will be used compared (===).
            </p>

            <ngx-bsl-select
                style="width: 200px"
                [(value)]="value"
                [id]="'select-complex'"
                [displayLabel]="'name'"
                [optionValueEquality]="optionValueEquality">
                @for (option of options(); track option.id; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'select-complex-option-' + index"
                        [value]="option">
                            {{option.name}}
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-select>

            <p>Current value: {{ value() | json }}</p>

            <pre><code class="language-xml" [innerHTML]="selectTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="selectClass()"></code></pre>
        </section>
    `,
})
export class PageSelectExampleComplexComponent {
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
    value = signal(null);
    optionValueEquality = (o1: City | null, o2: City) => o1?.id === o2.id;

    private selectTemplateCode = `
<ngx-bsl-select
    [(value)]="value"
    [id]="'select-complex'"
    [displayLabel]="'name'"
    [optionValueEquality]="optionValueEquality">
        @for (option of options(); track option.id; let index = $index) {
            <ngx-bsl-list-box-option
                [id]="'select-complex-option-' + index"
                [value]="option">
                    {{option.name}}
            </ngx-bsl-list-box-option>
        }
</ngx-bsl-select>`;
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
    value = signal(null);
    optionValueEquality = (o1: City | null, o2: City) => o1?.id === o2.id;
}`;

    protected selectTemplate = signal(highlight.highlightAuto(this.selectTemplateCode, ['xml']).value);
    protected selectClass = signal(highlight.highlightAuto(this.selectClassCode, ['typescript']).value);
}

interface City {
    id: string;
    name: string;
}
