import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { SearchComponent } from './search/search.component';

export const asideRoutes: Routes = [
     { path: 'add', component: AddComponent, pathMatch: 'full' },
     { path: 'search', component: SearchComponent, pathMatch: 'full' },
];
