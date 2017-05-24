import io from 'socket.io-client'
export default class Socket{
	constructor(map){
		this.socket = io.connect();
		this.map = map;
		this.socket.on('log', function (log) {
			console.log(log);
		});
		this.socket.on('parking',(response)=>{
			var parking = response.result;
			this.map.setBikes(parking);
		});
	}
}