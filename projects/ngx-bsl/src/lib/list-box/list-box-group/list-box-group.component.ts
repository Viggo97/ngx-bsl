import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
    selector: 'ngx-bsl-list-box-group',
    imports: [],
    template: `
        @if (title()) {
            <div class="group-title">{{ title() }}</div>
        }
        <ng-content></ng-content>
  `,
    styleUrl: './list-box-group.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBoxGroupComponent {
    title = input<string>();
}
