import {ChangeDetectionStrategy, Component, input, ViewEncapsulation} from '@angular/core';
import {IconCheckComponent} from '../../icons/icon-check.component';

@Component({
    selector: 'ngx-bsl-list-box-option',
    imports: [
        IconCheckComponent,
    ],
    template: `
        <ng-content></ng-content>
        <ngx-bsl-icon-check></ngx-bsl-icon-check>
    `,
    styleUrl: './list-box-option.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'role': 'option',
        '[attr.id]': 'id()',
    },
})
export class ListBoxOptionComponent<TOption> {
    value = input.required<TOption>();
    id = input.required<string>();
}
