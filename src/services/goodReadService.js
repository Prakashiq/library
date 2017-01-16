var http = require('http');
var xml2js = require('xml2js');

var parser = xml2js.Parser({explicitArray:false});



var goodReadService = function(){

	var getBookById = function(id, callback){

		var options = {
			host:'www.goodreads.com',
			path: 'https://www.goodreads.com/book/show/'+id+'?format=xml&key=sf1o3WGq4dUX7Vb1FfkVA'
		};

		var  httpcallback = function(response){
			var str='';

			response.on('data',function(chunk){
				str += chunk;
			});
			response.on('end',function(){
					//console.log(str);
					parser.parseString(str,function(err,result){
						console.log( result.GoodreadsResponse.book);
						callback(null,result.GoodreadsResponse.book);
					})
			});
		};

		http.request(options,httpcallback).end();
	};

	

	return {getBookById:getBookById};
};


module.exports = goodReadService;
