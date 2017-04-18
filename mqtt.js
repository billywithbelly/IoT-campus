var mqtt = require('mqtt');
var opt = {
	port:1883,
	clientID: '1908158da9f54d71be7793477ff4371f'

};

var client = mqtt.connect('mqtt://104.199.215.165', opt);
client.on('connect', function (){
	console.log('you are connected');
	client.subscribe('GIOT-GW/UL/1C497B43217A');
});

client.on('message', function (topic, msg){
	var result = msg.toString();
	result = result.substring(1, result.length-1);
	var obj = JSON.parse(result);
	if (obj.macAddr == '0000000000000396'){
		console.log('recieved:  macAddr:'+obj.macAddr+' data:'+obj.data);
	}
});
