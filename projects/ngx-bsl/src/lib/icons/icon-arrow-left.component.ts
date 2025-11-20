import {ChangeDetectionStrategy, Component} from '@angular/core';

/*
    eslint-disable max-len,
    @typescript-eslint/no-extraneous-class
*/
@Component({
    selector: 'ngx-bsl-icon-arrow-left',
    imports: [],
    template: `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path fill="currentColor" d="M 16.453 0.282 C 16.536 0.195 16.636 0.124 16.744 0.075 C 16.853 0.025 16.971 0 17.091 0 C 17.211 0 17.331 0.025 17.439 0.075 C 17.547 0.124 17.647 0.195 17.731 0.282 C 17.902 0.469 17.997 0.714 17.997 0.975 C 17.997 1.23 17.902 1.48 17.731 1.662 L 8.166 11.995 L 17.731 22.333 C 17.817 22.425 17.883 22.536 17.931 22.657 C 17.979 22.777 18.003 22.905 18 23.032 C 17.997 23.161 17.971 23.293 17.922 23.413 C 17.874 23.532 17.803 23.641 17.715 23.728 C 17.631 23.815 17.535 23.883 17.425 23.928 C 17.314 23.976 17.199 24 17.079 24 C 16.962 23.995 16.849 23.968 16.741 23.92 C 16.633 23.871 16.533 23.8 16.453 23.713 L 6.279 12.718 C 6.102 12.525 6 12.267 6 11.995 C 6 11.727 6.102 11.467 6.279 11.274 L 16.453 0.282 Z"></path>
      </svg>
  `,
    styleUrl: './icon.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconArrowLeftComponent {}
