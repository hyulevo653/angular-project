import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'search', component: SearchComponent },
    { path: 'error-404', component: NotFoundComponent },
    { path: '**', redirectTo: '/error-404' },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}