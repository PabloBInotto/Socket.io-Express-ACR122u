(function(){
	
	var socket = io('http://127.0.0.1:3000/');
		
	socket.on('rfid', function(msg){
		console.log(msg);
		$("#divform").val(msg.msg);
	  });
	 
	 socket.on('UPDATE', function(data){
		console.log(data.rfid, data.status);
		if(data.status == 0){
			document.getElementById(data.rfid).style.backgroundColor = "red";
		}
		else if(data.status == 1){
			document.getElementById(data.rfid).style.backgroundColor = "green";
		}
	  });
	  

})()



