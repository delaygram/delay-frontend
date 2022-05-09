import { Post } from '../../shared/models/post';
import { PostService } from 'src/app/core/services';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    this._postService.getMyPost().pipe(first()).subscribe(
      response => {
        console.log(response);
        this.posts = response;
        this.posts.reverse();
      }
    );
  }

}
