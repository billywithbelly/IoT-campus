import {map} from '../react/index'

export default class Bike{
  constructor(map,bike,index){
    this.bike = bike;

    
    this.icon = {
      //url: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/magic-marker-icons-transport-travel/116392-magic-marker-icon-transport-travel-transportation-bicycle.png', // url
      url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Green_Dot.svg/200px-Green_Dot.svg.png',
      scaledSize: new google.maps.Size(17, 17) // scaled size
    };
    
    if(bike.state == 1) {
      this.icon.url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/1024px-Red_dot.svg.png';
    }
    
    this.marker = new google.maps.Marker({
      map: map.googleMap,
      position: {lat: parseFloat(bike.location.latitude), lng: parseFloat(bike.location.longitude)},
      icon: this.icon,
      zoom: 20,
      customInfo: this.index

    });
    this.attachSecretMessage = this.attachSecretMessage.bind(this);
    if(bike.state == 0){
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
      //setTimeout("this.marker.setAnimation(google.maps.Animation.BOUNCE)" , 10000);
      //setTimeout("this.marker.setAnimation(4)" , 10000);
      
    }
  }

  attachSecretMessage() {
    $.post('/view',{action:'bikeInfo',json:this.bike},function (Content) {
      var infowindow = new google.maps.InfoWindow({
        content: Content
      });
      this.marker.addListener('click', function() {
          if(Bike.currentInfowindow!=undefined)Bike.currentInfowindow.close();
          infowindow.open(this.marker.get('map'), this.marker);
          Bike.currentInfowindow = infowindow;
          Bike.panorama = map.googleMap.getStreetView();
          Bike.panorama.setPosition({ lat: this.marker.getPosition().lat(), lng: this.marker.getPosition().lng()});
          Bike.panorama.setPov(({
            heading: 265,
            pitch: 0
          }));
          $('#streetview').click(()=>{Bike.panorama.setVisible(true);});
          $('#closebut').click(()=>{Bike.currentInfowindow.close();});
        }.bind(this));
    }.bind(this));
  }
}

Bike.panorama = null;
Bike.currentInfowindow = null;