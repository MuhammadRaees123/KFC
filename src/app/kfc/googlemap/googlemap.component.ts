import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet'; 
import * as Leaflet from 'leaflet'; 

@Component({
  selector: 'app-googlemap',
  standalone: true,
  imports: [],
  templateUrl: './googlemap.component.html',
  styleUrl: './googlemap.component.css'
})
export class GooglemapComponent  implements OnInit {

  constructor(){}

  // variables
  map: any;

   // Method No-1
   //******************************************** *//

  // Method ngOnInit
  ngOnInit(): void {

  }

  // configmap(){
  //   this.map = L.map('map', {
  //     center: [ 28.626137,  79.821603 ],
  //     zoom: 6
  //   });

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(this.map);
  // }
  
  // Method No-2
  //******************************************** *//

  // map!: Leaflet.Map;
  // markers: Leaflet.Marker[] = [];
  // options = {
  //   layers: [
  //     Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //     })
  //   ],
  //   zoom: 16,
  //   center: { lat: 28.626137, lng: 79.821603 }
  // }

  // onMapReady(map: Leaflet.Map): void {
  //   this.map = map;
  //   // Additional initialization logic here
  // }

  // mapClicked(event: any): void {
  //   // Handle map click event
  // }

}