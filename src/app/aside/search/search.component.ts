import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AntEvent } from '../../shared/models/ant-event';
import { AntLocation } from '../../shared/models/ant-location';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MapService } from '../../map/services/map.service';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, CardModule, ScrollPanelModule, InputTextModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  
  events: AntEvent[] = [ 
    {
      name: 'Electric Storm Festival',
      date: new Date(2024, 9, 15, 15, 0),
      location: {
        name: 'Fatec Guarulhos - CECAP',
        cordinateX: -46.5300, 
        cordinateY: -23.4600 
      }
    },
    {
      name: 'Summer Breeze Concert',
      date: new Date(2024, 7, 20, 19, 30),
      location: {
        name: 'Central Park, New York City',
        cordinateX: -73.968285, 
        cordinateY: 40.785091  
      }
    },
    {
      name: 'Food Truck Festival',
      date: new Date(2024, 5, 1, 11, 0),
      location: {
        name: 'Pioneer Courthouse Square, Portland',
        cordinateX: -122.678395,
        cordinateY: 45.518653  
      }
    },
    {
      name: 'Marathon Run',
      date: new Date(2024, 3, 12, 8, 0),
      location: {
        name: 'London Olympic Stadium',
        cordinateX: -0.016560,  
        cordinateY: 51.538570  
      }
    },
    {
      name: 'Music Awards',
      date: new Date(2024, 11, 25, 20, 0),
      location: {
        name: 'Sydney Opera House',
        cordinateX: 151.215297, 
        cordinateY: -33.856784 
      }
    },
    {
      name: 'New Year\'s Eve Party',
      date: new Date(2024, 12, 31, 22, 0),
      location: {
        name: 'Times Square, New York City',
        cordinateX: -73.985130, 
        cordinateY: 40.758896  
      }
    },
    {
      name: 'Spring Fling',
      date: new Date(2024, 4, 10, 14, 0),
      location: {
        name: 'University of Tokyo, Hongo Campus',
        cordinateX: 139.762180, 
        cordinateY: 35.712956  
      }
    },
    {
      name: 'Winter Wonderland',
      date: new Date(2024, 2, 1, 17, 0),
      location: {
        name: 'Aspen Ski Resort, Colorado',
        cordinateX: -106.817540,
        cordinateY: 39.191100  
      }
    }
  ];
  
  filteredEvents: AntEvent[] = [];

  eventName: string = "";

  constructor(protected mapService: MapService) {
    this.mapService = mapService;
    this.mapService.isMapClickable = false;
  }
  
  ngOnInit(): void {
    this.filteredEvents = this.events.sort((a, b) => a.name.localeCompare(b.name))
  }
  
  filter(): void {
    if (this.eventName.length != 0) {
      this.filteredEvents = this.events.filter(e => e.name.toUpperCase().includes(this.eventName.toUpperCase()))
      return
    }

    this.filteredEvents = this.events
  }

  seeEventLocation(antEvent: AntEvent): void {
    this.mapService.curlocation.cordinateX = antEvent.location.cordinateX;
    this.mapService.curlocation.cordinateY = antEvent.location.cordinateY;
    this.mapService.isEventLocationSet = true;
  }
}
