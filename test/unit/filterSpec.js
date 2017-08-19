describe('Filter Test Suite', function(){

	beforeEach(module('havenApp'));

	describe('ReadableDate Filter', function(){
		it('should convert a moment date into readable format', inject(function($filter){
			var formatDate = $filter('readableDate');
			var dateValid = moment('2016-01-01');
			var dateInValid = null;

			expect(formatDate(dateValid, 'MMMDD')).toBe('Jan01');
			expect(formatDate(dateInValid, 'MMMDD')).toBe('N/A');
		}));
	})
})