import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAdd } from 'src/app/model/user';
import { ToastService } from 'src/app/services/utilities/toast.service';
import { UserService } from '../../../services/api/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  userAddForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.userAddForm = this.formBuilder.group({
      firstName: ['Kasun', [Validators.required, Validators.minLength(2)]],
      lastName: ['Gamage', [Validators.required, Validators.minLength(2)]],
      userName: ['KasunGamage', [Validators.required, Validators.minLength(5)]],
      type: ['1', [Validators.required]],
      email: ['keygamage@gmail.com', [Validators.required, Validators.email]],
      mobile: [
        '0717935364',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  get errorControl() {
    return this.userAddForm.controls;
  }

  submitForm() {
    if (!this.userAddForm.valid) {
      this.toastService.presentToastWithOptions(
        'Please provide all the required values!'
      );
      return false;
    } else {
      const userAdd: UserAdd = {
        firstName: this.userAddForm.value.firstName,
        lastName: this.userAddForm.value.lastName,
        userName: this.userAddForm.value.userName,
        email: this.userAddForm.value.email,
        type: this.userAddForm.value.type,
        mobile: this.userAddForm.value.mobile,
      };
      this.userService.add(userAdd).subscribe((res: any) => {
        this.toastService.presentToastWithOptions(
          res.message
        );
      }, (err) => {
        this.toastService.presentToastWithOptions(
          'error occured!'
        );
      });
    }
  }
}
