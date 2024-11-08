import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule, AbstractControl  } from "@angular/forms"
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MapService } from '../../map/services/map.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Subscription } from 'rxjs';
import { AntLocation } from '../../shared/models/ant-location';
import { StorageService } from '../../shared/services/storage.service';
import { v4 as uuidv4 } from 'uuid';
import { AntEvent } from '../../shared/models/ant-event';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CalendarModule, InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;

  subscriptionLocation: Subscription = new Subscription();

  constructor(private formBuiler: FormBuilder, private mapService: MapService, private storageService: StorageService) {
    this.formGroup = formBuiler.group({
      eventName: ['', Validators.required],
      date: ['', Validators.required],
      locationName: ['', Validators.required],
      coordinates: ['', Validators.required]
    })

    this.mapService.isEventLocationSet = false;
    this.mapService.isMapClickable = true;
  }

  ngOnInit(): void {
    if (this.mapService.choosenLocation != null) {
      this.setFormCoordinates(this.mapService.choosenLocation);
    }

    this.subscriptionLocation = this.mapService.choosenLocation$.subscribe({next:  (location) => {
      if (location != null) {
        this.setFormCoordinates(location);
      }
    },
    error: (error) => {
      console.log('Error while subscribing: ' + error);
    }});

    this.mapService.hideSideBar(false);
  }

  setFormCoordinates(location: AntLocation) {
    //TODO: Map changes coordinates after chosing a location in ADD form, because tha map coordinates use the same properties as the Map maker.
    //Therefore, it must have another properties for the map maker in map service... 
    this.formGroup.get('coordinates')?.setValue(`${location.cordinateX};${location.cordinateY}`);

    this.mapService.isEventLocationSet = true;
    this.mapService.makerLocation.cordinateX = location.cordinateX;
    this.mapService.makerLocation.cordinateY = location.cordinateY;
  }

  ngOnDestroy(): void {
    this.subscriptionLocation.unsubscribe();

    this.mapService.isEventLocationSet = false;
  }

  isControlInvalid(formControlName: string): boolean {
    const control:  AbstractControl | null = this.formGroup.get(formControlName);

    if (!control) {
      throw new Error(`Form control ${formControlName} does not exist.`);
    }

    return control.invalid && control.dirty;
  }

  getErrorMessage(formControlName: string): string {
    const control:  AbstractControl | null = this.formGroup.get(formControlName);

    if (!control) {
      throw new Error(`Form control ${formControlName} does not exist.`);
    }

    if (control.hasError('required')) {
      return `Field is mandatory`;
    }

    return '';
  }

  hideForm(): void {
    this.mapService.hideSideBar(true);
  }

  generateUID(): string {
    return uuidv4();
  }

  onSubmit(): void {
    //Creates an event
    const newEvent =  new AntEvent();
    newEvent.id = this.generateUID();
    newEvent.date = new Date(this.formGroup.get('date')?.value)
    newEvent.name = this.formGroup.get('eventName')?.value

    //creates a location
    const newLocation = new AntLocation();
    newLocation.id = this.generateUID();
    newLocation.name = this.formGroup.get('locationName')?.value;

    //get coordinates info
    const coordinates = String(this.formGroup.get('coordinates')?.value).split(";");
    newLocation.cordinateX  = Number(coordinates[0]);
    newLocation.cordinateY  = Number(coordinates[1]);

    newEvent.location = newLocation;

    this.storageService.addItem(newEvent.id, newEvent);
    this.formGroup.reset();
  }
}
