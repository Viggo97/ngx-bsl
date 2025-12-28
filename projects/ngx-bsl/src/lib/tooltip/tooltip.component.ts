import {ChangeDetectionStrategy, Component, signal, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'ngx-bsl-tooltip',
    imports: [],
    template: '{{message()}}',
    styleUrl: './tooltip.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {'role': 'tooltip'},
})
export class TooltipComponent {
    message = signal('');
}
