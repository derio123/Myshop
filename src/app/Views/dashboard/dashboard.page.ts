import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ToastController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private products = new Array<Product>();
  private productsSubscription: Subscription;
  public title = "Loja de Surf";
  private itemsTotal = 0;

  isAndroid: boolean = false;

  constructor(
    private myShopProduct: ProductService,
    private toastCtrl: ToastController,
    public platform: Platform,
    private myShop: AuthService) {
    this.isAndroid = platform.is("android");
    this.productsSubscription = this.myShopProduct.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  ngOnInit() { }

  ngOnDestroy() { this.productsSubscription.unsubscribe(); }

  async logout() {
    try {
      await this.myShop.logOut();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.myShopProduct.deleteProduct(id);
    } catch (error) {
      this.presentToast('Error ao excluir!');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
