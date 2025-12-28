import {Component, signal, OnInit} from '@angular/core';
import {CheckboxComponent} from '@ngx-bsl-lib';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-checkbox',
    imports: [
        CheckboxComponent,
    ],
    templateUrl: './page-checkbox.component.html',
    host: {'[class.page]': 'true'},
})
export class PageCheckboxComponent implements OnInit {
    private checkboxCode = '<ngx-bsl-checkbox id="simple-checkbox">Label of the checkbox</ngx-bsl-checkbox>';
    protected checkbox = signal(highlight.highlightAuto(this.checkboxCode, ['xml']).value);

    private disabledCheckboxCode =
        '<ngx-bsl-checkbox id="disabled-checkbox" [disabled]="true">Label of the disabled checkbox</ngx-bsl-checkbox>';
    protected disabledCheckbox = signal(highlight.highlightAuto(this.disabledCheckboxCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
