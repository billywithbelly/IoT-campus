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
			var ourbike = {};
			for(var i=0;i<bikes.length;i++){
				var obj = new Object;
				obj._id = bikes[i]._id;
			  obj.state = bikes[i].data.charAt(7);
				obj.battery = bikes[i].data.charAt(3);
				obj.location = {
				latitude  : 24.795942,
				longitude : 120.996966
			        };
				obj.kid = null;
				obj.time = bikes[i].time;
				ourbike.push(obj);
			};
			this.map.setBikes(ourbike);
		});
	}
}
