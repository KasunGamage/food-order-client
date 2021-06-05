import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/api/user.service';
import { ToastService } from '../../../services/utilities/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLoginForm: FormGroup;
  verificationCode: FormControl = new FormControl('', [Validators.minLength(4), Validators.maxLength(4)]);
  isVerificationCodeSend = false;
  constructor(
    public formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userLoginForm = this.formBuilder.group({
      mobile: ['0717935364', [Validators.required, Validators.minLength(10)]]
    });
  }

  sendVerificationCode() {
    if (!this.userLoginForm.valid) {
      this.toastService.presentToastWithOptions(
        'Please provide all the required values!'
      );
      return false;
    } else {
      this.userService
        .sendVerificationCode(this.userLoginForm.value.mobile)
        .subscribe(
          (res: any) => {
            this.toastService.presentToastWithOptions(
              'Verification code send Successfully!'
            );
            this.isVerificationCodeSend = true;
          },
          (err) => {
            this.toastService.presentToastWithOptions('error occured!');
          }
        );
    }
  }
}
