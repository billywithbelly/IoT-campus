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
				bikes[i].lasttime = new Date(new Date(bikes[i].lasttime));
			};

			this.map.setBikes(bikes);
		});
	}
}
