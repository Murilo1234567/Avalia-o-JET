import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateComponent } from './Components/create/create.component';
import { ProductsComponent } from './Components/products/products.component';
import { StoreComponent } from './Components/store/store.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: CreateComponent
      },
      {
        path: 'produtos',
        component: ProductsComponent
      },
      {
        path: 'loja',
        component: StoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
