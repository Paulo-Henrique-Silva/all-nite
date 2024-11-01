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

  constructor(formBuiler: FormBuilder, public mapService: MapService) {
    this.formGroup = formBuiler.group({
      eventName: ['', Validators.required],
      date: ['', Validators.required],
      locationName: ['', Validators.required],
      coordinates: ['', Validators.required]
    })

    this.mapService = mapService;
    this.mapService.isEventLocationSet = false;
    this.mapService.isMapClickable = true;
  }

  ngOnInit(): void {
    this.subscriptionLocation = this.mapService.choosenLocation$.subscribe({next:  (location) => {
      this.formGroup.get('coordinates')?.setValue(`${location?.cordinateX};${location?.cordinateY}`)
    },
    error: (error) => {
      console.log('Error while subscribing: ' + error);
    }});
  }

  ngOnDestroy(): void {
    this.subscriptionLocation.unsubscribe();
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
    this.mapService.changeMapStatus(true);
  }

  onSubmit(): void {

  }
}
