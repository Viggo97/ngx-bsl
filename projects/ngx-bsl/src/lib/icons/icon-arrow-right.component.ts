import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

/*
    eslint-disable max-len,
    @typescript-eslint/no-extraneous-class
*/
@Component({
    selector: 'ngx-bsl-icon-arrow-right',
    imports: [],
    template: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M 7.547 0.284 C 7.464 0.194 7.364 0.123 7.255 0.074 C 7.145 0.025 7.026 0 6.907 0 C 6.788 0 6.67 0.025 6.56 0.074 C 6.45 0.123 6.35 0.194 6.267 0.284 C 6.096 0.469 6.001 0.716 6.001 0.974 C 6.001 1.231 6.096 1.479 6.267 1.663 L 15.834 11.998 L 6.267 22.334 C 6.181 22.427 6.113 22.537 6.067 22.657 C 6.021 22.778 5.999 22.907 6 23.036 C 6.001 23.166 6.027 23.294 6.076 23.414 C 6.124 23.533 6.195 23.641 6.283 23.732 C 6.367 23.818 6.466 23.886 6.575 23.932 C 6.684 23.978 6.801 24.001 6.918 24 C 7.036 23.998 7.152 23.972 7.26 23.923 C 7.368 23.875 7.465 23.804 7.547 23.715 L 17.721 12.719 C 17.9 12.526 18 12.267 18 11.998 C 18 11.728 17.9 11.469 17.721 11.276 L 7.547 0.284 Z"></path>
      </svg>
  `,
    styleUrl: './icon.scss',
    host: {'[class.bsl-icon]': 'true'},
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconArrowRightComponent {}
