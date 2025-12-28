import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {Component, signal} from '@angular/core';
import {debounceTime, map} from 'rxjs';
import {ComboboxComponent, ListBoxOptionComponent} from '@ngx-bsl-lib';
import highlight from '../../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-combobox-example-form',
    imports: [
        ReactiveFormsModule,
        ComboboxComponent,
        ListBoxOptionComponent,
    ],
    template: `
        <section>
            <h3>Combobox with options of type string and FormControl with filtering</h3>

            <ngx-bsl-combobox
                style="width: 200px"
                [formControl]="form"
                [id]="'combobox-form'">
                @for (option of options(); track option; let index = $index) {
                    <ngx-bsl-list-box-option
                        [id]="'combobox-form-option-' + index"
                        [value]="option">
                        {{option}}
                    </ngx-bsl-list-box-option>
                }
            </ngx-bsl-combobox>
            <p>Current value: {{form.value}}</p>

            <pre><code class="language-xml" [innerHTML]="comboboxTemplate()"></code></pre>
            <pre><code class="language-typescript" [innerHTML]="comboboxClass()"></code></pre>
        </section>
  `,
})
export class PageComboboxExampleFormComponent {
    private availableOptions = ['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington'];
    form = new FormControl('', {nonNullable: true});
    options = toSignal(this.form.valueChanges.pipe(
        debounceTime(500),
        map((search) => this.availableOptions
            .filter(option => option.toLowerCase().includes(search.toLowerCase())),
        ),
    ), {initialValue: this.availableOptions});

    private comboboxTemplateCode = `\
<ngx-bsl-combobox
    [formControl]="form"
    [id]="'combobox-form'">
    @for (option of options(); track option; let index = $index) {
        <ngx-bsl-list-box-option
            [id]="'combobox-form-option-' + index"
            [value]="option">
                {{option}}
        </ngx-bsl-list-box-option>
    }
</ngx-bsl-combobox>`;

    private comboboxClassCode = `\
export class ExampleComponent {
    private availableOptions = ['Los Angeles', 'Miami', 'New York', 'San Francisco', 'Washington'];
    form = new FormControl('', {nonNullable: true});
    options = toSignal(this.form.valueChanges.pipe(
        debounceTime(500),
        map((search) => this.availableOptions
            .filter(option => option.toLowerCase().includes(search.toLowerCase())),
        ),
    ), {initialValue: this.availableOptions});
}`;

    protected comboboxTemplate = signal(highlight.highlightAuto(this.comboboxTemplateCode, ['xml']).value);
    protected comboboxClass = signal(highlight.highlightAuto(this.comboboxClassCode, ['typescript']).value);

}
