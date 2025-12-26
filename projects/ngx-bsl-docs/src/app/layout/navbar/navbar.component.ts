import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'ngx-bsl-docs-navbar',
    imports: [
        RouterLink,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class NavbarComponent {}
