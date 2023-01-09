import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Shared } from 'src/app/models/shared';
import { AddGroupService } from 'src/app/services/addgroup.service';

@Component({
  selector: 'app-seller-advert',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.sass']
})
export class ShareComponent implements OnInit {

  title: string;
  page: any;
  private paramSub: Subscription;
  private querySub: Subscription;
  shared: Shared;
  constructor(private addgroupService: AddGroupService,
              private route: ActivatedRoute,
              private router: Router) {
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
      const size = +this.route.snapshot.queryParamMap.get('size');
      this.getProds();
    } else {
      this.getProds();
    }
  }
  getProds() {
      this.addgroupService.getSharedProducts()
        .subscribe(page => {
          this.page = page;
          console.log(page);
          this.title = 'Your Shared Products';
        });
  }

  detail(id: any){
      this.router.navigateByUrl('/pages/advertDetail/'+id);
  }
}
