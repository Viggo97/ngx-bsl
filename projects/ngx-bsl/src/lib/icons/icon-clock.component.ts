import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

/*
    eslint-disable @typescript-eslint/no-extraneous-class
*/
@Component({
    selector: 'ngx-bsl-icon-clock',
    imports: [],
    template: `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"/>
              <path d="M12 7v5l3 3"/></g>
      </svg>
  `,
    styleUrl: './icon.scss',
    host: {'[class.bsl-icon]': 'true'},
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconClockComponent {}
