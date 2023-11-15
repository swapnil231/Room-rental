import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  catchError,
  map,
  of as observableof,
  throwError,
} from 'rxjs';
import * as tt from '@tomtom-international/web-sdk-maps';

interface mapapiresponse {
  results: {
    type: string;
    entityType: string;
    score: number;
    position: {
      lat: number;
      lon: number;
    };
  }[];
}
interface geoposition {
  lat: number;
  lon: number;
}
@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}
  private locationCache: any = {};

  getGeoposition(location: string, API_Key: string): Observable<geoposition> {
    const cachedLocation = this.getCacheLocation(location);

    return cachedLocation
      ? observableof(cachedLocation)
      : this.requestingGeolocation(location, API_Key);
  }
  private requestingGeolocation(
    location: string,
    API_Key: string
  ): Observable<geoposition> {
    return this.http
      .get<mapapiresponse>(
        `https://api.tomtom.com/search/2/geocode/${location}.json?key=${API_Key}`
      )
      .pipe(
        map((res) => {
          const results = res.results;

          if (results && results.length > 0) {
            const position = results[0].position;

            this.cachelocation(location, position);
            return position;
          }

          throw this.locationError;
        }),
        catchError(() => throwError(() => this.locationError))
      );
  }

  private get locationError() {
    return new Error('location not found');
  }

  creatMap(option: any) {
    return tt.map({
      key: option.API_Key,
      container: 'map',
      zoom: 10,
      scrollZoom: false,
    });
  }

  centerMap(map: tt.Map, geolocation: geoposition) {
    map.setCenter(new tt.LngLat(geolocation.lon, geolocation.lat));
  }

  addMrkertoMap(map: any, position: geoposition) {
    this.removePreviousMarker();
    const markerDiv = document.createElement('div');
    markerDiv.className = 'marker';

    new tt.Marker({
      element: markerDiv,
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
  }

  initmap(map: tt.Map, position: geoposition) {
    this.centerMap(map, position), this.addMrkertoMap(map, position);
  }

  creatPopup(err: any, map: tt.Map) {
    this.removePreviouspopupClass();
    new tt.Popup({
      className: 'my-class',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${err.message}</p>`)
      .addTo(map);
  }

  private getCacheLocation(location: string): geoposition {
    const locationKey = this.removeSpaceAndtoLowercase(location);
    return this.locationCache[locationKey];
  }
  private cachelocation(location: string, position: any) {
    const locationKey = this.removeSpaceAndtoLowercase(location);
    this.locationCache[locationKey] = position;
  }

  private removeSpaceAndtoLowercase(location: string) {
    return location.replace(/\s/g, '').toLowerCase();
  }

  private removeElementbyClass(classname: string) {
    const elements = document.getElementsByClassName(classname);
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
  }

  removePreviousMarker() {
    this.removeElementbyClass('marker');
  }

  removePreviouspopupClass() {
    this.removeElementbyClass('my-class');
  }
}
