import {Component, OnInit} from '@angular/core';
import {AddGroupService} from "../../services/addgroup.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AddInfo } from 'src/app/models/addInfo';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LikeDislike } from 'src/app/models/likeDislike';
import { apiUrl } from 'src/environments/environment';
import { switchAll } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-customer',
    templateUrl: './add-customer.component.html',
    styleUrls: ['./add-customer.component.sass']
})
export class AddCustomerComponent implements OnInit {
    user= new User();
    advert = new AddInfo();
    liked= new LikeDislike();
    title: string;
    Errormessage: string;
    indicate= false;
    indicate1=false;
    numberOfUsage=0;
    findMemberForm: FormGroup;
    constructor(private addgroupService: AddGroupService,
                private router: Router,
                private usr: UserService,
                private http: HttpClient, private fb : FormBuilder) {
                  this.findMemberForm = this.fb.group({id: [''],});
    }
    addId: string;
    isEdit = false;
    ngOnInit() {
        this.addId = window.localStorage.getItem('keyp')
    }
    onSubmit() {
        this.addgroupService.getLikeDislike(this.findMemberForm.value.id,this.addId).subscribe(
            (data)=>{
                this.liked=data;
                this.numberOfUsage=this.liked.numUsage;
            }
        );
       
        this.usr.get(this.findMemberForm.value.id).subscribe(
            (data)=>{
              this.indicate1=true;
              this.indicate=false;
              console.log(data);
              this.user=data;
            },
            (error: HttpErrorResponse)=> {
                if (error.status==404){
                    this.indicate=true;
                    this.Errormessage="There is No Customer or User with this id";
                }else{
                  Swal.fire('Ops', 'There is an error. please try again','error');
                }

            }
        );
    }
    add() {
        this.numberOfUsage = this.numberOfUsage+1;
        console.log(this.numberOfUsage);
        const url = `${apiUrl}/NumOfUsage/${this.user.id}/${this.addId}`;
        const urll = `${apiUrl}/NumOfUsage/`;
        return this.http.put(url,{
            "numUsage": this.numberOfUsage,
        }).subscribe(
            (data) => {
                console.log(data);
                Swal.fire('Successfull', 'you have added one customer to the service of usage');
                this.router.navigateByUrl("/advert");
            },
            (error:HttpErrorResponse)=>{
              this.numberOfUsage = this.numberOfUsage-1;
                if(error.status==404){
                    return this.http.post(urll,{
                        "members_id":this.user.id,
                        "posts_id":this.addId,
                        "numUsage": 1,
                    }).subscribe(
                        data => {
                            console.log(data);
                            Swal.fire('Successfull', 'you have added one customer to the service of usage','success');
                            this.router.navigateByUrl("/advert");
                            
                        },
                        ()=>{
                          Swal.fire('Ops', 'There is an error please try again','error');
                        });
                }else{
                  Swal.fire('Ops', 'There is an error please try again','error');
                }
            }  
        );        
   }
}