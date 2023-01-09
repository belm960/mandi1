import { Component } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { PlatformLocation } from '@angular/common';
import { timer } from 'rxjs';
import { id } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  i: number=0;
  Info=[
    {id: 0 ,title: 'Cloth City', message: 'A purveyor of simple, classy and modern basics for men, this shop stocks button-down shirts, suits, 0996995878'},
    {id: 1 ,title: 'Shoe Center', message: 'Styles & looks for every occasion Shag. Ballroom. Swing. Line Dance. Reward your feet for their hard work'},
    {id: 2 ,title: 'Berut Flower', message: 'Fresh flowers for any occasion. Fresh flowers delivered. Order custom bouquets and arrangements for the special people in your life.'},
    {id: 3 ,title: 'Mekes Tela', message: 'Tella is an alcoholic drink made from many different raw materials, including barley, corn, wheat, millet, or teff (Eragrostis tef).'},
    {id: 4 ,title: 'Aqua Addis', message: 'Bottled From The Natural Source Of Burayu In The Beautiful Highlands Of Ethiopia filtered Using State Of The Art UV Light'},
  ];
  constructor(public _router: Router, location: PlatformLocation, private spinner: NgxSpinnerService) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
        // location.onPopState(() => {
        //   window.location.reload();
        // });
        /**this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );**/
        this.currentUrl= '/admin/dashboard/main'
      }
      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide();
      }
      window.scrollTo(0, 0);
    });
   /* timer(0, 30000).subscribe(() => { 
      Swal.fire(this.Info[this.i].title,this.Info[this.i].message,'info');
      this.i++;
      if (this.i > 4){
        this.i = 0;
      }
  });*/
  }
}