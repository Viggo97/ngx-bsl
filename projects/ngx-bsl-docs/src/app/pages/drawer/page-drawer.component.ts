import {Component, signal, OnInit, inject} from '@angular/core';
import {CdkConnectedOverlay, CdkOverlayOrigin, Overlay} from '@angular/cdk/overlay';
import {DrawerComponent} from '@ngx-bsl-lib';
import highlight from '../../../highlightjs';

@Component({
    selector: 'ngx-bsl-docs-page-drawer.component',
    imports: [
        DrawerComponent,
        CdkOverlayOrigin,
        CdkConnectedOverlay,
    ],
    templateUrl: './page-drawer.component.html',
    host: {'[class.page]': 'true'},
})
export class PageDrawerComponent implements OnInit {
    private drawerCodeTemplate = `\
<button cdkOverlayOrigin #drawerOrigin (click)="openDrawer()">Open drawer</button>
<ng-template
    cdkConnectedOverlay
    [cdkConnectedOverlayOrigin]="drawerOrigin"
    [cdkConnectedOverlayOpen]="drawerOpen()"
    [cdkConnectedOverlayScrollStrategy]="scrollStrategy"
    [cdkConnectedOverlayHasBackdrop]="true"
    (overlayOutsideClick)="closeDrawer()"
    (detach)="closeDrawer()">
        <ngx-bsl-drawer
            [title]="'Title of the drawer'"
            (closed)="closeDrawer()">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </ngx-bsl-drawer>
</ng-template>`;

    private drawerCodeClass = `\
export class ExampleComponent {
     private overlay = inject(Overlay);
     protected readonly scrollStrategy = this.overlay.scrollStrategies.block();
     protected drawerOpen = signal(false);
     protected openDrawer(): void {
         this.drawerOpen.set(true);
     }
     protected closeDrawer(): void {
         this.drawerOpen.set(false);
     }
}`;
    protected drawerTemplate = signal(highlight.highlightAuto(this.drawerCodeTemplate, ['xml']).value);
    protected drawerClass = signal(highlight.highlightAuto(this.drawerCodeClass, ['typescript']).value);

    ngOnInit() {
        highlight.highlightAll();
    }

    private overlay = inject(Overlay);
    protected readonly scrollStrategy = this.overlay.scrollStrategies.block();
    protected drawerOpen = signal(false);
    protected openDrawer(): void {
        this.drawerOpen.set(true);
    }
    protected closeDrawer(): void {
        this.drawerOpen.set(false);
    }
}
