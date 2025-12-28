import {Component, signal, OnInit} from '@angular/core';
import highlight from '../../../highlightjs';
import {IconArrowLeftComponent,
    IconArrowLeftDoubleComponent,
    IconArrowRightComponent,
    IconArrowRightDoubleComponent,
    IconBurgerComponent,
    IconCheckComponent,
    IconChevronDownComponent,
    IconCompanyComponent,
    IconLanguageComponent,
    IconLocationComponent, IconMoonComponent, IconSunComponent, IconXMarkComponent} from '@ngx-bsl-lib';

@Component({
    selector: 'ngx-bsl-docs-page-icons.component',
    imports: [
        IconBurgerComponent,
        IconArrowLeftComponent,
        IconArrowLeftDoubleComponent,
        IconArrowRightComponent,
        IconArrowRightDoubleComponent,
        IconCheckComponent,
        IconChevronDownComponent,
        IconCompanyComponent,
        IconLanguageComponent,
        IconLocationComponent,
        IconMoonComponent,
        IconSunComponent,
        IconXMarkComponent,
    ],
    templateUrl: './page-icons.component.html',
    styles: `
      ul {
          margin-left: 16px;
          list-style: none;
      }

      li {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
      }
    `,
    host: {'[class.page]': 'true'},
})
export class PageIconsComponent implements OnInit {
    private iconsCode = `\
<ngx-bsl-icon-arrow-left />
<ngx-bsl-icon-arrow-left-double />
<ngx-bsl-icon-arrow-right />
<ngx-bsl-icon-arrow-right-double />
<ngx-bsl-icon-burger />
<ngx-bsl-icon-check />
<ngx-bsl-icon-chevron-down />
<ngx-bsl-icon-company />
<ngx-bsl-icon-language />
<ngx-bsl-icon-location />
<ngx-bsl-icon-moon />
<ngx-bsl-icon-sun / >
<ngx-bsl-icon-x-mark />
`;
    protected icons = signal(highlight.highlightAuto(this.iconsCode, ['xml']).value);

    ngOnInit() {
        highlight.highlightAll();
    }
}
