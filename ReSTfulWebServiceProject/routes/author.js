
/*
 * GET home page.
 */

exports.get = function(req, res){
  res.send('{name: \'asd\'}' + ' ' + req.params.authorname);
};