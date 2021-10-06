import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { IonSlides, ModalController, NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  imageUrl: string; 
  @ViewChild(IonSlides) slides: IonSlides
  sliderOpts = {
    zoom: true
  };

  constructor(private modalController: ModalController,
    private navParams : NavParams
    ) { }

  ngOnInit() {
    
  }


  ionViewDidEnter(){
    this.slides.update();
    this.getImage()
  }
  getImage = () => {
    const paramValue = this.navParams.get('value')
    this.imageUrl = paramValue
    console.log(paramValue)
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
