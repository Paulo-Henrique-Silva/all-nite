import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./aside/side-bar/side-bar.component";
import { MapComponent } from "./map/map.component";
import { DividerModule } from 'primeng/divider';
import { AnimateModule } from 'primeng/animate';
import { MapService } from './map/services/map.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideBarComponent, MapComponent, DividerModule, AnimateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'all-nite';

  subscriptionHideMap: Subscription = new  Subscription();
  isHide:  boolean = false;

  constructor(private router: Router, protected mapService: MapService) {
    this.subscriptionHideMap =  this.mapService.hideMap$.subscribe({next:  (mapStatus) => {
      if (mapStatus) {
        this.isHide = mapStatus;
      }
    },
    error: (error) => {
      console.log('Error while subscribing: ' + error);
    }});
  }

  isMapActive(): boolean {
    if (this.isHide) {
      return false;
    }

    if (this.router.isActive('', true)) {
      this.mapService.isMapClickable = false;
      return true;
    }

    return false;
  }
}
