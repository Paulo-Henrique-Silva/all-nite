import { Component } from '@angular/core';
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
export class MapComponent {
  mapService: AntLocation;

  constructor(mapService: MapService) {
    this.mapService = mapService.curlocation;
  }

}
