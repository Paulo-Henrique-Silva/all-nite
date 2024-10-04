import { Component, OnInit } from '@angular/core';
import { AngularOpenlayersModule } from "ng-openlayers";
import { MapService } from '../shared/services/map.service';
import { AntLocation } from '../shared/models/ant-location';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AngularOpenlayersModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  mapService: AntLocation;

  constructor(mapService: MapService) {
    this.mapService = mapService.curlocation;
  }

  ngOnInit(): void {
    
  }

}
