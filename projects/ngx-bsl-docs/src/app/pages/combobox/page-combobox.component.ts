import {Component, OnInit} from '@angular/core';
import highlight from '../../../highlightjs';
import {PageComboboxExampleSimpleComponent} from './examples/page-combobox-example-simple.component';
import {PageComboboxExampleFormComponent} from './examples/page-combobox-example-form.component';
import {PageComboboxExampleComplexComponent} from './examples/page-combobox-example-complex.component';
import {PageComboboxExampleGroupsComponent} from './examples/page-combobox-example-groups.component';

@Component({
    selector: 'ngx-bsl-docs-combobox.component',
    imports: [
        PageComboboxExampleSimpleComponent,
        PageComboboxExampleFormComponent,
        PageComboboxExampleComplexComponent,
        PageComboboxExampleGroupsComponent,
    ],
    templateUrl: './page-combobox.component.html',
    host: {'[class.page]': 'true'},
})
export class PageComboboxComponent implements OnInit {
    ngOnInit() {
        highlight.highlightAll();
    }
}

