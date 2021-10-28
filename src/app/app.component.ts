import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  rows: any;
  openCount: any = 0;
  closedCount: any = 0;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.overview();
    // this.rows.push({
    //   sno: 1,
    //   issueNo: "issueNo",
    //   issueName: "issueName",
    // });
    // this.rows.push({
    //   sno: 1,
    //   issueNo: "issueNo",
    //   issueName: "issueName",
    // });

  }
  showIssues(type: string) {
    this.rows = [{}]
    this.getIssues({
      status: type,

    }, (res: any) => {
      if (res.status) {
        let item = res.data.items;
        console.log(item);
        item.forEach((v: any, i: any) => {

          this.rows.push({
            sno: i + 1,
            issueName: v.title
          })
        })

      }
    })
  }
  getIssues(param: any, callback: any) {

    this.http.get("https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:" + param.status + "&per_page=10&page=1").subscribe((data) => {
      console.log(data);
      callback({ status: true, data: data });
    })
  }
  overview() {
    this.http.get("https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:open").subscribe((data: any) => {
      console.log(data);
      this.openCount = data.total_count;;
      // callback({ status: true, data: data });
    })
    this.http.get("https://api.github.com/search/issues?q=repo:angular/angular/node+type:issue+state:closed").subscribe((data: any) => {
      this.closedCount = data.total_count;
    })
  }
  title = 'gitIssues';

}
