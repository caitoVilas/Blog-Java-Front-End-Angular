import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/home/nav-bar/nav-bar.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AsideComponent } from './components/aside/aside.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { SearchArticleComponent } from './components/search-article/search-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MomentModule} from 'angular2-moment';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { CommetsArticleComponent } from './components/commets-article/commets-article.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    AsideComponent,
    BlogComponent,
    NewArticleComponent,
    SearchArticleComponent,
    UserMessagesComponent,
    LoaderComponent,
    ArticleDetailComponent,
    CommetsArticleComponent,
    NewCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
