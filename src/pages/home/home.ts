import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
	@ViewChild('map') mapElement: ElementRef;
	@ViewChild('directionsPanel') directionsPanel: ElementRef;
	map: any;

	constructor(public navCtrl: NavController) {

	}

	ionViewDidLoad(){

		this.loadMap();
		this.startNavigating();

	}

	loadMap(){

		let latLng = new google.maps.LatLng(-34.9290, 138.6010);

		let mapOptions = {
		  center: latLng,
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

	}

	startNavigating(){

		let directionsService = new google.maps.DirectionsService;
		let directionsDisplay = new google.maps.DirectionsRenderer;
		
		directionsDisplay.setMap(this.map);
		directionsDisplay.setPanel(this.directionsPanel.nativeElement);

		directionsService.route({
			origin: 'adelaide',
			destination: 'adelaide oval',
			travelMode: google.maps.TravelMode['DRIVING']
		}, (res, status) => {

			if(status == google.maps.DirectionsStatus.OK){
				directionsDisplay.setDirections(res);
			} else {
				console.warn(status);
			}

		});

	}

	//origin: {lat: 37.77, lng: -122.447},  // Haight.
    //destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.

}