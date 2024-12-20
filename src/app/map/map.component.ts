import { Component } from '@angular/core';
import { AngularOpenlayersModule } from "ng-openlayers";
import { MapService } from './services/map.service';
import { CommonModule } from '@angular/common';
import { toLonLat } from 'ol/proj';
import { Coordinate } from 'ol/coordinate';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AngularOpenlayersModule, CommonModule, DialogModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  subSideBarStatus: Subscription = new Subscription();
  isSideBarHidden: boolean = false;

  constructor(protected mapService: MapService) { 
    this.subSideBarStatus = mapService.sideBarStatus$.subscribe({ 
      next: (status) => this.isSideBarHidden = status != null ? status : false,
      error: (e) => console.log('Error while subscribing: ' + e)
    })
  }

  setCoordinates(eventCoordinates: any): void {
    if (this.mapService.isMapClickable == false) {
      return;
    }
    
    this.mapService.hideSideBar(false);

    const coordinates: Coordinate = toLonLat(eventCoordinates);
    this.mapService.updateChoosenLocation({ id: '', name: '', cordinateX: coordinates[0], cordinateY: coordinates[1] });
  }
}
