import { Component, OnInit } from '@angular/core';
import { RootResourcesService } from 'src/app/services/root-resources.service';

@Component({
  selector: 'app-cards-resource',
  templateUrl: './cards-resource.component.html',
  styleUrls: ['./cards-resource.component.scss'],
})
export class CardsResourceComponent implements OnInit {
  constructor(public resources: RootResourcesService) {}

  ngOnInit(): void {
    this.resources.getPeople();
  }
}
