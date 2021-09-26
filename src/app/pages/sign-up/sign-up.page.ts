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


  public errorMessages ={
    name: [
      { type: 'required', message: 'Name is Required'},
      { type: 'maxlength', message: 'Name cant be longer than 100 character'}
    ],
    email: [
      { type: 'required', message: 'Email is Required'},
      { type: 'pattern', message: 'Enter your valid Email'}
    ],
    plainPassword: [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Password contain of upper and lower case letters and numbers.' }
    ],
    confirmpassword:[
      { type: 'required', message: 'Password is required.' },
      { type: 'areEqual', message: 'Confirm password is not same.' },
    ],
    username: [
      { type: 'required', message: 'Username is Required'},
      { type: 'maxlength', message: 'Username cant be longer than 100 character'}
    ],
    phone: [
      { type: 'required', message: 'Phone is Required'},
      { type: 'pattern', message: 'Please enter valid phone number'}
    ],
    address: [
      { type: 'required', message: 'Address is Required'},
      { type: 'pattern', message: 'Address cant be longer than 100 character'}
    ],

    
  };

  registrationForm = this.formBuilder.group({
    name: ['' , 
      [Validators.required,
      Validators.maxLength(100)]],
    
    email: ['',
      [Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$") ]],

    //password: ['', Validators.required,],  
    //Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    plainPassword: ['' , 
    [Validators.required,
    Validators.maxLength(100)]],

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
