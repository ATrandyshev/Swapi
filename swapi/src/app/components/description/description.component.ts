import { trigger, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [
    trigger('animationAppearance', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1.2s', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('1.2s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class DescriptionComponent {
  category: string;
  name: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params) => (this.category = params['category'])
    );

    this.route.params.subscribe((params) => (this.name = params['name']));
  }
}
