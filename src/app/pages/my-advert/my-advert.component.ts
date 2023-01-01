import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddInfo } from 'src/app/models/addInfo';
import { AddGroupService } from 'src/app/services/addgroup.service';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';

@Component({
  selector: 'app-my-advert',
  templateUrl: './my-advert.component.html',
  styleUrls: ['./my-advert.component.sass']
})
export class MyAdvertComponent implements OnInit {

  title: string;
  page: any;
  addInfo: AddInfo;
  id: any;
  private paramSub: Subscription;
  private querySub: Subscription;
 
  constructor(private addgroupService: AddGroupService,
              private route: ActivatedRoute,
              token: TokenStorageService) {
                this.id = token.getId();
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
      this.getProds();
    } else {
      this.getProds();
    }
  }
  getProds() {
    if (this.route.snapshot.url.length == 1) {
      this.addgroupService.getAllInPageofMyAdd(this.id)
        .subscribe(page => {
          this.page = page;
          this.title = 'Your Best Adds';
        });
    }
  }

}
