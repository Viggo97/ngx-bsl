import { Component, OnInit } from '@angular/core';
import highlight from '../../../highlightjs';
import {PageSelectExampleSimpleComponent} from './examples/page-select-example-simple.component';
import {PageSelectExampleFormComponent} from './examples/page-select-example-form.component';
import {PageSelectExampleComplexComponent} from './examples/page-select-example-complex.component';
import {PageSelectExampleSimpleMixedComponent} from './examples/page-select-example-mixed.component';
import {PageSelectExampleGroupsComponent} from './examples/page-select-example-groups.component';

@Component({
    selector: 'ngx-bsl-docs-page-select.component',
    imports: [
        PageSelectExampleSimpleComponent,
        PageSelectExampleFormComponent,
        PageSelectExampleComplexComponent,
        PageSelectExampleSimpleMixedComponent,
        PageSelectExampleGroupsComponent,
    ],
    templateUrl: './page-select.component.html',
    host: {'[class.page]': 'true'},
})
export class PageSelectComponent implements OnInit {
    ngOnInit() {
        highlight.highlightAll();
    }
}
