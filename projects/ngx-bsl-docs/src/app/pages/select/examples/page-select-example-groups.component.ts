import {Component, signal} from '@angular/core';
import highlight from '../../../../highlightjs';
import {ListBoxGroupComponent, ListBoxOptionComponent, ListBoxSeparatorComponent, SelectComponent} from '@ngx-bsl-lib';

@Component({
    selector: 'ngx-bsl-docs-page-select-example-groups',
    imports: [
        ListBoxOptionComponent,
        SelectComponent,
        ListBoxGroupComponent,
        ListBoxSeparatorComponent,
    ],
    template: `
        <section>
            <h3>Select with grouped options</h3>

            <ngx-bsl-select
                style="width: 200px"
                [(value)]="value"
                [id]="'select-groups'"
                [displayLabel]="'name'"
                [optionValueParse]="optionValueParse"
                [optionValueEquality]="optionValueEquality">
                @for (group of groupedOptions(); track group.name; let last = $last) {
                    <ngx-bsl-list-box-group [title]="group.name">
                        @for (option of group.data; track option.id) {
                            <ngx-bsl-list-box-option
                                [id]="'combobox-groups-option-' + option.id"
                                [value]="option">
                                    {{option.name}}
                            </ngx-bsl-list-box-option>
                        }
                    </ngx-bsl-list-box-group>
                    @if (!last) {
                        <ngx-bsl-list-box-separator></ngx-bsl-list-box-separator>
                    }
                }
            </ngx-bsl-select>

            <p>Current value: {{value()}}</p>

            <pre><code class="language-xml" [innerHTML]="selectTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="selectClass()"></code></pre>
        </section>
  `,
})
export class PageSelectExampleGroupsComponent {
    groupedOptions = signal<GroupCity[]>([
        {
            name: 'Visited',
            data: [
                {
                    id: 'la',
                    name: 'Los Angeles',
                },
                {
                    id: 'nw',
                    name: 'New York',
                },
                {
                    id: 'sf',
                    name: 'San Francisco',
                },
            ],
        },
        {
            name: 'Not visited',
            data: [
                {
                    id: 'mi',
                    name: 'Miami',
                },

                {
                    id: 'wg',
                    name: 'Washington',
                },
            ],
        },
    ]);
    value = signal('');
    optionValueEquality = (o1: string, o2: City) => o1 === o2.name;
    optionValueParse = (option: City) => option.name;

    private selectTemplateCode = `
<ngx-bsl-select
    [(value)]="value"
    [id]="'select-groups'"
    [displayLabel]="'name'"
    [optionValueParse]="optionValueParse"
    [optionValueEquality]="optionValueEquality">
        @for (group of groupedOptions(); track group.name; let last = $last) {
            <ngx-bsl-list-box-group [title]="group.name">
                @for (option of group.data; track option.id) {
                    <ngx-bsl-list-box-option
                        [id]="'combobox-groups-option-' + option.id"
                        [value]="option">
                           {{option.name}}
                    </ngx-bsl-list-box-option>
                }
           </ngx-bsl-list-box-group>
           if (!last) {
               <ngx-bsl-list-box-separator></ngx-bsl-list-box-separator>
           }
        }
</ngx-bsl-select>
    `;
    private selectClassCode = `
export class ExampleComponent {
    groupedOptions = signal<GroupCity[]>([
        {
            name: 'Visited',
            data: [
                {
                    id: 'la',
                    name: 'Los Angeles',
                },
                {
                    id: 'nw',
                    name: 'New York',
                },
                {
                    id: 'sf',
                    name: 'San Francisco',
                },
            ],
        },
        {
            name: 'Not visited',
            data: [
                {
                    id: 'mi',
                    name: 'Miami',
                },

                {
                    id: 'wg',
                    name: 'Washington',
                },
            ],
        },
    ]);
    value = signal('');
    optionValueEquality = (o1: string, o2: City) => o1 === o2.name;
    optionValueParse = (option: City) => option.name;
}

interface City {
    id: string;
    name: string;
}

interface GroupCity {
    name: string;
    data: City[];
}`;

    protected selectTemplate = signal(highlight.highlightAuto(this.selectTemplateCode, ['xml']).value);
    protected selectClass = signal(highlight.highlightAuto(this.selectClassCode, ['typescript']).value);
}

interface City {
    id: string;
    name: string;
}

interface GroupCity {
    name: string;
    data: City[];
}
