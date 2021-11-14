import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  createNewLoading = async (message: string) => {
    const loading = await this.loadingController.create({
      message,
      spinner: 'bubbles',
      cssClass:'loading-css-class'
    });
    loading.present();
  }

  dismissLoading = () => {
    this.loadingController.dismiss();
  }
}

