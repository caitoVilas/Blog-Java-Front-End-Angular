import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchArticleComponent } from './components/search-article/search-article.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', redirectTo: ''},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'search', component: SearchArticleComponent},
  {path: 'new-article', component: NewArticleComponent},
  {path: 'user-messages', component: UserMessagesComponent},
  {path: 'article-detail/:id', component: ArticleDetailComponent},
  {path: 'article-comment/:id', component: NewCommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
