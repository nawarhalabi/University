exports.status = function (code, res, headers, body)
{
	if(code==200)//OK on get requests
	{
		res.writeHead('HTTP/1.1 '+200+' OK', {'content-length': body.length, 'Date': Date.now});
	}
	if(code==201)//OK created
	{
		res.writeHead('HTTP/1.1 '+201+' OK Created', {'content-length': body.length, 'Date': Date.now}); // body here is the returned location for 0 exception
	}
	if(code==400)//Bad Request
	{
		res.writeHead('HTTP/1.1 '+400+' Bad Request', {'content-length': body.length, 'Date': Date.now});
	}
	if(code==404)//Resource not found
	{
		res.writeHead('HTTP/1.1 '+404+' Not Found', {'content-length': body.length, 'Date': Date.now});
	}
	if(code==405)//Method not allowed
	{
		res.writeHead('HTTP/1.1 '+405+' Not allowed', {'content-length': body.length, 'Date': Date.now, 'Allow': body});
	}
	if(code==409)//Conflict on posts or puts
	{
		res.writeHead('HTTP/1.1 '+409+' Conflict', {'content-length': body.length, 'Date': Date.now});
	}
	if(code==412)//Precondition failed like date added is more recent than the date in the precondition
	{
		res.writeHead('HTTP/1.1 '+412+' Precondition Failed', {'content-length': body.length, 'Date': Date.now});
	}
	if(code==500)//Server error e.g. database off
	{
		res.writeHead('HTTP/1.1 '+500+' Internal Server Error', {'content-length': body.length, 'Date': Date.now});
	}/*
	headers.forEach(function(header)
	{
		var key = header.key;
		var value = header.value;
		res.writeHead('', {key: value});
	});*/
	console.log(body);
	res.end(body);
}