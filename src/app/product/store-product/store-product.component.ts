import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import * as internal from 'stream';
import { ProductService } from '../product.service';
import { Product, ProductAndDiscount } from '../product.model';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.scss']
})
export class StoreProductComponent implements OnInit {
  //Arrays, Objects, & string  
  allProducts: Product[] = [];
  allDiscountProducts: ProductAndDiscount[] = [];
  indexArray: number[] = [];
  productObject: Product = new Product();
  formValue      !: FormGroup;
  errorProductMsg: string = '';
  saveIndex: number = 0;

  //Array for Form Fields to add new Product
  newProduct: Product = {
    productId: 0,
    productSku: "",
    productName: "",
    productDescription: "",
    productCategory: "",
    productCost: 0.0,
    productQty: 0,
    productRemoved: false,
    imageUrl: ""
  }

  NewDiscountedProduct: ProductAndDiscount = {

    productId: 0,
    productSku: "",
    productName: "",
    productDescription: "",
    productCategory: "",
    productCost: 0.0,
    productQty: 0,
    imageUrl: "",
    productRemoved: false,
    discountId: 0,
    discountDescription: "",
    discountPercentage: 0
  }

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
    //add code for the update

    this.loadDiscountedProducts();
  }

  //Load all all Products
  loadProducts() {
    this.productService.getAllProductsService().subscribe(
      (response) => {

        //Loop to remove duplicated products if theres a discount for it
        for (let index = 0; index < this.allDiscountProducts.length; index++) {
          for (let index2 = 0; index2 < response.length; index2++) {
            if (this.allDiscountProducts[index].productId == response[index2].productId) {
              this.indexArray[this.saveIndex] = index;
              response.splice(index2, 1);
            }
          }
        }
        this.allProducts = response;
        //-- For Testing Remove later
        console.log("James testing");
        console.log(response);
      },
      (error) => {
        this.errorProductMsg = "Unable to get allProducts - Try later";
        console.log(this.errorProductMsg);
      }
    )
  }

  //Loads all Discounts
  loadDiscountedProducts() {
    this.productService.getAllDiscountsProductsService().subscribe(
      (response) => {
        this.allDiscountProducts = response;
        this.loadProducts();
        //-- For Testing Remove later
        console.log("James testing");
        console.log(response);
      },
      (error) => {
        this.errorProductMsg = "Unable to get allDiscountProducts - Try later";
        console.log(this.errorProductMsg);
      }
    )
  }

  //-----Example A function to search product(s) on sale
  productOnSale() {
    //do something or get by a speciific discount/sale endpoint 

  }
}