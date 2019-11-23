import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('700ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
            ])
        ])
    ]
})
export class HeaderComponent implements OnInit {

    title = "Video Player";

  constructor() { }

  ngOnInit() {
  }

}
