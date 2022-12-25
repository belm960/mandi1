import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';
import { AdvertComponent } from './advert/advert.component';
import { AdvertDetailComponent } from './advert-detail/advert-detail.component';
import { CommentComponent } from './comment/comment.component';
import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyAddsDetailComponent } from './my-adds-detail/my-adds-detail.component';
import { MyAdvertComponent } from './my-advert/my-advert.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [AddCustomerComponent, EditAdvertComponent, AdvertComponent, AdvertDetailComponent, CommentComponent, GroupComponent, GroupDetailComponent, HomepageComponent, MyAddsDetailComponent, MyAdvertComponent, EditUserComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
