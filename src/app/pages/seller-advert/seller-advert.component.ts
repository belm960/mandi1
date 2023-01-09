import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Selled } from 'src/app/models/selled';
import { AddGroupService } from 'src/app/services/addgroup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-advert',
  templateUrl: './seller-advert.component.html',
  styleUrls: ['./seller-advert.component.sass']
})
export class SellerAdvertComponent implements OnInit {

  title: string;
  coupon: string = Math.floor(Math.random() * 100000000).toString();
  page: any;
  private paramSub: Subscription;
  private querySub: Subscription;
  selled: Selled;
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
    if (this.route.snapshot.url.length == 1) {
      this.addgroupService.getSelledProducts()
        .subscribe(page => {
          this.page = page;
          console.log(page);
          this.title = 'Your Selled Products';
        });
    }
  }
  redeem(){
    Swal.fire('Thank You', 'Your Coupon Code is: ' + this.coupon, 'success')
  }

  detail(id: any){
      this.router.navigateByUrl('/pages/advertDetail/' + id);
  }

}
