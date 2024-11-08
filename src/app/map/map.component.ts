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
  constructor(protected mapService: MapService) { }

  setCoordinates(eventCoordinates: any): void {
    if (this.mapService.isMapClickable == false) {
      return;
    }
    
    this.mapService.hideSideBar(false);

    const coordinates: Coordinate = toLonLat(eventCoordinates);
    this.mapService.updateChoosenLocation({ id: '', name: '', cordinateX: coordinates[0], cordinateY: coordinates[1] });
  }
}
