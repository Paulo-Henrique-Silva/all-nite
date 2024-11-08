import { AntLocation } from "./ant-location"

export class AntEvent {
    public id: string = '';

    public name: string = '';

    public date: Date = new Date();

    public location: AntLocation = new AntLocation();
}