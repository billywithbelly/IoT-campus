import {map} from '../react/index'

export default class Bike{
  constructor(map,bike,index){
    this.bike = bike;

    this.icon = {
      //url: 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/magic-marker-icons-transport-travel/116392-magic-marker-icon-transport-travel-transportation-bicycle.png', // url
      url : 'https://www.kaffeewiki.de/images/4/4f/Gray_dot.png',
      scaledSize: new google.maps.Size(10, 10), // scaled size
    };


    if(bike.id == "0000000000000390" || bike.id == "0000000000000393" || bike.id == "0000000000000394" || bike.id == "0000000000000397" ||
        bike.id == "000000000D01009B" || bike.id == "000000000D0100DE" || bike.id == "000000000D0100A1" || bike.id == "000000000D0100D6" 
          || bike.id == "000000000D0100AC" || bike.id == "000000000000038F"){
        this.icon.url = 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/256/Trafficlight-green-icon.png';
      if(bike.state == "車位已滿"){
        this.icon.url = 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-10/256/Trafficlight-red-icon.png';
        /*if(bike.lasttime != null){
          if(bike.diff >= 30)this.icon.url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Yellow_Light_Icon.svg/232px-Yellow_Light_Icon.svg.png';

        } else {
          // create lasttime attribute ?
        }
        */

      }
    }


    this.marker = new google.maps.Marker({
      map: map.googleMap,
      position: {lat: parseFloat(bike.location.latitude), lng: parseFloat(bike.location.longitude)},
      icon: this.icon,
      customInfo: this.index
    });
    this.attachSecretMessage = this.attachSecretMessage.bind(this);

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
