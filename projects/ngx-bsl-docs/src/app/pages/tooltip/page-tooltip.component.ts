import {Component, signal, OnInit} from '@angular/core';
import {TooltipDirective} from '@ngx-bsl-lib';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-tooltip.component',
    imports: [
        TooltipDirective,
    ],
    templateUrl: './page-tooltip.component.html',
    host: {'[class.page]': 'true'},
})
export class PageTooltipComponent implements OnInit {
    private tooltipCode = `\
<p [ngxBslTooltip]="'Tooltip message'">Plain element with tooltip</p>
<button [ngxBslTooltip]="'Tooltip message'">Button with tooltip</button>`;
    protected tooltip = signal(highlight.highlightAuto(this.tooltipCode, ['xml']).value);

    private tooltipPositionsCode = `\
<button [ngxBslTooltip]="'Tooltip message'" [position]="'top'">Tooltip top</button>
<button [ngxBslTooltip]="'Tooltip message'" [position]="'bottom'">Tooltip bottom</button>
<button [ngxBslTooltip]="'Tooltip message'" [position]="'left'">Tooltip left</button>
<button [ngxBslTooltip]="'Tooltip message'" [position]="'right'">Tooltip right</button>`;
    protected tooltipPositions = signal(highlight.highlightAuto(this.tooltipPositionsCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
