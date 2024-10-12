import { Injectable } from '@angular/core';
import { AntLocation } from '../../shared/models/ant-location';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _location: AntLocation = { name: "Guarulhos - Centro", cordinateX: -46.533333, cordinateY: -23.463333 };

  private _isEventLocationSet: boolean = false;

  private _isMapClickable: boolean = false;
  
  public get isMapClickable(): boolean {
    return this._isMapClickable;
  }
  public set isMapClickable(value: boolean) {
    this._isMapClickable = value;
  }

  public get curlocation(): AntLocation {
    return this._location;
  }

  public set curlocation(value: AntLocation) {
    this._location = value;
  }
  
  public get isEventLocationSet(): boolean {
    return this._isEventLocationSet;
  }
  public set isEventLocationSet(value: boolean) {
    this._isEventLocationSet = value;
  }
  
  constructor() { }
}
