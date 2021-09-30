import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  @Input('Images')Images: any;
  @ViewChild(IonSlides) slides: IonSlides
  sliderOpts = {
    zoom: true
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.slides.update();
  }
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;

    zoomIn ? zoom.in() : zoom.out();
  }


  close(){
    this.modalController.dismiss();
  }
}
