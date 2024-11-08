import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  getAll(): any[] {
    const objects = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        objects.push(this.getItem(key));
      }
    }

    return objects;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
