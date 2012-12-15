exports.status = function (code, res, err)
{
	if(code==200)//OK on get requests
	{
		res.writeHead('HTTP/1.1 '+200+' OK', {'content-length': 0, 'Date': Date.now});
		res.end('');
	}
	if(code==201)//OK created
	{
		res.writeHead('HTTP/1.1 '+201+' OK', {'content-length': 0, 'Date': Date.now});
		res.end('');	
	}
	if(code==404)//Resource not found
	{
		
	}
	if(code==406)//Method not acceptable
	{
		
	}
	if(code==409)//Conflict on posts or puts
	{
		
	}
	if(code==412)//Precondition failed like date added is more recent than the date in the precondition
	{
		
	}
	if(code==500)//Server error e.g. database off
	{
		
	}


}