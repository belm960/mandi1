import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddInfo } from 'src/app/models/addInfo';
import { AddGroupService } from 'src/app/services/addgroup.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { SimpleDialogComponent } from './simpleDialog.component';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.sass']
})
export class AdvertComponent implements OnInit {

  title: string;
  page: any;
  addInfo: AddInfo;
  private paramSub: Subscription;
  private querySub: Subscription;
  simpleDialog: MatDialogRef<SimpleDialogComponent>;

 


  constructor(private addgroupService: AddGroupService,
              private route: ActivatedRoute,
              private rout: Router,
              private dialogModel: MatDialog,
              private token: TokenStorageService) {
  }


  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(() => {
      this.update();
    });
    this.paramSub = this.route.params.subscribe(() => {
      this.update();
    });
    

  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  update() {
    if (this.route.snapshot.queryParamMap.get('page')) {
      const currentPage = +this.route.snapshot.queryParamMap.get('page');
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds(currentPage, size);
    } else {
      this.getProds();
    }
  }
  getProds(page: number = 5, size: number = 2) {
    if (this.route.snapshot.url.length == 1) {
      this.addgroupService.getAllInPageofAdd(+page, +size)
        .subscribe(page => {
          this.page = page;
          this.title = 'Our Best Adds';
        });
    }
  }

  detail(id){
    this.rout.navigateByUrl(`/pages/advertDetail/${id}`);
  }
  dialog(id) {
    localStorage.setItem('shareLink','/pages/advertDetail/'+id+'/share/'+this.token.getId())
    this.simpleDialog = this.dialogModel.open(SimpleDialogComponent);
  }
}
