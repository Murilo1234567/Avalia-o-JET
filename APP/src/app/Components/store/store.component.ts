import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less']
})
export class StoreComponent implements OnInit {
  public ngUnsubscribe = new Subject<void>();
  public products: any = [];

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._httpClient.get<any[]>('http://localhost:5000/api/Product/GetAllProducts', {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any) => {
        this.products = response;
      }
    );
  }

}
