import {Component, signal, OnInit} from '@angular/core';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-input',
    imports: [],
    templateUrl: './page-input.component.html',
    host: {'[class.page]': 'true'},
})
export class PageInputComponent implements OnInit {
    private textInputCode = '<input type="text">';
    protected textInput= signal(highlight.highlightAuto(this.textInputCode, ['xml']).value);

    private numberInputCode = '<input type="number">';
    protected numberInput= signal(highlight.highlightAuto(this.numberInputCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
