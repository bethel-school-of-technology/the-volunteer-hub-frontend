import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../model/post";
import { Organizations } from "../../model/organizations";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  posts: Post[];
  organizations: Organizations[];
  @Input() dataPath: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Post[]>(this.dataPath).subscribe(posts => {
      this.posts = posts;
    });
    this.http.get<Organizations[]>(this.dataPath).subscribe(organizations => {
      this.organizations = organizations;
    });
  }
}
