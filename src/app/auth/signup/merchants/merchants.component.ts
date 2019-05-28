import { Component, OnInit, EventEmitter, Input, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss', '../signup.component.scss']
})
export class MerchantsComponent implements OnInit, OnDestroy {

  @Input()
  isConsumers: boolean;

  @Output()
  isConsumersChange = new EventEmitter<boolean>();

  merchantRegForm: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusLintener()
    .subscribe( authStatus => {
      this.isLoading = false;
    });

    this.merchantRegForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      userPassword: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
      }, [Validators.required, this.confirmPasswordValidator] ),
      agreement: new FormControl(null, [Validators.requiredTrue])
    });

  }

  get fullName() {
    return this.merchantRegForm.get('fullName');
  }

  get email() {
    return this.merchantRegForm.get('email');
  }

  get mobileNumber() {
    return this.merchantRegForm.get('mobileNumber');
  }

  get password() {
    const password = this.merchantRegForm.get('userPassword.password');
    const confirm = this.merchantRegForm.get('userPassword.confirmPassword');
    if (password.value === confirm.value ) {
      return password;
    }
  }

  confirmPasswordValidator(passGrup: FormGroup): { [s: string]: boolean } {
    const password = passGrup.get('password');
    const confirm = passGrup.get('confirmPassword');
    if (!password.value || !confirm.value) { return null; }
    return password.value === confirm.value ? null : { passwordMismatched: true };
  }

  revert() {
    this.merchantRegForm.reset();
  }

  onSubmit() {
    if (this.merchantRegForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createMerchant(
      this.fullName.value,
      this.email.value,
      this.mobileNumber.value,
      this.password.value
      );

    this.revert();
  }

  onClick() {
    this.isConsumersChange.emit(!this.isConsumers);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
