import {Component, signal, OnInit} from '@angular/core';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-button',
    imports: [],
    templateUrl: './page-button.component.html',
    host: {'[class.page]': 'true'},
})
export class PageButtonComponent implements OnInit {
    private standardButtonCode = '<button>Hello world!</button>';
    protected standardButton = signal(highlight.highlightAuto(this.standardButtonCode, ['xml']).value);

    private iconButtonCode = '<button class="bsl-button-icon">🌍</button>';
    protected iconButton = signal(highlight.highlightAuto(this.iconButtonCode, ['xml']).value);

    private invisibleButtonCode = '<button class="bsl-button-invisible">Hello world!</button>';
    protected invisibleButton = signal(highlight.highlightAuto(this.invisibleButtonCode,['xml']).value);

    private disabledButtonCode = '<button disabled>Hello world!</button>';
    protected disabledButton = signal(highlight.highlightAuto(this.disabledButtonCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
