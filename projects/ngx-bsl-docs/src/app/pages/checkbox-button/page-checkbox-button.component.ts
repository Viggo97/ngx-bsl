import {Component, OnInit, signal} from '@angular/core';
import {CheckboxButtonComponent} from '@ngx-bsl-lib';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-checkbox-button',
    imports: [
        CheckboxButtonComponent,
    ],
    templateUrl: './page-checkbox-button.component.html',
    host: {'[class.page]': 'true'},
})
export class PageCheckboxButtonComponent implements OnInit {
    private checkboxButtonCode = `\
<ngx-bsl-checkbox-button id="checkbox-button">
    Content of the button checkbox
</ngx-bsl-checkbox-button>`;
    protected checkboxButton = signal(highlight.highlightAuto(this.checkboxButtonCode, ['xml']).value);

    private disabledCheckboxButtonCode =`\
<ngx-bsl-checkbox-button id="disabled-checkbox-button" [disabled]="true">
    Content of the disabled button checkbox
</ngx-bsl-checkbox-button>`;
    protected disabledCheckboxButton = signal(highlight.highlightAuto(this.disabledCheckboxButtonCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
