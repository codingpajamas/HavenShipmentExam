describe('Service Test Suite', function(){

	beforeEach(module('havenApp'));

	describe('Voyage Service', function(){
		var Voyage, httpBackend, portcallsUrl;

		beforeEach(inject(function(_Voyage_, _portcallsUrl_, $httpBackend){
			Voyage = _Voyage_; 
			httpBackend = $httpBackend;
			portcallsUrl = _portcallsUrl_;
		}));

		it('should get default dates', function(){ 
			var dates = Voyage.getDates();

			expect(dates).toBeDefined();
			expect(moment(dates.minDate).isValid()).toBe(true);
		});

		it('should fetch available routes', function(done){
			var voyagesResponseData = {"1":[{"id":1,"vessel":"USS Harpoon","routeId":1,"port":"HKHKG","eta":null,"etd":"2016-01-03 00:00:00"},{"id":2,"vessel":"USS Harpoon","routeId":1,"port":"SGSIN","eta":"2016-01-06 00:00:00","etd":"2016-01-09 00:00:00"}],"2":[{"id":5,"vessel":"USS Starboard","routeId":2,"port":"HKHKG","eta":null,"etd":"2016-01-04 00:00:00"},{"id":6,"vessel":"USS Starboard","routeId":2,"port":"USLAX","eta":"2016-01-06 00:00:00","etd":"2016-01-08 00:00:00"},{"id":7,"vessel":"USS Starboard","routeId":2,"port":"USOAK","eta":"2016-01-10 00:00:00","etd":"2016-01-12 00:00:00"}]};
			
			httpBackend.whenGET(new RegExp("^"+portcallsUrl)).respond(voyagesResponseData);

			Voyage.get().then(function(data){
				expect(_.size(data)).toBe(2);
				done();
			});

			httpBackend.flush();
		});
	})
})