import { Component, signal } from '@angular/core';
import {NgxBslTest} from '@ngx-bsl-lib';

@Component({
    selector: 'ngx-bsl-test-app-root',
    imports: [NgxBslTest],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('ngx-bsl-test-app');
}

