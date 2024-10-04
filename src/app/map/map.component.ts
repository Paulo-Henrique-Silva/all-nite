import { Component, OnInit } from '@angular/core';
import { AngularOpenlayersModule } from "ng-openlayers";
import { MapService } from '../shared/services/map.service';
import { AntLocation } from '../shared/models/ant-location';
import { fromLonLat, toLonLat } from 'ol/proj';
//import { AolMarkerModule } from 'ngx-ol-library';


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

  markers: { x: number, y: number }[] = [];

  // Method to handle map click event
  onMapClick(event: any): void {
    const map = event.map; // The OpenLayers map object

    // Get the clicked coordinates
    const clickedCoordinate = map.getEventCoordinate(event.originalEvent);

    // Convert from map projection to 'EPSG:4326' (lat/lon)
    const lonLat = toLonLat(clickedCoordinate);

    // Push the marker into the array
    this.markers.push({ x: lonLat[0], y: lonLat[1] });
  }

  ngOnInit(): void {
    
  }

}
