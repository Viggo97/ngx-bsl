import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

/*
    eslint-disable max-len,
    @typescript-eslint/no-extraneous-class
*/
@Component({
    selector: 'ngx-bsl-icon-chevron-down',
    imports: [],
    template: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8 L12 16 L20 8"/>
      </svg>
  `,
    styleUrl: './icon.scss',
    host: {'[class.bsl-icon]': 'true'},
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconChevronDownComponent {}
