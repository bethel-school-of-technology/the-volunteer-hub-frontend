import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../model/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  @Input() dataPath: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Post[]>(this.dataPath).subscribe(posts => {
      this.posts = posts;
      });
  }

}
