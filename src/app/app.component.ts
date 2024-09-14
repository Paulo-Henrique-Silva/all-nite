import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./aside/side-bar/side-bar.component";
import { MapComponent } from "./map/map.component";
import { DividerModule } from 'primeng/divider';
import { AnimateModule } from 'primeng/animate';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideBarComponent, MapComponent, DividerModule, AnimateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'all-nite';

  constructor(private router: Router) {}

  isMapActive(): boolean {
    return this.router.isActive('', true);
  }
}
