import { Component, OnInit } from '@angular/core';

// model
import { Product } from '../../../models/product';

// service
import { ProductService } from '../../../services/product.service';

// toastr

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  constructor(
    private productService: ProductService,
  ) { }

  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
    }
  }

}
