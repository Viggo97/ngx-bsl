import {Component, signal, OnInit} from '@angular/core';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-installation',
    imports: [],
    templateUrl: './page-installation.html',
    styleUrl: './page-installation.scss',
    host: {'[class.page]': 'true'},
})
export class PageInstallationComponent implements OnInit {
    private installationCode = 'npm i ngx-bsl';
    protected installation = signal(highlight.highlightAuto(this.installationCode, ['typescript']).value);

    private stylesCode = '@use \'ngx-bsl/styles/index\';';
    protected styles = signal(highlight.highlightAuto(this.stylesCode, ['css']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
