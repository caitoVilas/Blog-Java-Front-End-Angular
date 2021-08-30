import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleResponse } from 'src/app/models/articleResponse';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css'],
  providers: [ArticleService]
})
export class SearchArticleComponent implements OnInit {

  search: string;
  page: number = 0;
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  pgs: number[] = [];
  actualPage: number

  articles: ArticleResponse[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService) { }

  ngOnInit(): void {
    window.scroll(0,300);
    this.route.params.subscribe(p => {
      this.search = p.search;
    });
    this.getSearch(this.search, this.page);
  }

  goHome(){
    window.location.href = '/';
  }

  getSearch(search: string, page: number){
    this.pgs = [];
    this.articles = [];
    window.scroll(0,300);
    this.articleService.searchArticles(search, page).subscribe(
      res => {
        this.articles = res.content;
        this.isFirst = res.first;
        this.isLast = res.last;
        this.totalPages = res.totalPages;
        this.actualPage = res.number;
        for(let i = 0; i < this.totalPages; i++){
          this.pgs.push(i + 1);
        }
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: `ERROR: ${err.error.message}`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }

  goDetails(id: number){
    this.router.navigate(["article-detail/", id])
  }

}
