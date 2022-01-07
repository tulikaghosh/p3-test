import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductAndDiscount } from 'src/app/product/product-and-discount.model';
import { Product } from 'src/app/product/product.model';
import { Discount } from 'src/app/product/product.model';
import { FileUploadService } from 'src/app/uploads/file-upload.service';
import { ProductService } from '../../product/product.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  //Arrays, Objects, & string
  allProducts: Product[] = [];
  productObject: Product = new Product();
  formValue         !: FormGroup;
  formValueProduct  !: FormGroup;
  formValueDiscount !: FormGroup;
  formValueDiscountUpdate !: FormGroup;
  errorProductMsg: string = '';
  //Array for Form Fields to add new Product
  newProduct: Product = {
    productId: 0,
    productSku: "",
    productName: "",
    productDescription: "",
    productCategory: "",
    productCost: 0,
    productQty: 0,
    productRemoved: false,
    imageUrl: ""
  }
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private productService: ProductService,
    private fileUploadService: FileUploadService) { }
  ngOnInit(): void {
    //for the modal input type form value
    this.formValue = this.formbuilder.group({
      product_sku: [''],
      product_name: [''],
      product_cost: [''],
      product_category: [''],
      product_description: [''],
      product_qty: [''],
      image_url: ['']
    })

    this.formValueProduct = this.formbuilder.group({
      product_sku: [''],
      product_name: [''],
      product_cost: [''],
      product_category: [''],
      product_description: [''],
      product_qty: [''],
      image_url: ['']
    })

    this.formValueDiscount = this.formbuilder.group({
      discount_percentage: [''],
      discount_description: ['']
    })

    this.formValueDiscountUpdate = this.formbuilder.group({
      discount_percentage: [''],
      discount_description: ['']
    })
    //Load all Products
    this.loadDiscountProducts();
    this.loadProducts();
  }
  //Load all all Products
  loadProducts() {
    this.productService.getAllProductsService().subscribe(
      (response: any) => {

        //Loop to remove duplicated products if theres a discount for it
        for (let index = 0; index < this.allDiscountProducts.length; index++) {
          for (let index2 = 0; index2 < response.length; index2++) {
            if (this.allDiscountProducts[index].productId == response[index2].productId) {
              response.splice(index2, 1);
            }
          }
        }
        this.allProducts = response;
      },
      (error: any) => {
        this.errorProductMsg = "Unable to get allProducts - Try later";
        console.log(this.errorProductMsg);
      }
    )
  }

  public uploadImage(imageInput: any) {
    const reader = new FileReader(); console.log(reader);

    console.log(imageInput.files[0]);
    this.fileUploadService.onUpload(imageInput.files[0]).subscribe({
      next: async (response) => {

        this.productObject.imageUrl = response;
        this.newProduct.imageUrl = response;
        
      },
      error: err => {
        console.log(err);
      }
    })

  }
  // to add Product
  addProducts() {
    this.newProduct.productSku = this.formValue.value.product_sku;
    this.newProduct.productName = this.formValue.value.product_name;
    this.newProduct.productCost = this.formValue.value.product_cost;
    this.newProduct.productCategory = this.formValue.value.product_category;
    this.newProduct.productDescription = this.formValue.value.product_description;
    this.newProduct.productQty = this.formValue.value.product_qty;

    // Let's post the data through the post request in service
      this.productService.addProductsService(this.newProduct).subscribe(
        (response) => {
          this.loadProducts();
          console.log("James Testing addProducts");
          console.log(response);
        },
        (error) => {
          console.log(error);
        })
      //for testing removed later
      // alert("Product was added Successfully");
      //Close the Form Automatically
      let ref = document.getElementById("cancel");
      ref?.click();
      this.formValue.reset();
      this.router.navigate(['admin'])
      //Reload the page
      this.loadProducts();
  }
  //Method to set the new values on to the modal table rows
  onEditRow(row: any) {
    this.productObject.productId = row.productId;
    //The input Text fields to change values for
    this.formValue.controls["product_sku"].setValue(row.productSku);
    this.formValue.controls["product_name"].setValue(row.productName);
    this.formValue.controls["product_cost"].setValue(row.productCost);
    this.formValue.controls["product_category"].setValue(row.productCategory);
    this.formValue.controls["product_description"].setValue(row.productDescription);
    this.formValue.controls["product_qty"].setValue(row.productQty);
    this.formValue.controls["image_url"].setValue("");
    console.log(row.productName);
    console.log(row.productCategory);


    //Reload the page
    this.loadProducts();
  }
  //method to update the product
  updateProducts() {
    this.productObject.productSku = this.formValue.value.product_sku;
    this.productObject.productName = this.formValue.value.product_name;
    this.productObject.productCost = this.formValue.value.product_cost;
    this.productObject.productCategory = this.formValue.value.product_category;
    this.productObject.productDescription = this.formValue.value.product_description;
    this.productObject.productQty = this.formValue.value.product_qty;
    console.log(this.formValue.value.image_url);
    //add more later if needed
    this.productService.updateProductsService(this.productObject).subscribe(
      (response) => {
        //for testing remove later
        console.log(response);
        //Let's reload the page once update is done
        this.router.navigate(['admin']);
        // alert("Product was updated successfully");
        //Close the Form Automatically
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.router.navigate(['admin'])
        //Reload the page
        this.loadProducts();
      })
  }
  // delete a product
  deleteProduct(pId: number) {
    this.productService.deleteProductsService(pId).subscribe(
      (Response) => {
        this.loadProducts();
      },
      (error) => console.log(error)
    )
  }
  //--------- ProductAndDiscount Section------------//
  allDiscountProducts: ProductAndDiscount[] = [];
  discountObject: Discount = new Discount;
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

  newDiscount: Discount = {
    discountId: 0,
    productId: 0,
    discountDescription: "",
    discountPercentage: 0.0
  }


  //For loading all Discount Products
  loadDiscountProducts() {
    this.productService.getAllDiscountsProductsService().subscribe(
      (response) => {
        this.allDiscountProducts = response;
        console.log(response);
      },
      (error) => {
        this.errorProductMsg = "Unable to get allDiscountProducts - Try later";
        console.log(this.errorProductMsg);
      }
    )
  }
  //For adding Discount Products
  addDiscountProducts() {
    this.newDiscount.discountPercentage = this.formValueDiscount.value.discount_percentage;
    this.newDiscount.discountDescription = this.formValueDiscount.value.discount_description;

    //recieves the productID from OnEditRow(row)
    this.newDiscount.productId = this.productObject.productId;

    // Let's post the data through the post request in service
    this.productService.addDiscountService(this.newDiscount).subscribe(
      (response) => {
        this.loadDiscountProducts();
        this.loadProducts();
        console.log(response);
      },
      (error) => {
        console.log(error);
      })
    //for testing removed later
    // alert("Product was added Successfully");
    //Close the Form Automatically
    let ref = document.getElementById("cancel");
    ref?.click();
    this.formValue.reset();
    this.router.navigate(['admin'])
    //Reload the page
    this.loadDiscountProducts();
    this.loadProducts();
  }
  // for updating Discount Products
  updateDiscountProducts() {
    this.discountObject.discountPercentage = this.formValueDiscount.value.discount_percentage;
    this.discountObject.discountDescription = this.formValueDiscount.value.discount_description;
    //add more later if needed
    this.productService.updateDiscountService(this.discountObject).subscribe(
      (response) => {
        //Let's reload the page once update is done
        this.router.navigate(['admin']);
        //alert("Discount was updated successfully");
        //Close the Form Automatically
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValueDiscount.reset();
        this.router.navigate(['admin'])
        //Reload the page
        this.loadDiscountProducts();
        this.loadProducts();
      })
  }
  //For Deleting Discount Products
  deleteDiscountProducts(discountId: number) {
    this.productService.deleteDiscountService(discountId).subscribe(
      (Response) => {
        this.loadDiscountProducts();
        this.loadProducts();
      },
      (error) => console.log(error)
    )
  }

  //Method to set the new values on to the modal table rows
  onDiscountEditRow(row: any) {
    this.discountObject.discountId = row.discountId;
    this.discountObject.productId = row.productId;
    console.log(this.discountObject.productId);
    //The input Text fields to change values for
    //To add discounts
    this.formValueDiscount.controls["discount_percentage"].setValue(row.discountPercentage);
    this.formValueDiscount.controls["discount_description"].setValue(row.discountDescription);
    //To update discounts
    this.formValueDiscountUpdate.controls["discount_percentage"].setValue(row.discountPercentage);
    this.formValueDiscountUpdate.controls["discount_description"].setValue(row.discountDescription);
    //Reload the page
    this.loadDiscountProducts();
    this.loadProducts();
  }
}//end class