import {afterNextRender, Component, ElementRef, inject, input, output, signal} from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { IconXMarkComponent } from '../icons/icon-x-mark.component';

@Component({
    selector: 'ngx-bsl-drawer',
    imports: [
        CdkTrapFocus,
        IconXMarkComponent,
    ],
    templateUrl: './drawer.component.html',
    styleUrl: './drawer.component.scss',
    host: {
        'role': 'dialog',
        'aria-modal': 'true',
        '[attr.aria-label]': 'title()',
        '[class.closed]': 'isClosed()',
        '(transitionend)': 'onTransitionEnd($event)',
    },
})
export class DrawerComponent {
    title = input.required<string>();
    closed = output();
    protected isClosed = signal(true);
    private elementRef = inject(ElementRef);

    constructor() {
        afterNextRender(() => {
            this.isClosed.set(false);
        });
    }

    close(): void {
        this.isClosed.set(true);
    }

    protected onTransitionEnd(event: TransitionEvent) {
        if (this.elementRef.nativeElement === event.target) {
            if (this.isClosed()) {
                this.closed.emit();
            }
        }
    }
}
