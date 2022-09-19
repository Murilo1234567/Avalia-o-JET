import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent implements OnInit {
  public ngUnsubscribe = new Subject<void>();
  public productDetails: any;

  constructor(private _activatedRoute: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (params: any) => {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._httpClient.get('http://localhost:5000/api/Product/GetProductById/' + Object(params).id, {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (response: any) => {
            this.productDetails = response;
          }
        );
      }
    );
  }

  UpdateProduct(isMinus: boolean)
  {
    this.productDetails.stock = isMinus ? this.productDetails.stock - 1 : this.productDetails.stock + 1;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._httpClient.put('http://localhost:5000/api/Product/UpdateProduct', this.productDetails, {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }
}
