import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  public wavesPosition: number = 0;
  private wavesDifference: number = 100;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  validations_form: FormGroup;
  constructor(private nav: NavController,
    public keyboard: Keyboard,
    private authServe: AuthService,
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    /* this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
      ])),

    }) */
  }

  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;

    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    console.log(this.userLogin);
    await this.presentLoading();
    try {
       await this.authServe.login(this.userLogin);
       //const user =
      //user.user.uid;
      this.nav.navigateForward('/dashboard');
      this.presentToastLogin()
    } catch (error) {
      console.error(error);
      this.presentToastLoginErr(error.message);
    } finally {
      this.loading.dismiss();
    }

  }

  async register() {
    console.log(this.userRegister);

    await this.presentLoading();
    try {
      await this.authServe.register(this.userRegister);
      this.nav.navigateForward('/dashboard');
      this.presentToast2();
    } catch (error) {
      console.error(error);

      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde..',
      spinner: 'circles'
    });
    return this.loading.present();
  }

  //Messagens de sucesso
  async presentToast2() {
    const toast = await this.toastCtrl.create({
      message: 'Cadastro feito com sucesso :).',
      duration: 2000
    });
    toast.present();
  }

  async presentToastLogin() {
    const toast = await this.toastCtrl.create({
      message: 'Entrada feita com sucesso :).',
      duration: 2000
    });
    toast.present();
  }

  /*  async presentToast3(message: string) { //Sitaxe curta ES6
     const toast = await this.toastCtrl.create({ message: 'Email invalido, digite novamente!!', duration: 2000 });
     toast.present();
   } */

  //Messagens de erro
  async presentToast(_message: string) { //Sitaxe curta ES6
    const toast = await this.toastCtrl.create({ message: 'Error ao fazer o cadastro, repita os dados novamente!', duration: 2000 });
    toast.present();
  }

  async presentToastLoginErr(_message: string) { //Sitaxe curta ES6
    const toast = await this.toastCtrl.create({
      message: 'Error ao fazer o login ou campos em branco, repita os dados novamente!',
      duration: 2000
    });
    toast.present();
  }
}
