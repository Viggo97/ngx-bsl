import {Component, computed, ElementRef, input, model, output, signal, viewChild} from '@angular/core';
import {IconArrowLeftComponent} from '../icons/icon-arrow-left.component';
import {IconArrowRightComponent} from '../icons/icon-arrow-right.component';
import {IconArrowLeftDoubleComponent} from '../icons/icon-arrow-left-double.component';
import {IconArrowRightDoubleComponent} from '../icons/icon-arrow-right-double.component';

@Component({
    selector: 'ngx-bsl-pagination',
    imports: [
        IconArrowLeftComponent,
        IconArrowRightComponent,
        IconArrowLeftDoubleComponent,
        IconArrowRightDoubleComponent,
    ],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
    page = model(1);
    total = input(1);
    size = input(10);
    nextPageAriaLabel = input('Next page');
    previousPageAriaLabel = input('Previous page');
    firstPageAriaLabel = input('First page');
    lastPageAriaLabel = input('Last page');
    selectPageAriaLabel = input('Select page');
    selectPageAriaLabelledBy = input<string | null>(null);

    pageChanged = output<number>();

    protected inputRef = viewChild.required<ElementRef<HTMLInputElement>>('inputRef');

    protected pages = computed(() => Math.ceil(this.total() / this.size()));
    protected disabled = signal(false);

    protected onInputBlur(value: number): void {
        if (isNaN(value) || value < -1) {
            this.page.set(1);
            this.inputRef().nativeElement.value = this.page().toString();
        }
        else if (value > this.pages()) {
            this.page.set(this.pages());
            this.inputRef().nativeElement.value = this.page().toString();
        }
        else {
            this.page.set(value);
        }
        this.pageChanged.emit(this.page());
    }

    protected onInputEnter(): void {
        this.pageChanged.emit(this.page());
    }

    protected onNextPage(event: PointerEvent): void {
        if (this.page() < this.pages()) {
            this.page.update(value => value + 1);
        }
        if (event.pointerType === '' && this.page() === this.pages()) {
            this.inputRef().nativeElement.focus();
        }
    }

    protected onPreviousPage(event: PointerEvent): void {
        if (this.page() > 1) {
            this.page.update(value => value - 1);
        }
        if (event.pointerType === '' && this.page() === 1) {
            this.inputRef().nativeElement.focus();
        }
    }

    protected onFirstPage(event: PointerEvent): void {
        this.page.set(1);
        if (event.pointerType === '') {
            this.inputRef().nativeElement.focus();
        }
    }

    protected onLastPage(event: PointerEvent): void {
        this.page.set(this.pages());
        if (event.pointerType === '') {
            this.inputRef().nativeElement.focus();
        }
    }
}
