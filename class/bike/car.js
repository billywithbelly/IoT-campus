var tool = require('../../tool.js');

class Car
{
	constructor(app,db)
	{
		var that = this;
		this.mongoDataBase = db;

		app.get('/getCars',function(req,res) {
			that.getCars(function(response) {
				res.send(response);
			});
		});

		app.get('/getCarBattery', function(req, res) {
			that.getCarBattery(req.query.id, function(response) {
				res.send(response);
			});	
		});

		app.post('/setCar',function(req,res) {
			var data = tool.antiXSS(req.body);
			var kid = tool.generateUUID();
			that.setCar(data.id,data.state,data.battery,kid,function(response) {
				res.send(response);
			});
		});

		app.post('/update/Car', function(req, res) {
			var data = tool.antiXSS(req.body);
			that.updateCarAll(data.id, data.latitude, data.longitude, data.state, data.battery, function(response)
			{
				res.send(response);
			});
		});
	}

	getCars(callback) {
		this.mongoDataBase.getCars(function(err,data) {
			if(err){
				callback(tool.dberror());
			}
			else{
				callback(tool.result(data,1));
			}
		});
	}

	getCarBattery(id, callback) {
		this.mongoDataBase.getOneCar({ id : id }, function(err, res) {
			if(err) 
				callback(tool.dberror());
			else {
				if(res.length === 0) {
					callback(tool.result("no Car", -1));
				}
				else {
					callback(tool.result(res[0].battery, 1));
				}
			}
		});
	}

	setCar(id, state, battery,kid, callback) {
		this.mongoDataBase.setCar(id, state, battery,kid, function(err, data) {
			if(err){
				callback(tool.dberror());
			}
			else{
				callback(tool.result('set success',1));
			}
		}); 
	}

	updateCarAll(id, latitude, longitude, state, battery, callback) {
		var that = this;
		that.mongoDataBase.getOneCar({ id : id }, function(err, res)
		{
			if(err) 
			{
				callback(tool.dberror());
			}
			else if(res.length === 0) 
			{
				callback(tool.result("no Car", -1));
			}
			else 
			{
				that.mongoDataBase.updateCar(id, latitude, longitude, state, battery, function(err, res) 
				{
					if(err)	callback(tool.dberror());
					else	callback(tool.result("update location success", 1));
				});
			}
		});
	}
}

module.exports = Car;