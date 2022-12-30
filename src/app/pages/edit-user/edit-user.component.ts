import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { apiUrl } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  user= new User();
  userForm: FormGroup;
  constructor(private userService: UserService, private token: TokenStorageService,
    private router: Router,private http: HttpClient, private fb: FormBuilder) {
        
      this.userForm = this.fb.group({
          email:[this.user.email || ''],
          username: [this.user.username || ''],
          fname: [this.user.fname || ''],
          lname: [this.user.lname || ''],
          gname: [this.user.gname || ''],
          dob: [this.user.dob || ''],
          phonenum: [this.user.phonenum || ''],
          city: [this.user.city || '']
        })

  }

  ngOnInit() {
    const id = this.token.getId();
    this.getUser(id);
  }

  getUser(id:string){
    this.get(id).subscribe(
      data =>{
          this.user=data;
      },error=>{console.log(error)}
    )
  }
  
  get(id: string): Observable<User> {
    const url = `${apiUrl}/User/${id}`;
    return this.http.get<User>(url);
  }

  onSubmit() {
    this.userService.update(this.userForm.value).subscribe(u => {
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
}
