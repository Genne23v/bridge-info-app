import { Component, OnInit, AfterViewInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Bridge } from '../bridge';
import { LeafletMap } from './leaflet-map';

@Component({
  selector: 'app-bridge-info-map',
  templateUrl: './bridge-info-map.component.html',
  styleUrls: ['./bridge-info-map.component.css']
})
export class BridgeInfoMapComponent implements OnInit, AfterViewInit, OnChanges {
  "strictPropertyInitialization": false

  map!: LeafletMap;
  @Input() bridge!: Bridge;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.map = new LeafletMap('map');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map){
      return;
    }

    if (changes.bridge.currentValue) {
      const { lat, lng, name } = changes.bridge.currentValue;
      this.map.update(lat,lng, name);
    }
  }

}
