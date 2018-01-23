  function getvalues(Uname){
		  $.ajax({

				method: "GET",
				url: "http://localhost:8080/Tracktivity/api/users/"+Uname,
			})
				.done(function (data) {

					 $.each(data, function(i, obj) {	
					    	sessionStorage.setItem("Weight",obj.weight);
					    	sessionStorage.setItem("Height",obj.height);
					    	sessionStorage.setItem("Age",obj.age);
					    	sessionStorage.setItem("Gender",obj.gender);
					    });
				});
	  }
  var user="";

  
$(document).ready(function () {
		
	$("#btnRegister").click(function () {
			
			var name= $("#txtName").val();
			var surname = $("#txtSurname").val();
			var gender = $('input[name=chkGender]:checked').val();
			var age = $("#txtAge").val();
			var height = $("#txtHeight").val();
			var weight = $("#txtWeight").val();
			var username = $("#txtUsername").val();
			var password = $("#txtPassword").val();
			var confirm = $("#txtConfirm").val();
			var email = $("#txtEmail").val();			

			if(name == "" || surname=="" || gender=="" ||age=="" || height=="" || weight=="" ||username=="" || password=="" || confirm=="" || email=="")
				{
				//Error Throw
				alert("Please fill all the required fields");
				}
			if(password!=confirm)
				{
					//Error
					alert("Passwords doesnt Match!!");
				}
			else
			{
				$.ajax({
					method: "POST",
					url: "http://localhost:8080/Tracktivity/api/users",
					data: {
						name: name,
						surname: surname,
						gender: gender,
						age:age,
						height:height,
						weight:weight,
						username:username,
						password:password,
						email:email,
						link:"/"+name.replace(" ","").toLowerCase(),
					}
				})
					.done(function (msg) {
						alert("Foi registado com sucesso!");
					});
			}
			
		}); 
	
	function callPage(pageRefInput) {
        $.ajax({
            url: pageRefInput,
            type: "GET",
            dataType: "text",
            success: function (response) {
                $(".content").html(response);
            },
            error: function (error) {
            },
            completed: function (xhr, status) {
            }
        });
    }
    Initialload = false;
		
		$("#btnLogin").click(function () {
		
			user= $("#form-username").val();
			var pw = $("#form-password").val();
			
			if(user == "" || pw=="" || user==null || pw==null)
				{
				//Error Throw
				alert("Please fill all the required fields");
				}
			else
			{
				$.ajax({
					method: "POST",
					url: "http://localhost:8080/Tracktivity/api/users/auth",
					data: {
						login: user,
						pass: pw,
					}
				})
					.done(function (msg) {
						sessionStorage.setItem("token", msg);
						    alert("Your loggin was a success!!");
						    getvalues(user);
						    if ($("#homebut").is(':visible')) {
						    	$('#homebut').attr('style', 'display:none');
						    } if($('#profileHidden').is(':hidden')) {
						    	$('#profileHidden').removeAttr( 'style' );
						    	$('#logoutbut').removeAttr( 'style' );
						    	$('#logoutbut').attr('style', 'cursor:pointer');

						    }
						    
						    callPage("assets/pages/activities.html");
					        $(".nav-item").removeClass('active');
					        $("#actiItem").addClass('active');

					        

					});
			}
			
		});	
		
	});