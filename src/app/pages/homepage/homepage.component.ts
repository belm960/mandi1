import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass']
})
export class HomepageComponent implements OnInit {
  prizes=[
    {id: '0',prize: 'CocaCola'},
    {id: '1',prize: '3D Juice'},
    {id: '2',prize: 'Berut Cosmotics'},
    {id: '3',prize: 'One Water'},
    {id: '4',prize: 'Daily Water'},
    {id: '5',prize: 'Tondose'},
    {id: '6',prize: 'Wow Burger'},
    {id: '7',prize: 'Fresh Corner'},
    {id: '8',prize: 'Kaldis Coffee'},
    {id: '9',prize: 'Mother House'},
    {id: '10',prize: 'Ras Cinema'},
    {id: '11',prize: 'Andnet Park'},]
  constructor() { }

  ngOnInit(): void {
  }

}
