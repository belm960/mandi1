import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  @ViewChild(NgxWheelComponent, { static: false }) wheel;

  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any[];
  pno: any;
  win = false;
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER

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
    this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
    if(prize==this.idToLandOn){
        this.pno = prize;
        this.win = true;
    }
  }

  after() {
    if(this.win){
      Swal.fire('Yes!','Be happy! You are The winner!','success');
    }else {
      Swal.fire('OPS!','You Loose! try again','error');
    }
   
  }
}
