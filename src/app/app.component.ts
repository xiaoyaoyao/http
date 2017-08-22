import {Component} from '@angular/core';
import {HttpService} from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  result: any;

  constructor(private http: HttpService) {
    this.http.getData().subscribe((data: any) => {
      console.log('-------------result---------');
      console.log(data);
      this.result = JSON.stringify(data);

    });

  }
}
