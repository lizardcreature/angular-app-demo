import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = { id: 0, name: '', price: 0, description: '' };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  selectProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  saveProduct(): void {
    if (this.selectedProduct.id) {
      this.productService
        .updateProduct(this.selectedProduct.id, this.selectedProduct)
        .subscribe(() => this.loadProducts());
    } else {
      this.productService
        .createProduct(this.selectedProduct)
        .subscribe(() => this.loadProducts());
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
