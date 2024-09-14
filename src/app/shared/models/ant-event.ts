import { AntLocation } from "./ant-location"

export class AntEvent {
    name: string = ''

    date: Date = new Date()

    location: AntLocation = new AntLocation()
}