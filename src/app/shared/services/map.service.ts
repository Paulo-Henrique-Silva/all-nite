import { Injectable } from '@angular/core';
import { AntLocation } from '../models/ant-location';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _location: AntLocation = { name: "Guarulhos - Centro", cordinateX: -46.533333, cordinateY: -23.463333 };

  private _isEventLocationSet: boolean = false;

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
