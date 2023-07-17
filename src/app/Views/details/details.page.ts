import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private productId: string = null;
  private product: Product = {
    quantity: 0
  };
  private loading: any;
  private productSubscription: Subscription;

  constructor(
    private myShopProduct: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private myShop: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  loadProduct() {
    this.productSubscription = this.myShopProduct.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  async save() {
    await this.presentLoading();

    this.product.userId = this.myShop.getAuth().currentUser.uid;

    if (this.productId) {
      try {
        await this.myShopProduct.updateProduct(this.productId, this.product);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('dashboard');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.product.createdAt = new Date().getTime();

      try {
        await this.myShopProduct.addProduct(this.product);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('dashboard');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
