import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddInfo } from 'src/app/models/addInfo';
import { PostComemnt } from 'src/app/models/PostComment';
import { AddGroupService } from 'src/app/services/addgroup.service';

@Component({
  selector: 'app-my-adds-detail',
  templateUrl: './my-adds-detail.component.html',
  styleUrls: ['./my-adds-detail.component.sass']
})
export class MyAddsDetailComponent implements OnInit {
  addInfo: AddInfo = new AddInfo();
  pComment: any;
  roles={ Admin:'Admin',Member:'Member',User:'User'};
  title: string;
  role: string;
  currentUser: string;
  user: boolean;
  constructor(private addgroupService: AddGroupService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
    this.title = 'Advert Detail';
    this.currentUser =localStorage.getItem('STATE');
      if (this.currentUser=="true"){
          this.user=true;
        }
    this.role = localStorage.getItem('ROLE');
    }
  getProduct(): void {
    console.log(this.route.snapshot.queryParamMap.get('page'));
    const id = this.route.snapshot.paramMap.get('id');
    this.addgroupService.getDetails(id).subscribe(
        advert => {
          this.addInfo = advert;
          console.log(this.addInfo);
          this.getPostComment();
        },
        _ => {console.log('Getting Add Failed');
              console.log(this.addInfo);
      }
    );
  }
  getPostComment(){
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.addgroupService.getPostComments(id).subscribe(
        data=> {
          this.pComment = data;
          this.pComment=this.pComment.slice().reverse();
          console.log(data);
        },
        error=>{
          console.log(error);
        }
    )
  }
click(num: number, id : string){
  if(num==1){
    this.router.navigateByUrl('/pages/editAdvert'+id);
  }else if(num==2){
    this.router.navigateByUrl('/pages/addCustomer/'+id);
  }else if(num==3){
    this.router.navigateByUrl('/pages/addSellerRate/'+id);
  }else{
    return null;
  } 
}
}
