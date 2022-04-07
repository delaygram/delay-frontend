import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard, LoginGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'confirm', component: ConfirmComponent, canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'feed', component: FeedComponent, canActivate: [LoginGuard]
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
