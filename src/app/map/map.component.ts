import { Component, OnInit } from '@angular/core';
import { AngularOpenlayersModule } from "ng-openlayers";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [AngularOpenlayersModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
    
  }

}
