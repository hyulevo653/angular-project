import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AuthResolver } from './shared/interceptors/auth.resolve';
import { ListUserComponent } from './components/list-user/list-user.component';

export const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard],
    resolve: { auth: AuthResolver },
    data: { endpoint: 'http://localhost:3000/api/product-search' }
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    // resolve: { auth: AuthResolver },
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-user',
    component: ListUserComponent,
    canActivate: [AuthGuard],
    resolve: { auth: AuthResolver },
    data: { endpoint: 'http://localhost:3000/api/get-all-user' }
  },
  { path: 'error-404', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
