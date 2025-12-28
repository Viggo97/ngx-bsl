import {Component, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ListBoxOptionComponent, SelectComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-select-example-form',
    imports: [
        ListBoxOptionComponent,
        SelectComponent,
        ReactiveFormsModule,
    ],
    template: `
        <section>
            <h3>Select with options of type string and FormControl</h3>

            <ngx-bsl-select
                style="width: 200px"
                [formControl]="form"
                [id]="'select-form'">
                @for (option of options(); track option; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'select-form-option' + index"
                        [value]="option">
                        {{option}}
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-select>

            <p>Current value: {{form.value}}</p>

            <pre><code class="language-xml" [innerHTML]="selectTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="selectClass()"></code></pre>
        </section>
  `,
})
export class PageSelectExampleFormComponent {
    options = signal(['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington']);
    form = new FormControl('', {nonNullable: true});

    private selectTemplateCode = `\
<ngx-bsl-select
    [formControl]="form"
    [id]="'select-form'">
    @for (option of options(); track option; let index = $index) {
        <ngx-bsl-list-box-option
            [id]="'select-form-option' + index"
            [value]="option">
                {{option}}
        </ngx-bsl-list-box-option>
    }
</ngx-bsl-select>`;
    private selectClassCode = `\
export class ExampleComponent {
    options = signal(['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington']);
    form = new FormControl('', {nonNullable: true});
}`;

    protected selectTemplate = signal(highlight.highlightAuto(this.selectTemplateCode, ['xml']).value);
    protected selectClass = signal(highlight.highlightAuto(this.selectClassCode, ['typescript']).value);
}
