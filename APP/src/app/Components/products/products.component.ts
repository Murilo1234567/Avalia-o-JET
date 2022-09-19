import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  public ngUnsubscribe = new Subject<void>();
  public imageUrl: any;
  public showDialogDelete = false;
  public showDialogUpdate = false;
  public errorMessage = false;
  public products: any = [];
  public filterName: any = '';
  public filtered = false;
  public productForm = new UntypedFormGroup({
    id: new UntypedFormControl(
      { value: '', disabled: false }
    ),
    name: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    image: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    description: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    stock: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    status: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    price: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    ),
    new_Price: new UntypedFormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required])
    )
  });

  colDefs = [
    {
      field: "name",
      header: "Nome do Produto",
      style: {
        width: "40%",
        "min-width": "120px",
      },
    },
    {
      field: "price",
      header: "Preço",
    },
    {
      field: "new_Price",
      header: "Preço Promoção",
    },
    {
      field: "stock",
      header: "Estoque",
    },
    {
      field: "status",
      header: "Visível",
    },
    {
      field: "actions",
      header: "Ações",
    }
  ];

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  ngOnInit() {
    this.GetAllProducts();
  }

  GetAllProducts() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._httpClient.get<any[]>('http://localhost:5000/api/Product/GetAllProducts', {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any) => {
        this.products = response;
        this.filtered = false;
      }
      );
    }
    
    GetProductsByName() {
    this.filterName = this.filterName == '' ? null : this.filterName
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._httpClient.get<any[]>('http://localhost:5000/api/Product/GetProductsByName/' + this.filterName, {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any) => {
        this.products = response;
        this.filtered = true;
      }
    );
  }

  DeleteProduct()
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._httpClient.delete('http://localhost:5000/api/Product/DeleteProduct/' + this.productForm.get('id')?.value, {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (response: any) => {
        this.showDialogDelete = false;
        if (this.filtered) {
          this.GetProductsByName();
        } else 
        {
          this.GetAllProducts();
        }
      }
    );
  }

  UpdateProduct()
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._httpClient.put('http://localhost:5000/api/Product/UpdateProduct', this.productForm.value, {headers}).pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (response: any) => {
        this.errorMessage = false;
        this.showDialogUpdate = false;
        if (this.filtered) {
          this.GetProductsByName();
        } else 
        {
          this.GetAllProducts();
        }
      },
      error: (error: any) => {
        this.errorMessage = true;
      }
    });
  }

  ShowDialogUpdate(rowData: any) {
    this.productForm.patchValue(rowData);
    this.imageUrl = rowData.image;
    this.showDialogUpdate = true;
  }

  ShowDialogDelete(rowData: any) {
    this.productForm.patchValue(rowData);
    this.showDialogDelete = true;
  }

  ChangeImageUrl(isSelect: boolean)
  {
    if (isSelect)
    {
      this.productForm.get('image')?.setValue(this.imageUrl);
    }
    else
    {
      this.productForm.get('image')?.setValue('');
    }
  }
}
