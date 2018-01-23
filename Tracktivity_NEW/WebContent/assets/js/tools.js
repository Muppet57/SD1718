	$(document).ready(function () {
		//Listar Atividades
		$('#btnSearchTools').on('click', function () {
			var intensity = $("#sltIntTools").val();
			var url = "";
			if (intensity == "all")
				url = "http://localhost:8080/Tracktivity/api/activities";
			else
				url = "http://localhost:8080/Tracktivity/api/activities?intensity=" + intensity;
			var jqxhr = $.get(url, function () {

			})
				.done(function (data) {
					$("#tblActivities").empty();
					var trTemp = "";
					trTemp += "<tr><th colspan='6' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
					trTemp += "<tr><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Calories</th><th style='text-align: center;'>Link</th></tr>";
					$("#tblActivities").append(trTemp);

					$.each(data, function (i, obj) {
						trTemp = "<tr><td>" + obj.name + "</td><td>" +
							obj.description + "</td><td>" +
							obj.intensity + "</td><td>" +
							obj.met + "</td><td>" +
							obj.calories + "</td><td>" +
							obj.link + "</td></tr>";
						$("#tblActivities").append(trTemp);
					});

				})
				.fail(function () {
					alert("error");
				});
		});

		// Inserir Atividade
		$("#btnInsertTools").click(function () {
			var myToken;
			if(sessionStorage.token == null) {
				myToken = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJUcmFja3Rpdml0eSIsImxvZ2luIjoiaW52YWxpZCJ9.gyjQii-0p1WTJl31yzgjmIvnT1XVUowGagPe2kh3Ros";
			} else {
				myToken = sessionStorage.token;
			}
			
				$.ajax({
				method: "POST",
				url: "http://localhost:8080/Tracktivity/api/activities",
				data: {
					name: $("#txtName").val(),
					description: $("#txtDesc").val(),
					intensity: $("#sltIntForm").val(),
					met: $("#nbMet").val(),
					calories: $("#nbCalories").val(),
					link: "/" + $("#txtName").val().replace(" ",""),
					token: myToken,
				}
			})
				.done(function (msg) {
					$('#btnSearchTools').click()
					alert("Activity added!");
				})
				
				.fail(function () {
					alert("The name of the activity you were trying to add already exists or you don't have enough privileges to access this feature.");
				});
		});


		// Remover Atividade
		$("#btnRemoveTools").click(function () {
			var myToken;
			if(sessionStorage.token == null) {
				myToken = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJUcmFja3Rpdml0eSIsImxvZ2luIjoiaW52YWxpZCJ9.gyjQii-0p1WTJl31yzgjmIvnT1XVUowGagPe2kh3Ros";
			} else {
				myToken = sessionStorage.token;
			}
			$.ajax({
				method: "DELETE",
				url: "http://localhost:8080/Tracktivity/api/activities/" + $("#txtName").val(),
				data:{
					token:myToken,
				}
			})
				.done(function (msg) {
					$('#btnSearchTools').click()
					alert("Activity removed!");
				})
				
			.fail(function (e) {
				alert("The activity you were trying to delete doesn't exist, check the available activities and try again, or you don't have enough privileges to access this feature.");
			});
		});
	})