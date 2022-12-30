import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddSellerRateComponent } from './add-seller-rate/add-seller-rate.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';
import { AdvertComponent } from './advert/advert.component';
import { CommentComponent } from './comment/comment.component';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupComponent } from './group/group.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyAddsDetailComponent } from './my-adds-detail/my-adds-detail.component';
import { MyAdvertComponent } from './my-advert/my-advert.component';

const routes: Routes = [
  { path: "addCustomer", component: AddCustomerComponent },
  { path: "addSellerRate", component: AddSellerRateComponent },
  { path: "advert", component: AdvertComponent },
  { path: "advertDetail", component: AdvertDetailComponent },
  { path: "comment", component: CommentComponent },
  { path: "editAdvert", component: EditAdvertComponent },
  { path: "editUser", component: EditUserComponent },
  { path: "group", component: GroupComponent },
  { path: "groupDetail", component: GroupDetailComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "myAddsDetail", component: MyAddsDetailComponent },
  { path: "myAdvert", component: MyAdvertComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
