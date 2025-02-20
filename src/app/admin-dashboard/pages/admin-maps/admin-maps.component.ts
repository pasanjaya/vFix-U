import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-admin-maps',
  templateUrl: './admin-maps.component.html',
  styleUrls: ['./admin-maps.component.scss']
})
export class AdminMapsComponent implements OnInit {
  map: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.map = document.getElementById('map-canvas');
    let lat = this.map.getAttribute('data-lat');
    let lng = this.map.getAttribute('data-lng');

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 5,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {featureType: 'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},
          {'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2f2f2'}]},
          {'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},
          {'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},
          {'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},
          {'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},
          {'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},
          {'featureType':'water','elementType':'all','stylers':[{'color':'#5e72e4'},{'visibility':'on'}]}]
    }

    this.map = new google.maps.Map(this.map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: 'Hello World!'
    });

    var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', () => {
        infowindow.open(this.map, marker);
    });
  }

  onLocate(locateForm: NgForm) {
    if (locateForm.invalid) {
      return;
    }
    let dataLat:number = locateForm.value.latitude;
    let dataLng:number = locateForm.value.longitude;

    let latlng = new google.maps.LatLng(dataLat, dataLng);
    let newMaker = new google.maps.Marker({
      position: latlng,
      map: this.map
    });
    console.log(locateForm);
  }

}
