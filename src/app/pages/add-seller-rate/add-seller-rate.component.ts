
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
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-seller-rate',
  templateUrl: './add-seller-rate.component.html',
  styleUrls: ['./add-seller-rate.component.sass']
})
export class AddSellerRateComponent implements OnInit {
    user= new User();
    advert = new AddInfo();
    liked= new LikeDislike();
    title: string;
    Errormessage: string;
    indicate= false;
    indicate1=false;
    numberOfSell=0;
    findMemberForm: FormGroup;
    
    constructor(private addgroupService: AddGroupService,
                private router: Router,
                private usr: UserService,
                private http: HttpClient, 
                private fb : FormBuilder,
                private route: ActivatedRoute) {

                  this.findMemberForm = this.fb.group({id: [''],});
    }
    addId: string;
    isEdit = false;
    

    ngOnInit() {
        this.addId = window.localStorage.getItem('keyp')
        
    }

    onSubmit() {
      const id = this.route.snapshot.paramMap.get('id');
      this.addgroupService.getLikeDislike(this.findMemberForm.value.id,id).subscribe(
          (data)=>{
              this.liked=data;
              this.numberOfSell=this.liked.numSell;
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
        const id = this.route.snapshot.paramMap.get('id');
        this.numberOfSell = this.numberOfSell+1;
        console.log(this.numberOfSell);
        const url = `${apiUrl}/NumSell/${this.user.id}/${id}`;
        const urll = `${apiUrl}/NumSell/`;
        return this.http.put(url,{
            "numSell": this.numberOfSell,
        }).subscribe(
            (data) => {
                console.log(data);
                Swal.fire('Successfull', 'you have added one customer to the service of usage','success');
                this.router.navigateByUrl("/pages/advert");
            },
            (error:HttpErrorResponse)=>{
                if(error.status==404){
                    return this.http.post(urll,{
                        "members_id":this.user.id,
                        "posts_id":id,
                        "numSell": 1,
                    }).subscribe(
                        data => {
                            console.log(data);
                            Swal.fire('Successfull', 'you have added one customer to the service of usage','success');
                            this.router.navigateByUrl("/pages/advert");
                            
                        },error=>{
                          this.numberOfSell = this.numberOfSell-1;
                          Swal.fire('Ops', 'There is an error please try again','error');
                        }
                        );
                }else{
                  this.numberOfSell = this.numberOfSell-1;
                  Swal.fire('Ops', 'There is an error please try again','error');
                }
            }            
        );        
    }
}