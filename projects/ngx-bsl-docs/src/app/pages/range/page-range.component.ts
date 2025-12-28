import {Component, signal, OnInit} from '@angular/core';
import highlight from '../../../highlightjs';
import {RangeComponent} from '@ngx-bsl-lib';

@Component({
    selector: 'ngx-bsl-docs-page-range.component',
    imports: [
        RangeComponent,
    ],
    templateUrl: './page-range.component.html',
    host: {'[class.page]': 'true'},
})
export class PageRangeComponent implements OnInit {
    private rangeTypeCode = `\
class Range {
    from: number;
    to: number;
}`;
    protected rangeType = signal(highlight.highlightAuto(this.rangeTypeCode, ['typescript']).value);

    private rangeCode = `\
<ngx-bsl-range
    [min]="0"
    [max]="10"
    [value]="{from: 2, to: 7}"
    [aria-label]="'Example range'"
    [aria-labelledby]="'Example range'"
    [showThumbLabels]="true">
</ngx-bsl-range>`;
    protected range = signal(highlight.highlightAuto(this.rangeCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
