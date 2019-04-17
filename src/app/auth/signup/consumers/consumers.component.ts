import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
    this.consumerRegForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(null, [Validators.required]),
      userPassword: new FormGroup({
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required])
      }, [Validators.required, this.confirmPasswordValidator] ),
      agreement: new FormControl(null, [Validators.requiredTrue])
    });
  }

  confirmPasswordValidator(passGrup: FormGroup): { [s: string]: boolean } {
    const password = passGrup.get('password');
    const confirm = passGrup.get('confirmPassword');
    if (!password.value || !confirm.value) { return null; }
    return password.value === confirm.value ? null : { passwordMismatched: true };
  }

  onSubmit() {
    if(this.consumerRegForm.valid){
      console.log(this.consumerRegForm);
    }
  }

  onClick() {
    this.isConsumersChange.emit(!this.isConsumers);
  }

}
