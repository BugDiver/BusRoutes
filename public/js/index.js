var representDirectBuses = function(info){
  if(!info._buses.length){return '<h2>No Direct Buses Available between '+info.from+' and '+info.to+'..!!</h2>'};
  table = ['<h2>Direct Buses</h2><table border="3"><tr><th> Source </th>&nbsp<th> Destination </th>&nbsp<th> Buses </th></tr>',
            '<tr><td> from </td>&nbsp<td> to </td>&nbsp<td> _buses </td></tr>',
            '</table>'].join('').replace(/from|to|_buses/gi,function(key){return info[key]});
  return table;
};

var representAlternateBuses = function(info){
	var table = '<h2>Alternate Buses</h2><table border="3"><tr><th>source</th><th>hub</th><th>buses</th><th>hub</th><th>destination</th><th>buses</th></tr>'
	info.buses.forEach(function(route){
		hub = Object.keys(route)[1];
		table+='<tr><td>'+info.from+'</td><td>'+hub+'</td><td>'+route[info.from].join(', ')+'</td><td>'+hub+'</td><td>'+info.to+'<td>'+route[hub].join(', ')+'</td></tr>'	
	})
	return table+='</table>';	
};	

var getDirectBuses = function(from ,to){
	var info = {from : from ,to : to};
	$.get('directbuses', info ,function(data){
		info['_buses'] = data.join(', ');
		$('.directBuses').html(representDirectBuses(info));
	})
}

var getAlternateBuses = function(from ,to){
	var info = {from : from ,to : to};
	$.get('alternateBuses',info ,function(data){
		info['buses'] = data;
		$('.alternateBuses').html(representAlternateBuses(info));
	})

}

var getAllBuses = function(from ,to){
	var from  = $('#source').find(":selected").val();
	var to  = $('#destination').find(":selected").val();
	if(from == to){
		$('.directBuses').html('<h2>You Are At '+from+'</h2>');
		return;
	}
	getDirectBuses(from ,to);
	getAlternateBuses(from ,to);
}

var onLoad = function(){
	$.get('/allStations',function(data){
		data.forEach(function(station){
			$('#source').append('<option value="'+station+'">'+station+'</option>')
			$('#destination').append('<option value="'+station+'">'+station+'</option>')
		})
	});
	$('.input>button').click(getAllBuses);
}


$(onLoad);