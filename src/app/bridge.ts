export interface Bridge {
  id: string;
  name: string;
  lat: number;
  lng: number;
  year: number;
  // We may have a length, or may have `null`
  length: number | null;
  // Same with width, maybe a `number`, maybe `null`
  width: number | null;
}
