$(document).ready(function() { 
	$(document).on("keypress", function (e) {
        if (e.which == 13) 
        {
            AjaxPost();
            return false;
        }
    });
	$(document).on("click", "#SendMassage", function(){
		AjaxPost();
        return false;
	});
	function AjaxPost()
	{
		$.ajax({            
        type: 'POST', 
        url: 'suc/sucAPI', 
        data: JSON.stringify({ text: $(".footer").val()}),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (data) 
                {   
                    $("div.myScroll").empty();
                    var _div = document.getElementsByClassName("myScroll")[0];
                    var fragment = document.createDocumentFragment();
                    $.each(data, function(index, element) 
                    {
                         var _p = document.createElement('p');
                        
                        var _spanDate = document.createElement('span');
                        _spanDate.className = "dateClass";
                        _spanDate.innerText = element.date + " ";
                        _p.appendChild(_spanDate);
                        
                        var _spanUser = document.createElement('span');
                        _spanUser.className = "userClass";
                        _spanUser.innerText = element.username + ": ";
                        _p.appendChild(_spanUser);
                        
                        var _spanText = document.createElement('span');
                        _spanText.className = "textClass";
                        _spanText.innerText = element.text;
                        _p.appendChild(_spanText);
                        
                        fragment.appendChild(_p)
                    });
                    _div.appendChild(fragment);
                }
        });
        $(".footer").val("");
	}
	function sendAjaxGet() {
        $.ajax({            
        type: 'GET', 
        url: 'suc/sucAPI', 
        dataType: 'json',
        success: function (data)
		{
			$("div.myScroll").empty();
			var _div = document.getElementsByClassName("myScroll")[0];
			var fragment = document.createDocumentFragment();
			$.each(data, function(index, element) 
			{
				var _p = document.createElement('p');
				
				var _spanDate = document.createElement('span');
				_spanDate.className = "dateClass";
				_spanDate.innerText = element.date + " ";
				_p.appendChild(_spanDate);
				
				var _spanUser = document.createElement('span');
				_spanUser.className = "userClass";
				_spanUser.innerText = element.username + ": ";
				_p.appendChild(_spanUser);
				
				var _spanText = document.createElement('span');
				_spanText.className = "textClass";
				_spanText.innerText = element.text;
				_p.appendChild(_spanText);
				
				fragment.appendChild(_p)
			});
			_div.appendChild(fragment);
		}
		})
	}
	sendAjaxGet();
	setInterval(sendAjaxGet, 5000);
})