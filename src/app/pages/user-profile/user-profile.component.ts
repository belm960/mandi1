import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  user= new User();
  userForm: FormGroup;
  constructor(private userService: UserService, private token: TokenStorageService,
    private router: Router, private fb: FormBuilder) {
        
      this.userForm = this.fb.group({
          username: [this.user.username || ''],
          password: [''],
          newPassword: ['']
        })
  }

  ngOnInit() {
    const id = this.token.getId();
    this.getUser(id);
  }

  getUser(id:string){
    this.userService.getUserId(id).subscribe(
      data =>{
          this.user=data;
      },error=>{console.log(error)}
    )
  }
  onSubmit() {
    this.userService.updateSecurity(this.userForm.value).subscribe(u => {
      this.userService.nameTerms.next(u.fname);
      Swal.fire('Edited Succussfully', '','success');
      let url = '/';
      this.router.navigateByUrl(url);
    }, _ => {
      Swal.fire('Ops', 'Unable to edit! please try again','error');
    })
  }
  cancel(){
    let url = '/';
    this.router.navigateByUrl(url);
  }
  edit(id){
    this.router.navigateByUrl('/pages/editUser');
  }
}