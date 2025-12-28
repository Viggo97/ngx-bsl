import {Component, signal} from '@angular/core';
import {ComboboxComponent, ListBoxOptionComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-combobox-example-simple',
    imports: [
        ComboboxComponent,
        ListBoxOptionComponent,
    ],
    template: `
        <section>
            <h3>Combobox with options of type string and two-way binding</h3>

            <ngx-bsl-combobox
                style="width: 200px"
                [(value)]="value"
                [id]="'combobox-simple'">
                @for (option of options(); track option; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'combobox-simple-option' + index"
                        [value]="option">
                        {{option}}
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-combobox>
            <p>Current value: {{value()}}</p>

            <pre><code class="language-xml" [innerHTML]="comboboxTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="comboboxClass()"></code></pre>
        </section>
  `,
})
export class PageComboboxExampleSimpleComponent {
    options = signal(['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington']);
    value = signal('');

    private comboboxTemplateCode = `\
<ngx-bsl-combobox
    [(value)]="value"
    [id]="'combobox-simple'">
    @for (option of options(); track option; let index = $index) {
        <ngx-bsl-list-box-option
            [id]="'combobox-simple-option-' + index"
            [value]="option">
                {{option}}
        </ngx-bsl-list-box-option>
    }
</ngx-bsl-combobox>`;

    private comboboxClassCode = `\
export class ExampleComponent {
    options = signal(['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington']);
    value = signal('');
}`;
    protected comboboxTemplate = signal(highlight.highlightAuto(this.comboboxTemplateCode, ['xml']).value);
    protected comboboxClass = signal(highlight.highlightAuto(this.comboboxClassCode, ['typescript']).value);
}
