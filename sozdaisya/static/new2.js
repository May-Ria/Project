function checkParams() {
    var Login = $('#Login').val();
    var Password = $('#Password').val();
    
    if(Login.length != 0 && Password.length != 0) {
        $('#submitButton').removeAttr('disabled');
    } else {
        $('#submitButton').attr('disabled', 'disabled');
    }
}
function CheckPassword(inputtxt)  
           {  
				var passw = "SCOTT13227"; 
				var logi = "May_Ria";
				var pasCode = document.getElementById("Password");
				var log = document.getElementById("Login");
				
				if((pasCode.value == passw)&&(log.value == logi))
				{  
					window.location.href="/suc";
				} 
				else 
				{	
                    $('#myModalBox').modal({show:true});                   				
					return true; 
				} 
			}