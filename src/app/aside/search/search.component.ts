import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AntEvent } from '../../shared/models/ant-event';
import { AntLocation } from '../../shared/models/ant-location';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { LocationService } from '../../shared/services/location.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, CardModule, ScrollPanelModule],
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
        cordinateX: 12,
        cordinateY: 86
      }
    },
    {
      name: 'Summer Breeze Concert',
      date: new Date(2024, 7, 20, 19, 30),
      location: {
        name: 'Central Park',
        cordinateX: 45,
        cordinateY: 78
      }
    },
    {
      name: 'Food Truck Festival',
      date: new Date(2024, 5, 1, 11, 0),
      location: {
        name: 'Downtown Area',
        cordinateX: 23,
        cordinateY: 91
      }
    },
    {
      name: 'Marathon Run',
      date: new Date(2024, 3, 12, 8, 0),
      location: {
        name: 'Stadium',
        cordinateX: 56,
        cordinateY: 34
      }
    },
    {
      name: 'Music Awards',
      date: new Date(2024, 11, 25, 20, 0),
      location: {
        name: 'Theater',
        cordinateX: 67,
        cordinateY: 19
      }
    },
    {
      name: 'New Year\'s Eve Party',
      date: new Date(2024, 12, 31, 22, 0),
      location: {
        name: 'City Center',
        cordinateX: 89,
        cordinateY: 42
      }
    },
    {
      name: 'Spring Fling',
      date: new Date(2024, 4, 10, 14, 0),
      location: {
        name: 'University Campus',
        cordinateX: 31,
        cordinateY: 75
      }
    },
    {
      name: 'Winter Wonderland',
      date: new Date(2024, 2, 1, 17, 0),
      location: {
        name: 'Ski Resort',
        cordinateX: 98,
        cordinateY: 61
      }
    }
  ];
  
  filteredEvents: AntEvent[] = [];

  eventName: string = "";

  locationService: LocationService;

  constructor(locationService: LocationService) {
    this.locationService = locationService;
  }
  
  ngOnInit(): void {
    this.filteredEvents = this.events
  }
  
  filter(): void {
    if (this.eventName.length != 0) {
      this.filteredEvents = this.events.filter(e => e.name.toUpperCase().includes(this.eventName.toUpperCase()))
      return
    }

    this.filteredEvents = this.events
  }

  seeEventLocation(antEvent: AntEvent): void {
    this.locationService.location.cordinateX = antEvent.location.cordinateX
    this.locationService.location.cordinateY = antEvent.location.cordinateY
  }
}
