import { Component, signal } from '@angular/core';

@Component({
    selector: 'ngx-bsl-test-app-root',
    imports: [],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly title = signal('ngx-bsl-test-app');
}

