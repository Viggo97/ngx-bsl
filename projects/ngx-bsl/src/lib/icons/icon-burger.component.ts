import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

/*
    eslint-disable @typescript-eslint/no-extraneous-class
*/
@Component({
    selector: 'ngx-bsl-icon-burger',
    imports: [],
    template: `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18L20 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 12L20 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 6L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
  `,
    styleUrl: './icon.scss',
    host: {'[class.bsl-icon]': 'true'},
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconBurgerComponent {}
