import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddInfo } from 'src/app/models/addInfo';
import { LikeDislike } from 'src/app/models/likeDislike';
import { AddGroupService } from 'src/app/services/addgroup.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';

@Component({
  selector: 'app-advert-detail',
  templateUrl: './advert-detail.component.html',
  styleUrls: ['./advert-detail.component.sass']
})
export class AdvertDetailComponent implements OnInit {

  title: string;
  addInfo= new AddInfo();
  likeDislike= new LikeDislike();
  currentUser: string;
  user=false;
  mem: string;
  role: string;
  likes: string;
  dislikes: string;
  roles={
    Admin:"Admin",
    Member: "Member"
    }
  numOfLike: number;
  numOfDislike: number;
  numUsage: number;
  minPrice: string;
  chooseclassl:boolean = true;
  chooseclassd:boolean = true;
  sign=false;
  userid: any;
  commentForm: FormGroup;
  pComment: any;
  visitor= false;
  message: string;
  constructor(
      private addgroupService: AddGroupService,
      private route: ActivatedRoute,
      private token: TokenStorageService,
      private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });
    console.log(this.route.snapshot.paramMap.get('user'));
    this.userid=this.route.snapshot.paramMap.get('user');
    if(this.userid){
      this.visitor=true;
    }
  }

  ngOnInit() {
    this.getProduct();
    this.getLikeDislike();
    this.title = 'Advert Detail';
    this.currentUser =localStorage.getItem('STATE');
      if (this.currentUser=="true"){
          this.user=true;
        }
    this.role = localStorage.getItem('ROLE');
  }

  numUsageFull(): boolean{
    if(this.likeDislike.numUsage>this.addInfo.usageLimit){
      return true;
    }
    else{
      return false;
    }
  }
  getProduct(): void {
    console.log(this.route.snapshot.queryParamMap.get('page'));
    const id = this.route.snapshot.paramMap.get('id');
    this.addgroupService.getDetails(id).subscribe(
        advert => {
          this.addInfo = advert;
          this.numOfLike=this.addInfo.numOfLike;
          this.numOfDislike = this.addInfo.numOfDislike;
          this.minPrice=this.addInfo.minPrice;
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
  postComment(){
    if(this.visitor && !this.user){
      this.message = "Please sign in or create Acount first";
      alert(this.message);
    }else{
    this.mem= this.token.getId();
    const id = this.route.snapshot.paramMap.get('id');
    this.addgroupService.PostComment(this.commentForm.value.comment,this.mem,id).subscribe(
      data=>{
        console.log(data);
        this.getPostComment();
      }
    );
  }
}
  getLikeDislike(): void {
    this.mem= this.token.getId();
    const id = this.route.snapshot.paramMap.get('id');
    this.addgroupService.getLikeDislike(this.mem,id).subscribe(
        like => {
          this.likeDislike = like;
          console.log(this.likeDislike);
          this.likes = this.likeDislike.likes;
          this.dislikes= this.likeDislike.dislikes;
          this.numUsage=this.likeDislike.numUsage;
          if(this.numUsage<1){
            this.sign = true; 
          }
          if(this.likes=="false"){
            this.chooseclassl=false;
          }if(this.dislikes=="false"){
            this.chooseclassd=false;
            console.log(this.likes);
        }},
        _ => {console.log('Getting Add Failed');
              console.log(this.likeDislike);
      }
    );
    if(window.localStorage.getItem('errork')=="true"){
      this.sign=true;
    }
  }

  likeButtonClick(numOfLike: number,numOfDislike: number,id) {
    if(this.visitor && !this.user){
      this.message = "Please sign in or create Acount first";
      alert(this.message);
    }else{
    this.mem= this.token.getId();
    const id1 = this.route.snapshot.paramMap.get('id');
    if (this.chooseclassl === true && this.chooseclassd === true) {
      this.numOfLike++;
      numOfLike = this.numOfLike
      this.addgroupService.updateAddLike(numOfLike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassl = false;
      this.addgroupService.updateaddLikeDislike(this.mem,id1,"false","true");
    } else if (this.chooseclassl === true && this.chooseclassd === false) {
      this.numOfLike++;
      numOfLike = this.numOfLike;
      this.numOfDislike--;
      numOfDislike = this.numOfDislike;
      this.chooseclassl = false;
      this.addgroupService.updateAddLikeDislike(numOfLike,numOfDislike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassd = true;
      this.addgroupService.updateaddLikeDislike(this.mem,id1,"false","true");
    } else if (this.chooseclassl === false && this.chooseclassd === true) {
      this.numOfLike--;
      numOfLike = this.numOfLike;
      this.addgroupService.updateAddLike(numOfLike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassl = true;
      this.addgroupService.updateaddLikeDislike(this.mem,id1,"true","true");
    }
  }
}
  dislikeButtonClick(numOfDislike: number,numOfLike: number, id) {
    if(this.visitor && !this.user){
      this.message = "Please sign in or create Acount first";
      alert(this.message);
    }else{
    this.mem= this.token.getId();
    const id1 = this.route.snapshot.paramMap.get('id');
    if (this.chooseclassd === true && this.chooseclassl === true) {
      this.numOfDislike++;
      numOfDislike = this.numOfDislike;
      this.addgroupService.updateAddDislike(numOfDislike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassd = false;
      this.addgroupService.updateaddLikeDislike(this.mem,id1,"true","false");
    } else if (this.chooseclassd === true && this.chooseclassl === false) {
      this.numOfDislike++;
      numOfDislike = this.numOfDislike;
      this.numOfLike--;
      numOfLike = this.numOfLike;
      this.addgroupService.updateAddLikeDislike(numOfLike,numOfDislike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassd = false;
      this.chooseclassl = true;
      this.addgroupService.updateaddLikeDislike(this.mem,id1,"true","false");
    } else if (this.chooseclassd === false && this.chooseclassl === true) {
      this.numOfDislike--;
      numOfDislike = this.numOfDislike;
      this.addgroupService.updateAddDislike(numOfDislike,id).subscribe(
        (data)=>{console.log(data);}
      );

      this.chooseclassd = true;
      this.addgroupService.updateaddLikeDislike(this.mem,id1,"true","true");
    }
  }
}

}
