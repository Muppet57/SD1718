$(document).ready(function () {
	
	var Initialload = true;
	
	var userWeight = sessionStorage.getItem("Weight");
	var userHeight = sessionStorage.getItem('Height');
	var userAge = sessionStorage.getItem('Age');
	var gender = sessionStorage.getItem('Gender');
	
	var bmrMale = 5 + (10 * userWeight) + (6.25 * userHeight) - (5 * userAge);
	var bmrFemale = 161 - (10 * userWeight) + (6.25 * userHeight) - (5 * userAge);
	var burnCalories = 0;
	var time=0;

	
	
	//Load inicial da tabela - Todas as atividades
	if (Initialload == true) {
		url = "http://localhost:8080/Tracktivity/api/activities/xml";
		var jqxhr = $.get(url, function () {

		})
			.done(function (data) {
				console.log(data);
				console.log("Doc xml = " +data);
				var xmlDoc = $.parseXML(data);
				var $xml = $(xmlDoc).find("activity");
				
				
				console.log($xml.text());
			/*
			 * $("#tblActivityAPI").empty(); var trTemp = ""; trTemp += "<tr><th colspan='8' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
			 * trTemp += "<tr><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Average/hour</th><th style='text-align: center;'>Time</th><th style='text-align: center;'>Spent</th><th style='text-align: center;'>Add
			 * Workout</th></tr>"; $("#tblActivityAPI").append(trTemp);
			 * 
			 * var xmlDoc = $.parseXML(data); var $xml = $(xmlDoc);
			 * console.log(data); $xml.find("activity").each(function(){ var
			 * intensity = $(this).attr("intensity"); var link =
			 * $(this).attr("link"); var calories =
			 * $(this).find("calories").text(); var met =
			 * $(this).find("met").text(); var name =
			 * $(this).find("name").text(); var description =
			 * $(this).find("description").text(); trTemp = "<tr><td>" +
			 * intensity + "</td><td>" + name + "</td><td>" +
			 * obj.description + "</td><td>" + met + "</td><td>" +
			 * calories + "</td><td>" + "<input type='number'
			 * style='width:100px'/ placeholder='1,30...' id='timeactivity'>" + "</td><td>" + "<p id='burntcal'>0</p>"+"</td><td>" + "<button
			 * class='btn btn-success' id='addcal'>+</button>" + "</td></tr>";
			 * $("#tblActivityAPI").append(trTemp); });
			 */
				
				/*
				 * $("#tblActivityAPI").empty(); var trTemp = ""; trTemp += "<tr><th colspan='8' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
				 * trTemp += "<tr><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Average/hour</th><th style='text-align: center;'>Time</th><th style='text-align: center;'>Spent</th><th style='text-align: center;'>Add
				 * Workout</th></tr>"; $("#tblActivityAPI").append(trTemp);
				 * $.each(data, function (i, obj) {
				 * 
				 * trTemp = "<tr><td>" + obj.intensity + "</td><td>" +
				 * obj.name + "</td><td>" + obj.description + "</td><td>" +
				 * obj.met + "</td><td>" + obj.calories + "</td><td>" + "<input
				 * type='number' style='width:100px'/ placeholder='1,30...'
				 * id='timeactivity'>" + "</td><td>" + "<p id='burntcal'>0</p>"+"</td><td>" + "<button
				 * class='btn btn-success' id='addcal'>+</button>" + "</td></tr>";
				 * $("#tblActivityAPI").append(trTemp); });
				 */

			},'xml')
			.fail(function () {
				alert("error");
			});
		
		url = "http://localhost:8080/Tracktivity/api/activities";
		var jqxhr = $.get(url, function () {
		})
			.done(function (data) {
				$("#tblActivityAPI").empty();
				var trTemp = "";
				trTemp += "<tr><th colspan='8' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
				trTemp += "<tr><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Average/hour</th><th style='text-align: center;'>Time</th><th style='text-align: center;'>Spent</th><th style='text-align: center;'>Add Workout</th></tr>";
				$("#tblActivityAPI").append(trTemp);

				$.each(data, function (i, obj) {

					trTemp = "<tr><td>" + obj.intensity + "</td><td>" +
					obj.name + "</td><td>" +
					obj.description + "</td><td>" +
					obj.met + "</td><td>" +
					obj.calories + "</td><td>" +
					"<input type='number' style='width:100px'/ placeholder='1,30...' id='timeactivity'>" + "</td><td>" +
					"<p id='burntcal'>0</p>"+"</td><td>" +
					"<button class='btn btn-success' id='addcal'>+</button>" +
					"</td></tr>";
				$("#tblActivityAPI").append(trTemp);
				});

			})
			.fail(function () {
				alert("error");
			});
	}
	
	$('.content').on('click','#timeactivity', function() { 
		
		var met = $(this).closest('tr').find('td').eq(3).text();
		var time = $(this).val();
		if (gender=="male")
			{
				burnedCalories= Math.round((bmrMale/24)*time*met);
				$(this).closest('tr').find('td').eq(6).text(burnedCalories);
			}
		else{
			burnedCalories= Math.round((bmrFemale/24)*time*met);
			$(this).closest('tr').find('td').eq(6).text(burnedCalories);
		}
		
			
	});
	
	$('.content').on('click','#addcal', function() { 
		if(sessionStorage['burn'])
			{
			var currentval = sessionStorage.burn;
			currentval=parseInt(currentval)+parseInt($(this).closest('tr').find('td').eq(6).text());
			sessionStorage.setItem("burn",currentval);
			  
			}
		else{
			 sessionStorage.setItem("burn",$(this).closest('tr').find('td').eq(6).text());
		}
		$("#valcal").text("");
		$("#valcal").text("Calories Burned : "+sessionStorage.getItem('burn'));
		$("#valcal2").text("");
		$("#valcal2").text("Calories Burned : "+sessionStorage.getItem('burn'));
	});
	
	$('#btnFilter').on('click', function () {
		var intensity = $("#sltIntActi").val();
		var url = "";
		if (intensity == "all")
			url = "http://localhost:8080/Tracktivity/api/activities";
		else
			url = "http://localhost:8080/Tracktivity/api/activities?intensity=" + intensity;
		var jqxhr = $.get(url, function () {


		})
			.done(function (data) {
				$("#tblActivityAPI").empty();
				var trTemp = "";
				trTemp += "<tr><th colspan='8' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
				trTemp += "<tr><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Average/hour</th><th style='text-align: center;'>Time</th><th style='text-align: center;'>Spent</th><th style='text-align: center;'>Add Workout</th></tr>";
				$("#tblActivityAPI").append(trTemp);

				$.each(data, function (i, obj) {

					trTemp = "<tr><td>" + obj.intensity + "</td><td>" +
					obj.name + "</td><td>" +
					obj.description + "</td><td>" +
					obj.met + "</td><td>" +
					obj.calories + "</td><td>" +
					"<input type='number' style='width:100px'/ placeholder='1,30...' id='timeactivity'>" + "</td><td>" +
					"<p id='burntcal'>0</p>"+"</td><td>" +
					"<button class='btn btn-success' id='addcal'>+</button>" +
					"</td></tr>";
				$("#tblActivityAPI").append(trTemp);
				});

			})
			.fail(function () {
				alert("error");
			});
	});

	//Devolve atividades que contêm a palavra chave
	$('#btnSearchActi').on('click', function () {
		var param = $("#inQuery2").val()
						var flag=false;

		var url = "http://localhost:8080/Tracktivity/api/activities";
		var jqxhr = $.get(url, function () {

		})
			.done(function (data) {
				$("#tblActivityAPI").empty();
				
				var trTemp = "";
				trTemp += "<tr><th colspan='8' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
				trTemp += "<tr><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Average/hour</th><th style='text-align: center;'>Time</th><th style='text-align: center;'>Spent</th><th style='text-align: center;'>Add Workout</th></tr>";
				$("#tblActivityAPI").append(trTemp);
				$.each(data, function (i, obj) {
					param=param.toString().toLowerCase();

					if (obj.name.toString().toLowerCase().indexOf(param)!= -1 || obj.description.toString().toLowerCase().indexOf(param) != -1
							|| obj.met.toString().indexOf(param) != -1 || obj.calories.toString().indexOf(param) != -1 
							|| obj.intensity.toString().toLowerCase().indexOf(param) != -1) {

						trTemp = "<tr><td>" + obj.intensity + "</td><td>" +
						obj.name + "</td><td>" +
						obj.description + "</td><td>" +
						obj.met + "</td><td>" +
						obj.calories + "</td><td>" +
						"<input type='number' style='width:100px'/ placeholder='1,30...' id='timeactivity'>" + "</td><td>" +
						"<p id='burntcal'>0</p>"+"</td><td>" +
						"<button class='btn btn-success' id='addcal'>+</button>" +
						"</td></tr>";
						flag=true;

					$("#tblActivityAPI").append(trTemp);
					}
				});
				if(flag==false){
					alert("Sorry! There are no results matching your query. Try again =) ");
				}

			})
			.fail(function () {
				alert("error");
			});
	});

	Initialload = false;
})