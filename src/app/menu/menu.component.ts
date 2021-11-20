import { Component, OnInit } from '@angular/core';
import { BridgeId } from '../bridge';
import { DataManagerService } from '../data-manager.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  bridges!: BridgeId[];

  constructor(private dataService: DataManagerService) {}

  trackByBridges(index: number, bridge: BridgeId): string {
    return bridge.id;
  }

  ngOnInit(): void {
    this.dataService.getBridges().subscribe((data) => {
      (this.bridges = data)});
  }
}
