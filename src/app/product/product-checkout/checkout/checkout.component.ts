import { Cart } from '../../cart.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartAndItems, ItemProductAndDiscount } from '../../cart-and-items.model';
import { ProductAndDiscount } from '../../product-and-discount.model';
import { CartAndItemsService } from '../services/cart-and-items.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  productAndDiscount: ProductAndDiscount = new ProductAndDiscount();

  cartAndItemsId: CartAndItems = new CartAndItems();
  cart: Cart = new Cart();
  totalCost: number = 0
  total: number = 0
  itemNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  errorMsg: string = "";
  displayStyle: string = "";
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private cartAndItemsService: CartAndItemsService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.displayAllCarts()
  }

  displayAllCarts() {
    //var cartId: any = this.activatedRoute.snapshot.paramMap.get("cartId");
    this.cartAndItemsService.getCartAndItemsService(1).subscribe((response) => {
      this.cartAndItemsId = response;
      console.log("discountDescription " + this.cartAndItemsId.cartItems[0].productAndDiscount.productName)
      this.totalCost = this.getItemsTotal()
      console.log("total = " + this.totalCost.toFixed(2))
    }, error => {
      this.errorMsg = 'There was some internal error! Please try again later!';
      console.log(error);
    });
  }

  getItemsTotal(): any {
    this.cartAndItemsId.cartItems.forEach((value, index) => {
      console.log("discountPercentage" + value.productAndDiscount.discountPercentage)
      console.log("productCost" + value.productAndDiscount.productCost)

      if (value.productAndDiscount.discountPercentage < 1.0) {
        this.total += value.productAndDiscount.productCost
        console.log("my new total = " + this.total.toFixed(2))
      } else {
        this.total += value.productAndDiscount.productCost - ((value.productAndDiscount.discountPercentage / 100) * value.productAndDiscount.productCost)

        console.log("my total = " + this.total.toFixed(2))
      }
    })
    return this.total
  }

  remove(productId: number) {
    console.log("remove product" + productId)
    this.productAndDiscount.productRemoved = true
  }

  changequantity(event: any) {
    console.log("change quantity Number " + event.target.value)
  }

  proceedToCheckout() {
    this.displayStyle = "block";
    this.cartAndItemsId.cartRemoved = true
    this.cartAndItemsId.cartPaid = true

    // this.transactionService.sendTransaction().subscribe((response) => {

    // }, error => {
    //   this.errorMsg = 'There was some internal error! Please try again later!';
    // });

    setInterval(() => {
      this.displayStyle = "none";
      this.router.navigate(['/home']);
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval();
  }


}