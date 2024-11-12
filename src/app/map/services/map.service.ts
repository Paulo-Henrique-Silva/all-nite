import { Injectable } from '@angular/core';
import { AntLocation } from '../../shared/models/ant-location';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _curLocation: AntLocation = { id: '', name: '', cordinateX: -46.533333, cordinateY: -23.463333 };

  private _makerLocation: AntLocation = { id: '', name: '', cordinateX: -46.533333, cordinateY: -23.463333 };

  private _isEventLocationSet: boolean = false;

  private _isMapClickable: boolean = false;

  private _choosenLocation$: Subject<AntLocation | null> = new Subject<AntLocation | null>();

  private _choosenLocation: AntLocation | null = null;

  private _sideBarStatus$: Subject<boolean | null> = new Subject<boolean | null>();
  
  public get choosenLocation(): AntLocation | null {
    return this._choosenLocation;
  }
  private set choosenLocation(value: AntLocation | null) {
    this._choosenLocation = value;
  }

  public get sideBarStatus$(): Subject<boolean | null> {
    return this._sideBarStatus$;
  }
  public set sideBarStatus$(value: Subject<boolean | null>) {
    this._sideBarStatus$ = value;
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
    return this._curLocation;
  }

  public set curlocation(value: AntLocation) {
    this._curLocation = value;
  }
  
  public get isEventLocationSet(): boolean {
    return this._isEventLocationSet;
  }
  public set isEventLocationSet(value: boolean) {
    this._isEventLocationSet = value;
  }
  
  public get makerLocation(): AntLocation {
    return this._makerLocation;
  }
  public set makerLocation(value: AntLocation) {
    this._makerLocation = value;
  }

  constructor() { }

  updateChoosenLocation(location: AntLocation): void {
    this.choosenLocation$.next(location);
    this.choosenLocation = location;
  }

  hideSideBar(status: boolean): void {
    this._sideBarStatus$.next(status);
  }
}
