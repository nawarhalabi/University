exports.status = function (code, res, headers, body)
{
	//Additional Headers-----------------------------------------------------------
	headers["Content-Length"] = body.length + '';
	headers['access-control-allow-origin'] = '*';
	//-----------------------------------------------------------------------------
	if(code==200)//OK on get requests
	{
		res.writeHead(200, 'OK', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==201)//OK created
	{
		res.writeHead(201, 'OK Created', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==400)//Bad Request
	{
		res.writeHead(400, 'Bad Request', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==404)//Resource not found
	{
		res.writeHead(404, 'Not Found', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==405)//Method not allowed
	{
		res.writeHead(405, 'Not allowed', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==406)//Not Acceptable
	{
		res.writeHead(406, 'Not Acceptable', headers);
	}
	if(code==409)//Conflict on posts or puts
	{
		res.writeHead(409, 'Conflict', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==412)//Precondition failed like date added is more recent than the date in the precondition
	{
		res.writeHead(412, 'Precondition Failed', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	if(code==415)//Unsupported Media Type
	{
		res.writeHead(415, 'Unsupported Media Type', headers);
	}
	if(code==500)//Server error e.g. database off
	{
		res.writeHead(500, 'Internal Server Error', headers/*{'content-length': body.length, 'Date': Date.now}*/);
	}
	
	console.log(body);
	res.end(body);
}