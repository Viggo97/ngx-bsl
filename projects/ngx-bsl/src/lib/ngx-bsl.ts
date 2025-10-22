import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ngx-bsl-test',
    imports: [],
    template: `
    <p>
      ngx-bsl test component works!
    </p>
  `,
    styles: '',
})
export class NgxBsl implements OnInit {

    ngOnInit(): void {
        console.log('NgBslTest component');
    }
}
