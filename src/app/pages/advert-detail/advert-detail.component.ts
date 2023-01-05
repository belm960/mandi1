import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  numOfLike: number =0;
  numOfDislike: number=0;
  numUsage: number=0;
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
      private fb: FormBuilder,
      private router: Router
  ) {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
    console.log(this.route.snapshot.paramMap.get('user'));
    this.userid=this.route.snapshot.paramMap.get('user');
    if(this.userid){
      this.visitor=true;
      this.getshare();
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

  routeToEdit(id: any){
    this.router.navigate(['/pages/editAdvert/' + id])
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
    if(this.visitor && !this.user || !this.user){
      this.message = "Please sign in or create Acount first";
      alert(this.message);
    }else{
    this.userid= this.token.getId();
    const id = this.route.snapshot.paramMap.get('id');
    this.addgroupService.PostComment(this.commentForm.value.comment,this.userid,id).subscribe(
      data=>{
        console.log(data);
        this.getPostComment();
      }
    );
  }
}

getshare(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.addgroupService.getshare(this.userid,id).subscribe(
      like => {
        var share = like.numOfShare;
        this.addgroupService.updateNumberOfShare(this.userid, id,share++);
      },
      error=>{
        if (error.error.status==404){
          this.addgroupService.updateNumberOfShare(this.userid, id,1);
        }else{
          this.addgroupService.updateNumberOfShare(this.userid, id,1);
        }
      })}

  getLikeDislike(): void {
    this.userid= this.token.getId();
    const id = this.route.snapshot.paramMap.get('id');
    this.addgroupService.getLikeDislike(this.userid,id).subscribe(
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
    if(this.visitor || !this.user){
      this.message = "Please sign in or create Acount first";
      alert(this.message);
    }else{
    this.userid= this.token.getId();
    const id1 = this.route.snapshot.paramMap.get('id');
    if (this.chooseclassl === true && this.chooseclassd === true) {
      this.numOfLike++;
      numOfLike = this.numOfLike
      this.addgroupService.updateAddLike(numOfLike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassl = false;
      this.addgroupService.updateaddLikeDislike(this.userid,id1,"false","true");
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
      this.addgroupService.updateaddLikeDislike(this.userid,id1,"false","true");
    } else if (this.chooseclassl === false && this.chooseclassd === true) {
      this.numOfLike--;
      numOfLike = this.numOfLike;
      this.addgroupService.updateAddLike(numOfLike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassl = true;
      this.addgroupService.updateaddLikeDislike(this.userid,id1,"true","true");
    }
  }
}
  dislikeButtonClick(numOfDislike: number,numOfLike: number, id) {
    if(this.visitor || !this.user){
      this.message = "Please sign in or create Acount first";
      alert(this.message);
    }else{
    this.userid= this.token.getId();
    const id1 = this.route.snapshot.paramMap.get('id');
    if (this.chooseclassd === true && this.chooseclassl === true) {
      this.numOfDislike++;
      numOfDislike = this.numOfDislike;
      this.addgroupService.updateAddDislike(numOfDislike,id).subscribe(
        (data)=>{console.log(data);}
      );
      this.chooseclassd = false;
      this.addgroupService.updateaddLikeDislike(this.userid,id1,"true","false");
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
      this.addgroupService.updateaddLikeDislike(this.userid,id1,"true","false");
    } else if (this.chooseclassd === false && this.chooseclassl === true) {
      this.numOfDislike--;
      numOfDislike = this.numOfDislike;
      this.addgroupService.updateAddDislike(numOfDislike,id).subscribe(
        (data)=>{console.log(data);}
      );

      this.chooseclassd = true;
      this.addgroupService.updateaddLikeDislike(this.userid,id1,"true","true");
    }
  }
}

}
