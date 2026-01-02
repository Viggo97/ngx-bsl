import {Routes} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {PageButtonComponent} from './pages/button/page-button.component';
import {PageCheckboxComponent} from './pages/checkbox/page-checkbox.component';
import {PageComboboxComponent} from './pages/combobox/page-combobox.component';
import {PageDrawerComponent} from './pages/drawer/page-drawer.component';
import {PageIconsComponent} from './pages/icons/page-icons.component';
import {PageInputComponent} from './pages/input/page-input.component';
import {PagePaginationComponent} from './pages/pagination/page-pagination.component';
import {PageRangeComponent} from './pages/range/page-range.component';
import {PageSelectComponent} from './pages/select/page-select.component';
import {PageSkeletonComponent} from './pages/skeleton/page-skeleton.component';
import {PageTooltipComponent} from './pages/tooltip/page-tooltip.component';
import {PageInstallationComponent} from './pages/installation/page-installation';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'installation',
        component: PageInstallationComponent,
    },
    {
        path: 'button',
        component: PageButtonComponent,
    },
    {
        path: 'checkbox',
        component: PageCheckboxComponent,
    },
    {
        path: 'combobox',
        component: PageComboboxComponent,
    },
    {
        path: 'drawer',
        component: PageDrawerComponent,
    },
    {
        path: 'icons',
        component: PageIconsComponent,
    },
    {
        path: 'input',
        component: PageInputComponent,
    },
    {
        path: 'pagination',
        component: PagePaginationComponent,
    },
    {
        path: 'range',
        component: PageRangeComponent,
    },
    {
        path: 'select',
        component: PageSelectComponent,
    },
    {
        path: 'skeleton',
        component: PageSkeletonComponent,
    },
    {
        path: 'tooltip',
        component: PageTooltipComponent,
    },
];
