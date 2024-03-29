import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/userModel';
import { ProfileImage } from 'src/app/models/profileImage';
import { api } from 'src/api';

const url = api.url;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  url = url;
  userDetailData: UserModel;
  profileImageData: ProfileImage;
  documentUrl: string;
  imageUrl: string;
  previousPage: string;
  userDocument: any = [];
  message: string;

  buttons = [
    {
      name: 'Accept',
      condition: (userDocuments) => {
        return this.disableButtonCondition(userDocuments);
      },
      color: 'success',
      toDo: (userId) => {
        this.verifytUserAccount(userId);
      },
    },
    {
      name: 'Deny',
      condition: (userDocuments) => {
        return this.disableButtonCondition(userDocuments);
      },
      color: 'danger',
      toDo: (userId) => {
        this.denyUserAccountVerification(userId);
      },
    },
  ];

  disableButtonCondition = (userDocuments) => {
    if (userDocuments.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit = () => {};

  ionViewDidEnter = () => {
    this.activatedRoute.paramMap.subscribe((params) => {
      const userId = params['params'].userId;
      this.geUserDetail(userId);
    });
  };

  setProfileImageUrl = (profileImageDetail) => {
    if (profileImageDetail === null) {
      this.profileImageData = null;
      this.imageUrl = `../../../assets/images/default_profile.jpg`;
      return;
    }
    const profileImageData = new ProfileImage(profileImageDetail);
    this.profileImageData = profileImageData;
    this.imageUrl = this.profileImageData.filepath;
  };

  getUserDocument = (userDocument) => {
    this.userDocument = userDocument;
  };

  verifytUserAccount = (userId) => {
    this.userService.verifyUserAccountRequest(userId).then((response) => {
      response.subscribe((responsData) => {
        this.router.navigate(['administrator/admin-home']);
      });
    });
  };

  denyUserAccountVerification = (userId) => {
    this.userService.denyUserVerificationRequest(userId).then((response) => {
      response.subscribe((responseData) => {
        this.geUserDetail(userId);
        const message = responseData['msg'];
        this.message = message;
      });
    });
  };

  geUserDetail = (userId) => {
    this.userService.getUserDetailRequest(userId).then((response) => {
      response.subscribe(
        (userDetailData) => {
          const profileImageDetail = userDetailData['userDetail'].ProfileImage;
          const documents: Object = userDetailData['userDetail'].Documents;
          this.getUserDocument(documents);
          const userDetail = userDetailData['userDetail'];
          const userData = new UserModel(userDetail);
          this.userDetailData = userData;
          this.previousPage = `administrator/users/${userData.role}/isVerified/${userData.isVerified}`;
          this.setProfileImageUrl(profileImageDetail);
        },
        (err) => {}
      );
    });
  };
}
