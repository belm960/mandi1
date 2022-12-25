import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/security/auth.service';
import Swal from 'sweetalert2';
import { SignUpInfo } from 'src/app/shared/security/signup-info';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice : AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      gname: ['', Validators.required],
      username: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      phonenum: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    const {fname,lname,gname,username,email,password,phonenum} = this.loginForm.value;
    const signup: SignUpInfo={fname: fname,lname: lname,gname: gname,username: username,email: email,password: password,phonenum: phonenum,role: ['user']};
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      console.log(signup)
      this.authservice.signUp(signup).subscribe(
        data=>{
          Swal.fire('Succeccfully Created', 'Thank you!');
          this.router.navigate(['admin/dashboard/main']);
        }
        
      );
      
    }
  }
}
