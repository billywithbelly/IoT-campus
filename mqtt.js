function hexToDec(hex) {
    var result = 0, digitValue;
    hex = hex.toLowerCase();
    for (var i = 0; i < hex.length; i++) {
        digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
        result = result * 16 + digitValue;
    }
    return result;
}

var mqtt = require('mqtt');
var opt = {
	port:1883,
	clientID: '4184eb5d0e8942bb83408c61bdf17af9'
};

var client = mqtt.connect('mqtt://104.199.215.165', opt);
client.on('connect', function (){
	console.log('you are connected');
	client.subscribe('GIOT-GW/UL/1C497B43217A');
	console.log ('-----------------------');
});

client.on('message', function (topic, msg){
	var result = msg.toString();
	result = result.substring(1, result.length-1);
	var obj = JSON.parse(result);
	
	if (obj.macAddr == '0000000000000396'){
		console.log('recieved:  macAddr:'+obj.macAddr+' data:'+obj.data);
		var parse = obj.data.toString ();
		var lngth = parse.length;
		for (var i=1; i<6; i++) {
			switch (i) {
				case 1: {
					var tmpt = parse.substring (lngth-i*2, lngth-(i-1)*2);
					//console.log ('temperature : ' + 'hex : ' + parse.substring (lngth-i*2, lngth-(i-1)*2) 
					//	+ ' decimal : ' + hexToDec(tmpt));
					console.log ('temperature : ' + hexToDec(tmpt));
					break;
				}
				case 2: {
					var tmpt = parse.substring (lngth-i*2, lngth-(i-1)*2);
					//console.log ('magnetic disturbance : ' + 'hex : ' + parse.substring (lngth-i*2, lngth-(i-1)*2) 
					//	+ ' decimal : ' + hexToDec(tmpt));
					console.log ('magnetic disturbance : ' + hexToDec(tmpt));
					break;
				}
				case 3: {
					var tmpt = parse.substring (lngth-(i+1)*2, lngth-(i-1)*2);
					//console.log ('voltage : ' + 'hex : ' + parse.substring (lngth-(i+1)*2, lngth-(i-1)*2) 
					//	+ ' decimal : ' + (hexToDec(tmpt) / 1000) );
					console.log ('voltage : ' + (hexToDec(tmpt) / 1000) );
					break;
				}
				case 4: {
					// do nothing 
					break;
				}
				case 5: {
					var tmpt = parse.substring (lngth-i*2, lngth-(i-1)*2);
					//console.log ('car flag : ' + 'hex : ' + parse.substring (lngth-(i+1)*2, lngth-(i-1)*2) 
					//	+ ' decimal : ' + (hexToDec(tmpt) / 1000) );
					console.log ('car flag : ' + hexToDec(tmpt));
					break;
				}
				default : {
					console.log ('nothing to log');
					break;
				}
			}
		}

		console.log ('-----------------------');
	}
	
});
