import { Injectable } from '@angular/core';
import { AntLocation } from '../../shared/models/ant-location';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _location: AntLocation = { name: "Guarulhos - Centro", cordinateX: -46.533333, cordinateY: -23.463333 };

  private _isEventLocationSet: boolean = false;

  private _isMapClickable: boolean = false;

  private _choosenLocation$: Subject<AntLocation | null> = new Subject<AntLocation | null>();

  private _hideMap$: Subject<boolean | null> = new Subject<boolean | null>();
  public get hideMap$(): Subject<boolean | null> {
    return this._hideMap$;
  }
  public set hideMap$(value: Subject<boolean | null>) {
    this._hideMap$ = value;
  }

  public get choosenLocation$(): Subject<AntLocation | null> {
    return this._choosenLocation$;
  }
  public set choosenLocation$(value: Subject<AntLocation | null>) {
    this._choosenLocation$ = value;
  }
  
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

  updateChoosenLocation(location: AntLocation): void {
    this.choosenLocation$.next(location);
  }

  changeMapStatus(status: boolean): void {
    this._hideMap$.next(status);
  }
}
