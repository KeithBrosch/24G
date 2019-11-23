import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
    animations: [
        trigger('fade', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(1000, style({ opacity: 1 }))
            ])
        ])
    ]
})
export class TopBarComponent implements OnInit {

    title = "Welcome, ";
    name = "Keith Brosch";

  constructor() { }

  ngOnInit() {
  }

}
