import {Component, DestroyRef, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {BreakpointObserver} from '@angular/cdk/layout';
import {HeaderComponent} from './layout/header/header.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';

@Component({
    selector: 'ngx-bsl-docs-root',
    imports: [
        RouterOutlet,
        HeaderComponent,
        NavbarComponent,
        FooterComponent,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    providers: [],
})
export class App {
    private breakpointObserver = inject(BreakpointObserver);
    private destroyRef = inject(DestroyRef);

    protected compactMode = signal(false);

    constructor() {
        this.subscribeToBreakpointObserver();
    }

    private subscribeToBreakpointObserver(): void {
        this.breakpointObserver.observe('(min-width: 960px)')
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((state) => {
                this.compactMode.set(!state.matches);
            });
    }
}

