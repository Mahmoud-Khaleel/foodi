export class LocationModel {
  constructor(
    public type: string,
    public coordinates: [number, number],
    public address: string,
    public description: string,
  ) {}
}
