import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AntEvent } from '../../shared/models/ant-event';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MapService } from '../../map/services/map.service';
import { InputTextModule } from 'primeng/inputtext';
import { StorageService } from '../../shared/services/storage.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, CardModule, ScrollPanelModule, InputTextModule, ButtonModule, TooltipModule, 
    ConfirmDialogModule, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  
  events: AntEvent[] = [ ];
  
  filteredEvents: AntEvent[] = [];

  eventNameQuery: string = "";

  constructor(private mapService: MapService, private storageService: StorageService, private confirmationService: ConfirmationService, 
    private messageService: MessageService) {
    this.mapService.isMapClickable = false;
    this.events = this.storageService.getAll();
    
    //Converts to ensure is a valid date object.
    this.events.forEach(e => {
      e.date = new Date(e.date);
    });
  }
  
  ngOnInit(): void {
    this.filteredEvents = this.events.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  filter(): void {
    if (this.eventNameQuery.length != 0) {
      this.filteredEvents = this.events.filter(e => e.name.toUpperCase().includes(this.eventNameQuery.toUpperCase()));
      return;
    }

    this.filteredEvents = this.events
  }

  seeEventLocation(antEvent: AntEvent): void {
    this.mapService.curlocation.cordinateX = antEvent.location.cordinateX;
    this.mapService.curlocation.cordinateY = antEvent.location.cordinateY;

    this.mapService.makerLocation.cordinateX = antEvent.location.cordinateX;
    this.mapService.makerLocation.cordinateY = antEvent.location.cordinateY;

    this.mapService.isEventLocationSet = true;
  }

  deleteEvent(id: string, event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this event?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      defaultFocus: 'reject',

      accept: () => {
        this.storageService.removeItem(id);
        this.events = this.events.filter(e => e.id != id);
        this.filteredEvents = this.filteredEvents.filter(e => e.id != id);

        this.messageService.add({ severity: 'info', summary: 'Delete', detail: 'Event deleted' });
      }
    });
  }
}
