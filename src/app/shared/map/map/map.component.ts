import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import * as tt from '@tomtom-international/web-sdk-maps';
import { MapService } from '../map.service';
import { Observable, Subject } from 'rxjs';

interface position {
  lat: number;
  lon: number;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, OnDestroy {
  private readonly API_Key = 'cTF6he8cYca92h5UVAUMoGYYtAzReW8t';
  @Input() rentallocation = '';
  @Input() mapNotifier!: Subject<string>;

  constructor(private map_service: MapService) {}

  ngOnDestroy(): void {
    this.mapNotifier && this.mapNotifier.unsubscribe();
  }
  ngOnInit(): void {
    this.creatMap();
    this.getgeolocation(this.rentallocation);
    if (this.mapNotifier) {
      this.mapNotifier.subscribe((location) => {
        this.getgeolocation(location);
      });
    }
    // this.getgeolocation('fffffff');
  }

  Map: any;
  // private creatMap() {
  //   this.Map = tt.map({
  //     key: this.API_Key,
  //     container: 'map',
  //     zoom: 10,
  //     scrollZoom: false,
  //   });
  //   this.Map.addControl(new tt.NavigationControl());
  //   this.map_service.requestingGeolocation(this.rentallocation);
  // }
  private creatMap() {
    this.Map = this.map_service.creatMap({ API_Key: this.API_Key });
    this.Map.addControl(new tt.NavigationControl());
  }

  private getgeolocation(location: string) {
    this.map_service.getGeoposition(location, this.API_Key).subscribe({
      next: (position: any) => {
        // this.Map.setCenter(new tt.LngLat(position.lon, position.lat));
        this.map_service.initmap(this.Map, position);
        console.log(position);

        // const markerDiv = document.createElement('div');
        // markerDiv.className = 'marker';

        // new tt.Marker({
        //   element: markerDiv,
        // })
        //   .setLngLat([position.lon, position.lat])
        //   .addTo(this.Map);
      },
      error: (err) => {
        // console.log(err);

        // alert(err.message);

        // new tt.Popup({
        //   className: 'my-class',
        //   closeButton: false,
        //   closeOnClick: false,
        // })
        //   .setLngLat(new tt.LngLat(0, 0))
        //   .setHTML(`<p>${err.message}</p>`)
        //   .addTo(this.Map);
        this.map_service.centerMap(this.Map, { lat: 0, lon: 0 });
        this.map_service.creatPopup(err, this.Map);
      },
    });
  }
}
