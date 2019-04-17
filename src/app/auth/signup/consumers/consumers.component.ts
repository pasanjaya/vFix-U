import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.scss', '../signup.component.scss']
})
export class ConsumersComponent implements OnInit {

  @Input()
  isConsumers: boolean;

  @Output()
  isConsumersChange = new EventEmitter<boolean>();

  consumerRegForm: FormGroup;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.consumerRegForm = new FormGroup({
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
    return this.consumerRegForm.get('fullName');
  }

  get email() {
    return this.consumerRegForm.get('email');
  }

  get mobileNumber() {
    return this.consumerRegForm.get('mobileNumber');
  }

  get password() {
    const password = this.consumerRegForm.get('userPassword.password');
    const confirm = this.consumerRegForm.get('userPassword.confirmPassword');
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
    this.consumerRegForm.reset();
  }

  onSubmit() {
    if (this.consumerRegForm.invalid) {
      return;
    }

    this.authService.createConsumer(
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

}
