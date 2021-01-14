 var express = require('express');
 var logger = require('morgan');  
 const dgram = require('dgram');
 var app = express();
 const NodeCache = require( "node-cache" );

 app.use(logger('dev'));
 

 const socket = dgram.createSocket('udp4');
 const myCache = new NodeCache();
 var keys=[];

 socket.on('message', function(message, remote) {
  console.log(' messaggio: ' +'('+ message +'),' + ' proveniente da: '+ remote.address + ':' + remote.port);
  items=String(message).split(",");
  //h_min_sec=Number(date_val[3]+'.'+date_val[4]+date_val[5]);
  //console.log(h_min_sec);
  obj = {retweet:parseInt(items[2]), likes:parseInt(items[1]),indexLabel:items[0].replace('?',' ')};
  value = myCache.get( items[0] );
if ( value == undefined ){
  const success = myCache.mset([{key: items[0], val: obj}]);
  keys.push(items[0]);
  console.log('nuovo valore aggiunto'+" "+keys);
 }else{
  myCache.set(items[0],obj);
  console.log('valore aggiornato');
 }

});
   

 app.get('/dashboard',function(req,res){
    var dps = [];
    var dps1 = [];
    var values=myCache.mget(keys);
    console.log(values);
    var i=0;
   

    Object.keys(values).forEach(function addVal(item){
    var val=myCache.get(item);
    var obj1={x:i,y:val.likes,label:val.indexLabel}
    var obj2={x:i,y:val.retweet,label:val.indexLabel}
    i=i+1;
    dps.push(obj1);
    dps1.push(obj2);
   });
 
    dps=JSON.stringify(dps).replace(/"([^"]+)":/g, '$1:');
    dps1=JSON.stringify(dps1).replace(/"([^"]+)":/g, '$1:');
    console.log(dps);
    res.send('<!DOCTYPE HTML>'+
              '<html>'+
              '<head>'+  
               '<script>'+
               'window.onload = function () {'+
               'var chart = new CanvasJS.Chart("chartContainer", {'+
 	        'animationEnabled: true,'+
	         'title:{'+
		 'text: "LIKES AND RETWEETS"'+
	          '},'+
	          'axisX: {'+
		'valueFormatString: "##"'+
	'},'+
	'axisY: {'+
		'title: "values"'+
	       '},'+
	'legend:{'+
		'cursor: "pointer",'+
		'fontSize: 16,'+
		'itemclick: toggleDataSeries'+
	'},'+
	'toolTip:{'+
		'shared: true'+
	'},'+
	'data: [{'+
		'name: "likes",'+
		'showInLegend: true,'+
                'type:"spline",'+
		'dataPoints:'+dps+'},'+
        '       {'+
                'name: "retweet",'+
                'showInLegend: true,'+
                'type:"spline",'+
                'dataPoints:'+dps1+'}]'+
        '});'+
    'chart.render();'+
    'function toggleDataSeries(e){'+
	'if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {'+
		'e.dataSeries.visible = false;'+
	'}'+
	'else{'+
		'e.dataSeries.visible = true;'+
	'}'+
	'chart.render();'+
'}'+
'}'+
'</script>'+
'</head>'+
'<body>'+
'<div id="chartContainer" style="height: 300px; width: 100%;"></div>'+
'<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>'+
'</body>'+
'</html>'
 ) }); 
   

 // POST REQUESTS
 app.post("/", function(req,res){
    console.log("Ricevuto una richiesta POST");
    // contenuto della richiesta
    res.send(req.body);
  });


 // errore 404
 app.use(function(req,res){
    res.status(404).send('ERRORE!');
 });

 // avvio del server sulla porta 3000 
 app.listen(3000, function () {
    console.log('server in ascolto sulla porta 3000.');
 });
 
// ricezione messaggi UDP
 socket.bind(3001); 
