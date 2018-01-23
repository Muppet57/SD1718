$(document).ready(function () {
	

    var Initialload = true;
    $.backstretch("assets/img/backgrounds/2.png");

    if (Initialload == true) {
        $.ajax({
            url: "assets/pages/home.html",
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
    
    $('#btnSearchHome').on('click', function () {
		var param = $("#inQuery").val()
		var flag=false;
		var url = "http://localhost:8080/Tracktivity/api/activities";
		var jqxhr = $.get(url, function () {
		})
			.done(function (data) {
				
				$(".content").html("<div class='table-responsive'><table class='table form-group' id='tblActivity'></div>");
				var trTemp = "";
				trTemp += "<tr><th colspan='6' style='text-align: center;'><h1 style='color:white'><strong>Activities</strong></h1></th></tr>";
				trTemp += "<tr><th style='text-align: center;'>Intensity</th><th style='text-align: center;'>Name</th><th style='text-align: center;'>Description</th><th style='text-align: center;'>MET</th><th style='text-align: center;'>Average/hour</th></tr>";
				$("#tblActivity").append(trTemp);

				$.each(data, function (i, obj) {
					
					param=param.toString().toLowerCase();
					
					if (obj.name.toString().toLowerCase().indexOf(param)!= -1 || obj.description.toString().toLowerCase().indexOf(param) != -1
						|| obj.met.toString().indexOf(param) != -1 || obj.calories.toString().indexOf(param) != -1 
						|| obj.intensity.toString().toLowerCase().indexOf(param) != -1) {
						trTemp = "<tr><td>" + obj.intensity + "</td><td>" +
						obj.name + "</td><td>" +
						obj.description + "</td><td>" +
						obj.met + "</td><td>" +
						obj.calories + "</td></tr>"
						flag=true;
					$("#tblActivity").append(trTemp);
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
    
    // Click para chamar pagina
    $('.single').on('click', function (e) {
        e.preventDefault();
        var pageRef = $(this).attr('href');
        $(".nav-item").removeClass('active');

        $(this).parent().addClass('active');
        callPage(pageRef)
    });
    
    $('.single2').on('click', function (e) {
    	sessionStorage.clear();
        e.preventDefault();
        $(".nav-item").removeClass('active');
        $("#homebut").parent().addClass('active');
        
        if ($("#homebut").is(':hidden')) {
	    	$('#homebut').removeAttr('style');
	    } if($('#profileHidden').is(':visible')) {
	    	$('#profileHidden').attr( 'style','display:none' );
	    	$('#logoutbut').attr( 'style' ,'display:none');
	    }
	    alert("Your session was ended.");
        callPage("assets/pages/home.html")
    });
    
    //Load Pages
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
});