import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BridgeInfoPanelComponent } from './bridge-info-panel.component';
import { Bridge } from '../bridge';

describe('BridgeInfoPanel Component', () => {
  let component: BridgeInfoPanelComponent;
  let fixture: ComponentFixture<BridgeInfoPanelComponent>;
  let bridge: Bridge;
  let elm: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BridgeInfoPanelComponent],
    });

    fixture = TestBed.createComponent(BridgeInfoPanelComponent);
    component = fixture.componentInstance;

    const today = new Date();
    const currentYear = today.getFullYear();

    bridge = {
      id: 'bridge-41S-140-C',
      name: 'MOOSE CREEK CULLVERT,   Hwy. 17',
      lat: 49.815076,
      lng: -92.990691,
      year: currentYear - 1,
      "length": 30,
      "width": null,
    };
    elm = fixture.nativeElement;
  });

  it('should alow creating an instance', () => {
    expect(component).toBeDefined();
  });

  describe('length()', () => {
    it('should give a string formatted length with the given bridge length', () => {
      bridge.length = 10;

      component.bridge = bridge;
      expect(component.length()).toEqual('10 m');
    });

    it('should give a string `unknown` when bridge length is null', () => {
      bridge.length = null;
      component.bridge = bridge;
      expect(component.length()).toEqual('unknown');
    });
  });

  describe('width()', () => {
    it('should give a string formatted width with the given bridge length', () => {
      bridge.width = 10;

      component.bridge = bridge;
      expect(component.width()).toEqual('10 m');
    });

    it('should give a string `unknown` when bridge length is ', () => {
      bridge.width = null;
      component.bridge = bridge;
      expect(component.width()).toEqual('unknown');
    });
  });

  describe('age()', () => {
    it('should calculate the correct age of bridge in years', () => {
      component.bridge = bridge;
      expect(component.age()).toEqual(1);
    });
  });

  describe('Template', () => {
    it('should include the bridge name in titlecase', () => {
      bridge.name = 'BRidge NamE';
      component.bridge = bridge;
      fixture.detectChanges();

      const h2 = elm.querySelector('h2');
      expect(h2?.textContent).toEqual('Bridge Name');
    });

    it('should include the bridge year and age info', () => {
      component.bridge = bridge;
      fixture.detectChanges();

      const div = elm.querySelector('.year');
      expect(div?.textContent).toEqual(`Year: ${bridge.year} (1 years)`);
    });
  });

  ['Width', 'Length'].forEach((name) => {
    const nameLower: String = name.toLowerCase();

    describe(`${nameLower}()`, () => {
      it(`should include the ${nameLower} properly formatted as a number`, () => {
        bridge[nameLower.toString()] = 10;
        component.bridge = bridge;
        fixture.detectChanges();

        const div = elm.querySelector(`.${nameLower}`);
        expect(div?.textContent).toEqual(`${name}: 10 m`);
      });

      it(`should include the ${nameLower} as 'unknown' when missing`, () => {
        bridge[nameLower.toString()] = null;
        component.bridge = bridge;
        fixture.detectChanges();

        const div = elm.querySelector(`.${nameLower}`);
        expect(div?.textContent).toEqual(`${name}: unknown`);
      });
    });
  });
});
