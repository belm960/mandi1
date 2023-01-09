import { FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'
import { BehaviorSubject, Notification, timer } from 'rxjs';
import { AddEventListenerOptions } from 'rxjs/internal/observable/fromEvent';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;
  coupon: string = Math.floor(Math.random() * 100000000).toString();
  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any[];
  pno: any;
  win = false;
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER
  prizes=[
    {id: 0,prize: 'CocaCola'},
    {id: 1,prize: '3D Juice'},
    {id: 2,prize: 'Berut Cosmotics'},
    {id: 3,prize: 'One Water'},
    {id: 4,prize: 'Daily Water'},
    {id: 5,prize: 'Tondose'},
    {id: 6,prize: 'Wow Burger'},
    {id: 7,prize: 'Fresh Corner'},
    {id: 8,prize: 'Kaldis Coffee'},
    {id: 9,prize: 'Mother House'},
    {id: 10,prize: 'Ras Cinema'},
    {id: 11,prize: 'Andnet Park'},]
constructor(){}
  ngOnInit(){
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#FF0000', '#000000']
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: 'white',
      textFontSize: '16'
    }))
  }
  reset() {
    this.wheel.reset()
    this.pno =null;
    this.win= false;
  }
  before() {
    Swal.fire('Start','Your wheel is about to spin','warning')
  }

  async spin(prize) {
    this.idToLandOn = prize;
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
    if(prize==this.idToLandOn){
        this.pno = prize;
        this.win = true;
    }
  }


  after() {
    if(this.win){
      Swal.fire('Be happy! You are The winner!','You Can Take it From Product Owner \n Your Coupon Code is '+
      this.coupon ,'success');
    }else {
      Swal.fire('OPS!','You Loose! try again','error');
    }
   
  }
}