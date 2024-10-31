import { Component } from '@angular/core';
import { AngularOpenlayersModule } from "ng-openlayers";
import { MapService } from './services/map.service';
import { CommonModule } from '@angular/common';
import { toLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AngularOpenlayersModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  mapService: MapService;

  constructor(mapService: MapService) {
    this.mapService = mapService;
  }

  getCoordinates(eventCoordinates: any) {
    const coordinates: Coordinate = toLonLat(eventCoordinates);
    console.log(coordinates);
  }
}
