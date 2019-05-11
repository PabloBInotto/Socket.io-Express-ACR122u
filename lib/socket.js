module.exports = function(io){	

	var con = require('./con.js');	
	var pcsc = require('pcsclite');
	var pcsc = pcsc();

	pcsc.on('reader', function(reader){
		//io.on('connection', function(socket){
					
			console.log('Leitor detectado', reader.name);
			reader.on('error', function(err){
				console.log('Erro(', this.name, '):', status);
			});		
			reader.on('status', function(status){
				console.log('Status(', this.name, ')', status);
				/* Veficando se halgo mudou */
				
				var changes = this.state ^ status.state;
				if (changes){
					if ((changes & this.SCARD_STATE_EMPTY) && (status.state & this.SCARD_STATE_EMPTY)){
						console.log("Cartao removido"); // o catao foi removido do leitor
						reader.disconnect(reader.SCARD_LEAVE_CARD, function(err){
							if(err){
								console.log(err);
							} else {
								console.log('Disconectado');
							}
						});
					} else if ((changes & this.SCARD_STATE_PRESENT) && (status.state & this.SCARD_STATE_PRESENT)) {
						console.log('Cartao inserido'); // caartao inserido no leitor
						reader.connect({ share_mode : this.SCARD_SHARE_SHARED }, function(err, protocol) {
							if (err){
								console.log(err)
							} else {
								
								console.log('Protocolo(', reader.name, '):', protocol);
								var message = new Buffer.from([0xFF, 0xCA, 0x00, 0x00, 0x00]);
								reader.transmit(message, 40, protocol, function(err, data) {
									if(err){
										console.log(err);
									} else {
										console.log('Dados recebidos: ', data);
										var ultimaleitura = data.readUIntBE(0, 6, true).toString(36);
										console.log('Codigo RFID: ' + ultimaleitura);
										
										var sql = con.query('SELECT COUNT (*) AS tt FROM `workers` WHERE `rfid` = ?', ultimaleitura, function(err, rows, results){
											if (err)throw err;
											if (rows[0].tt < 1){
												
												io.emit('rfid', {title: 'Nova tag detectada', msg: ultimaleitura});
												
											} else {
												var check_id = con.query('SELECT status FROM `workers` WHERE `rfid` = ?', ultimaleitura, function(err, rows, results){
													if (err)throw err;
													console.log('Status = ' + rows[0].status);
													if (rows[0].status == 1){
													con.query('UPDATE `workers` SET `status`= 0 WHERE `rfid` = ?', ultimaleitura);
													console.log('set status = 0');
													
													
														
														io.emit('UPDATE', {rfid: ultimaleitura, status: '0' });
														console.log('send: 0');
														
														
												} else if (rows[0].status == 0){
													con.query('UPDATE `workers` SET `status`= 1 WHERE `rfid` = ?', ultimaleitura);
													console.log('set status = 1');
													
														io.emit('UPDATE', {rfid: ultimaleitura, status: '1' });
														console.log('send: 1');
																																										
												}
																								
												});
												
											}
										
										});
									  
									  }
							});
						};
					});
				}
			}
		  });
		 
		//}); // io end
	});


	pcsc.on('error', function(err){
		console.log('PCSC ERRO', err.message);
	});
	
	
	module.exports = pcsc;
}