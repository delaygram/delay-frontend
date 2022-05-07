import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard, LoginGuard } from './core/guards';
import { RegisterComponent, ConfirmComponent, LoginComponent } from './modules/authentication';
import { FeedComponent } from './modules/feed/feed.component';
import { PostsComponent } from './modules/posts/posts.component';


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
    path: 'profile', component: PostsComponent, canActivate: [LoginGuard]
  },
  {
    path: '**', redirectTo: 'feed'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
