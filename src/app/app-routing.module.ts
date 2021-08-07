import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchArticleComponent } from './components/search-article/search-article.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'search', component: SearchArticleComponent},
  {path: 'new-article', component: NewArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
