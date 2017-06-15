import io from 'socket.io-client'
export default class Socket{
	constructor(map){
		this.socket = io.connect();
		this.map = map;
		this.socket.on('log', function (log) {
			console.log(log);
		});
		this.socket.on('bikes',(response)=>{
			var bikes = response.result;

			for(var i=0;i<bikes.length;i++){
				var d = new Date();
				bikes[i].time = new Date(new Date(bikes[i].time) - (d.getTimezoneOffset() * 60000));
				//if(bikes[i].id == "0000000000000393")console.log(bikes[i]);

        if(bikes[i].lasttime == new Date(0).getTime())bikes[i].lasttime = "No data";
				else bikes[i].lasttime = new Date(bikes[i].lasttime);

        var n = d.getTime();
        var diff =  (n - bikes[i].lasttime)/(1000*60);
				bikes[i].diff = diff;
			};
			console.log(bikes);
			this.map.setBikes(bikes);
		});

	}
}
