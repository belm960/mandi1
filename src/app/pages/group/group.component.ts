import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupInfo } from 'src/app/models/groupInfo';
import { AddGroupService } from 'src/app/services/addgroup.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.sass']
})
export class GroupComponent implements OnInit {

 
  title: string;
  page: GroupInfo;
  private paramSub: Subscription;
  private querySub: Subscription;


  constructor(private addgroupService: AddGroupService,
              private route: ActivatedRoute,
              private rout: Router,) {

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
      this.addgroupService.getAllInPage(+page, +size)
        .subscribe(page => {
          this.page = page;
          this.title = ' Our Best Groups!';
        });
    }

  }

  detail(id){
    this.rout.navigateByUrl(`/groupDetail/${id}`);
  }

}
