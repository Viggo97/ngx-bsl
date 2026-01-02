import {Component, signal, OnInit} from '@angular/core';
import {SkeletonComponent} from '@ngx-bsl-lib';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-skeleton',
    imports: [
        SkeletonComponent,
    ],
    templateUrl: './page-skeleton.component.html',
    host: {'[class.page]': 'true'},
})
export class PageSkeletonComponent implements OnInit {
    private skeletonCodeRectangle = '<ngx-bsl-skeleton [width]="\'150px\'" [height]="\'32px\'"></ngx-bsl-skeleton>';
    protected skeletonRectangle = signal(highlight.highlightAuto(this.skeletonCodeRectangle, ['xml']).value);

    private skeletonCodeCircle = '<ngx-bsl-skeleton type="circle" size="3rem"></ngx-bsl-skeleton>';
    protected skeletonCircle = signal(highlight.highlightAuto(this.skeletonCodeCircle, ['xml']).value);

    private skeletonCodeSquare = '<ngx-bsl-skeleton type="square" size="3rem"></ngx-bsl-skeleton>';
    protected skeletonSquare = signal(highlight.highlightAuto(this.skeletonCodeSquare, ['xml']).value);

    ngOnInit(): void {
        highlight.highlightAll();
    }
}
