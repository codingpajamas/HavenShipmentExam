describe('Controller Test Suite', function(){

	beforeEach(module('havenApp'));

	describe('Home Controller', function(){ 
		var scope, ctrl;

		beforeEach(inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			ctrl = $controller('homeCtrl', {$scope:scope});
		}));

		it('should get correct page title', function(){
			expect(scope.title).toBe('Select Date');
		}); 
	});

	describe('Voyages Controller', function(){ 
		var scope, ctrl;

		beforeEach(inject(function($controller, $rootScope){
			scope = $rootScope.$new();
			ctrl = $controller('voyagesCtrl', {$scope:scope});
		}));

		it('should get correct page title', function(){
			expect(scope.title).toBe('Available Voyages');
		});
	});
});