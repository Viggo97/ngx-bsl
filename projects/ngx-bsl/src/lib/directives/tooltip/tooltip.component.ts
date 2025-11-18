import { Component } from '@angular/core';

@Component({
    selector: 'ngx-bsl-tooltip',
    imports: [],
    template: '{{message}}',
    styleUrl: './tooltip.component.scss',
    host: {'role': 'tooltip'},
})
export class TooltipComponent {
    message = '';
}
