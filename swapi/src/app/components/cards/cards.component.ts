import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/data/api';
import { RootResourcesService } from 'src/app/services/root-resources.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  constructor(
    public rootResources: RootResourcesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.rootResources.get().subscribe();
  }
}
