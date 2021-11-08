import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { SignInPage } from '../sign-in/sign-in.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  displayRole: string;
  role: any;
  toggle = false;

  userForm = {
    name: '',
    username: '',
    email: '',
    plainPassword: '',
    plainConfirmPassword: '',
    contactNumber: '',
    address: '',
    gender: '',
  };

  get name(){
    return this.registrationForm.get('name');
  }

  get email(){
    return this.registrationForm.get('email');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmpassword(){
    return this.registrationForm.get('confirmpassword');
  }
  get username(){
    return this.registrationForm.get('username');
  }
  get phone(){
    return this.registrationForm.get('phone');
  }
  get address(){
    return this.registrationForm.get('address');
  }
 

  public errorMessages ={
    name: [
      { type: 'required', message: 'Name is Required'},
      { type: 'pattern', message: ''}
    ],
     email: [
      { type: 'required', message: 'Email is Required'},
      { type: 'pattern', message: 'Enter your valid Email'}
    ],
    password: [
      { type: 'required', message: 'Password is Required'},
      { type: 'pattern', message: 'Password compose of Upper/lower case and digits'}
    ],
    confirmpassword: [
      { type: 'required', message: 'Confirm Password is Required'},
      { type: 'pattern', message: ''}
    ],
    username: [
      { type: 'required', message: 'Username is Required'},
     
    ],
    phone: [
      { type: 'required', message: 'Phone No. is Required'},
     
    ],  
    address: [
      { type: 'required', message: 'Address is Required'},
     
    ], 
  };

  registrationForm = this.formBuilder.group({
    name: ['' , 
      [Validators.required,
      Validators.pattern('^[A-Za-z-ñÑáéíóúÁÉÍÓÚ ]+$')]],
    
    email: ['',
      [Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$") ]],

    //password: ['', Validators.required,],  
    //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    password: ['' , 
    [Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],

    confirmpassword:['',[Validators.required,
      Validators.maxLength(100)]],


    username: ['' , 
      [Validators.required,
      Validators.maxLength(100)]],
    
    phone: ['',[Validators.required,
      Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$") ]],
    
    address: ['',[Validators.required,
      Validators.maxLength(100)]],
    
   
  });

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkRole();
  }

  public submit(){
    console.log(this.registrationForm.value)
  }

  ngOnInit() {}

  useToggle() {
    this.toggle = !this.toggle;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  checkRole() {
    this.role = this.navParams.get('role');
    if (this.role === 'owner') {
      this.displayRole = 'Owner';
    } else if (this.role === 'tenant') {
      this.displayRole = 'Tenant';
    }
  }

  async openModal(role) {
    const modal = await this.modalController.create({
      component: SignInPage,
      componentProps: {
        role,
      },
    });
    modal.present();
  }

  chooseGender(gender) {
    console.log(gender);
  }

  signUpAction(role) {
    return this.userService
      .signUpRequest(this.userForm, role)
      .then((response) => {
        response.subscribe((response) => {
          console.log(response);
          this.closeModal();
          this.openModal(role);
        });
      });
  }
}
