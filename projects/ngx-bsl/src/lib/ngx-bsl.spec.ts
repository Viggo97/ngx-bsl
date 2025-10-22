import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxBsl} from './ngx-bsl';

describe('NgxBsl', () => {
    let component: NgxBsl;
    let fixture: ComponentFixture<NgxBsl>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({imports: [NgxBsl]})
            .compileComponents();

        fixture = TestBed.createComponent(NgxBsl);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
