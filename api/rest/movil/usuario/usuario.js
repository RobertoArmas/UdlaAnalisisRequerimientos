/*------------------------------------------------------------
  Modulo usuario
-------------------------------------------------------------*/
exports.registrar = function(req,res){
	req.getConnection(function(err,connection){
		connection.query('INSERT INTO usuario',function(err,rows){
			if(err)
			{
				console.log("Error Selecting: %s",err);
			}else{
			//var email = rows[0].usr_email;
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(rows));
			res.end();
			}
		});
	});
};
