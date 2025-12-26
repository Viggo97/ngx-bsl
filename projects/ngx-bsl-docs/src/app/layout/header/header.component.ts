import {Component, DestroyRef, effect, inject, input, signal, TemplateRef, viewChild} from '@angular/core';
import {NavigationStart, Router, Event, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Overlay} from '@angular/cdk/overlay';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {IconBurgerComponent} from '@ngx-bsl-lib';
import {ThemeSwitchComponent} from './theme-switch/theme-switch.component';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
    selector: 'ngx-bsl-docs-header',
    imports: [
        RouterLink,
        IconBurgerComponent,
        ThemeSwitchComponent,
        NavbarComponent,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);
    private overlay = inject(Overlay);
    private dialog = inject(Dialog);

    showCompactMenuIcon = input();

    protected sideNavTemplate = viewChild.required<TemplateRef<NavbarComponent>>('sideNavTemplate');

    protected sideNavOpen = signal(false);
    private dialogRef: DialogRef<void, NavbarComponent> | null = null;

    constructor() {
        effect(() => {
            if (!this.showCompactMenuIcon()) {
                this.sideNavOpen.set(false);
                this.dialogRef?.close();
            }
        });

        this.router.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event: Event) => {
                if (event instanceof NavigationStart) {
                    this.sideNavOpen.set(false);
                    this.dialogRef?.close();
                }
            });
    }

    protected openSideNav(): void {
        this.toggleDialog();
        this.sideNavOpen.update((value) => !value);
    }

    private toggleDialog(): void {
        if (!this.sideNavOpen()) {
            this.dialogRef = this.dialog.open(this.sideNavTemplate(),
                {positionStrategy: this.overlay.position().global()});
            this.dialogRef.closed
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.sideNavOpen.set(false);
                });
        }
    }
}
