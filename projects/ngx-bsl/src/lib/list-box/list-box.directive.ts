import {contentChildren, Directive, ElementRef, input, signal} from '@angular/core';
import {Subject} from 'rxjs';
import {ListBoxOptionComponent} from './list-box-option/list-box-option.component';

@Directive({selector: '[ngxBslListBox]'})
export class ListBoxDirective<TOption> {
    listBoxId = input.required<string>();
    listBoxAriaLabel = input<string>();
    listBoxAriaLabelledby = input<string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    optionValueEquality = input<(value: any, optionValue: any) => boolean>(
        (value, optionValue) => value === optionValue,
    );

    listBoxOptions = contentChildren(ListBoxOptionComponent<TOption>, {descendants: true});
    listBoxOptionRefs = contentChildren<ListBoxOptionComponent<TOption>, ElementRef<HTMLElement>>
    (ListBoxOptionComponent, { descendants: true, read: ElementRef<HTMLElement> });

    ariaActiveDescendant = signal<string | null>(null);
    selectOption = new Subject<TOption | null>();
    hasAriaSelected = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initSelectedOption(value: any): void {
        const optionIndex = this.listBoxOptions()
            .findIndex(option => this.optionValueEquality()(value, option.value));
        if (optionIndex !== -1) {
            this.setSelectedAttribute(optionIndex);
            this.setVisualFocus(optionIndex);
        } else {
            this.clearVisualFocus();
            this.removeSelectedAttribute();
        }
    }

    onClick(event: MouseEvent): void {
        const element = event.target as HTMLElement;
        const isOption = element.matches('[role="option"]');
        if (isOption) {
            this.removeSelectedAttribute();
            this.clearVisualFocus();
            const optionIndex = this.listBoxOptionRefs().findIndex(o => o.nativeElement.id === element.id);
            this.setSelectedAttribute(optionIndex);
            this.setVisualFocus(optionIndex);
            this.selectOption.next(this.listBoxOptions()[optionIndex].value());
        }
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            this.handleSelectionKeys();
            return;
        }

        if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.preventDefault();
            this.handleArrowKeys(event);
            return;
        }
    }

    private handleSelectionKeys(): void {
        const optionIndex = this.getVisuallyFocusedOptionRefIndex();

        if (optionIndex !== -1) {
            this.removeSelectedAttribute();
            this.setSelectedAttribute(optionIndex);
            this.selectOption.next(this.listBoxOptions()[optionIndex].value());
        } else {
            this.selectOption.next(null);
        }
    }

    private handleArrowKeys(event: KeyboardEvent): void {
        const optionIndex = this.getVisuallyFocusedOptionRefIndex();
        const firstOption = 0;
        const lastOption = this.listBoxOptionRefs().length - 1;

        if (optionIndex === -1) {
            if (event.code === 'ArrowDown') {
                this.setVisualFocus(firstOption);
            } else if (event.code === 'ArrowUp') {
                this.setVisualFocus(lastOption);
            }
            return;
        }

        this.removeVisualFocus(optionIndex);

        if (event.code === 'ArrowDown') {
            if (optionIndex === lastOption) {
                this.setVisualFocus(firstOption);
            } else {
                this.setVisualFocus(optionIndex + 1);
            }
        } else if (event.code === 'ArrowUp') {
            if (optionIndex === 0) {
                this.setVisualFocus(lastOption);
            } else {
                this.setVisualFocus(optionIndex - 1);
            }
        }
    }

    private getVisuallyFocusedOptionRefIndex(): number {
        return this.listBoxOptionRefs().findIndex(r => r.nativeElement.classList.contains('visual-focus'));
    }

    setVisualFocus(optionIndex: number): void {
        const option = this.listBoxOptionRefs()[optionIndex];
        option.nativeElement.classList.add('visual-focus');
        this.ariaActiveDescendant.set(option.nativeElement.id);
    }

    private removeVisualFocus(optionIndex: number): void {
        this.listBoxOptionRefs()[optionIndex].nativeElement.classList.remove('visual-focus');
        this.ariaActiveDescendant.set(null);
    }

    clearVisualFocus(): void {
        const optionIndex = this.getVisuallyFocusedOptionRefIndex();
        if (optionIndex !== -1) {
            this.removeVisualFocus(optionIndex);
        }
    }

    private setSelectedAttribute(optionIndex: number): void {
        if (!this.hasAriaSelected) return;
        this.listBoxOptionRefs()[optionIndex].nativeElement.setAttribute('aria-selected', 'true');
    }

    private removeSelectedAttribute(): void {
        if (!this.hasAriaSelected) return;
        this.listBoxOptionRefs()
            .find(o => o.nativeElement.hasAttribute('aria-selected'))?.nativeElement.removeAttribute('aria-selected');
    }
}
