import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultilevelRoutingModule } from './multilevel-routing.module';
import { First1Component } from './first1/first1.component';
import { First2Component } from './first2/first2.component';
import { First3Component } from './first3/first3.component';
import { Second1Component } from './secondlevel/second1/second1.component';
import { Second2Component } from './secondlevel/second2/second2.component';


@NgModule({
  declarations: [First1Component, First2Component, First3Component, Second1Component, Second2Component],
  imports: [
    CommonModule,
    MultilevelRoutingModule
  ]
})
export class MultilevelModule { }
