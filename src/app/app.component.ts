import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular11';

  constructor( public http: HttpClient, private loaderService:LoaderService ) { 

    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });

  }

  loading: boolean = false;

  ngOnInit(): void {
  }

  makeHttpCall() {
    this.http.get('https://jsonplaceholder.typicode.com/comments')
      .subscribe((r) => {
        console.log(r);
      });
  }

}
