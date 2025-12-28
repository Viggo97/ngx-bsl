import {Component, signal} from '@angular/core';
import {ComboboxComponent,
    ListBoxGroupComponent,
    ListBoxOptionComponent,
    ListBoxSeparatorComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-combobox-example-groups',
    imports: [
        ComboboxComponent,
        ListBoxGroupComponent,
        ListBoxOptionComponent,
        ListBoxSeparatorComponent,
    ],
    template: `
        <section>
            <h3>Combobox with grouped options</h3>
            <p>To simplify example filtering was omitted in this example.</p>

            <ngx-bsl-combobox
                style="width: 200px"
                [(value)]="value"
                [id]="'combobox-groups'"
                [optionValueParse]="optionValueParse">
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
            </ngx-bsl-combobox>
            <p>Current value: {{value()}}</p>

            <pre><code class="language-xml" [innerHTML]="comboboxTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="comboboxClass()"></code></pre>
        </section>
  `,
})
export class PageComboboxExampleGroupsComponent {
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
    optionValueParse = (option: City) => option.name;

    private comboboxTemplateCode = `\
<ngx-bsl-combobox
    [(value)]="value"
    [id]="'combobox-groups'"
    [optionValueParse]="optionValueParse">
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

             @if(!last) {
                 <ngx-bsl-list-box-separator></ngx-bsl-list-box-separator>
            }
       }
</ngx-bsl-combobox>`;

    private comboboxClassCode = `\
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
    optionValueParse = (option: City) => option.name;
}

interface City {
    id: string;
    name: string;
}

interface GroupCity {
    name: string;
    data: City[];
}
`;
    protected comboboxTemplate = signal(highlight.highlightAuto(this.comboboxTemplateCode, ['xml']).value);
    protected comboboxClass = signal(highlight.highlightAuto(this.comboboxClassCode, ['typescript']).value);
}

interface City {
    id: string;
    name: string;
}

interface GroupCity {
    name: string;
    data: City[];
}
