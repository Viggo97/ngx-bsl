import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

/*
    eslint-disable max-len,
    @typescript-eslint/no-extraneous-class
*/
@Component({
    selector: 'ngx-bsl-icon-link',
    imports: [],
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H5v12h12v-6zM13 3v2h4.586l-7.793 7.793l1.414 1.414L19 6.414V11h2V3z"/>
        </svg>
  `,
    styleUrl: './icon.scss',
    host: {'[class.bsl-icon]': 'true'},
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class IconLinkComponent {}
