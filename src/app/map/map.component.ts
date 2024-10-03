import { Component, OnInit } from '@angular/core';
import { AngularOpenlayersModule } from "ng-openlayers";
import { LocationService } from '../shared/services/location.service';
import { AntLocation } from '../shared/models/ant-location';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AngularOpenlayersModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  locationService: AntLocation;

  constructor(locationService: LocationService) {
    this.locationService = locationService.location;
  }

  ngOnInit(): void {
    
  }

}
