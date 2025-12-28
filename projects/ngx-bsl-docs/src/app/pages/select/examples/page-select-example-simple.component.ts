import {Component, signal} from '@angular/core';
import {ListBoxOptionComponent, SelectComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-select-example-simple',
    imports: [
        SelectComponent,
        ListBoxOptionComponent,
    ],
    template: `
        <section>
            <h3>Select with grouped options</h3>
            <ngx-bsl-select
                style="width: 200px"
                [(value)]="value"
                [id]="'select-simple'">
                @for (option of options(); track option; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'select-simple-option' + index"
                        [value]="option">
                        {{option}}
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-select>

            <p>Current value: {{value()}}</p>

            <pre><code class="language-xml" [innerHTML]="selectTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="selectClass()"></code></pre>
        </section>
  `,
})
export class PageSelectExampleSimpleComponent {
    options = signal(['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington']);
    value = signal('');

    private selectTemplateCode = `\
<ngx-bsl-select
    [(value)]="value"
    [id]="'select-simple'">
        @for (option of options(); track option; let index = $index) {
            <ngx-bsl-list-box-option
                [id]="'select-simple-option' + index"
                [value]="option">
                    {{option}}
            </ngx-bsl-list-box-option>
        }
</ngx-bsl-select>
    `;
    private selectClassCode = `\
export class ExampleComponent {
    options = signal(['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington']);
    value = signal('');
}`;

    protected selectTemplate = signal(highlight.highlightAuto(this.selectTemplateCode, ['xml']).value);
    protected selectClass = signal(highlight.highlightAuto(this.selectClassCode, ['typescript']).value);
}
