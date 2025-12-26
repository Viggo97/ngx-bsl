import { Component, inject, signal } from '@angular/core';
import {ThemeService} from './theme.service';
import {Theme} from './theme.enum';
import {IconMoonComponent, IconSunComponent} from '@ngx-bsl-lib';

@Component({
    selector: 'ngx-bsl-docs-theme-switch',
    imports: [
        IconMoonComponent,
        IconSunComponent,
    ],
    templateUrl: './theme-switch.component.html',
})
export class ThemeSwitchComponent {
    private themeService = inject(ThemeService);

    protected readonly Theme = Theme;
    protected theme = signal(this.themeService.theme);

    onSwitchTheme(): void {
        this.theme.update(previousTheme => previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
        this.themeService.setTheme(this.theme());
    }
}
