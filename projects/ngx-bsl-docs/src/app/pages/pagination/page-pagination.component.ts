import {Component, signal, OnInit} from '@angular/core';
import {PaginationComponent} from '@ngx-bsl-lib';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-pagination.component',
    imports: [
        PaginationComponent,
    ],
    templateUrl: './page-pagination.component.html',
    host: {'[class.page]': 'true'},
})
export class PagePaginationComponent implements OnInit {
    private paginationCode = `\
<ngx-bsl-pagination
    style="width: 500px"
    [page]="1"
    [total]="30"
    [size]="5"
    (pageChanged)="onPageChange($event)">
</ngx-bsl-pagination>`;
    protected pagination = signal(highlight.highlightAuto(this.paginationCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
