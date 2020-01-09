$(document).ready(function(){	
  
        getData();
       
$('#Approved').click(function(){
         updateApprove();
});   

$('#Rejected').click(function(){
        updateReject();
});
        
$("#Exit").click(function(){	
    var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx";
    $(location).attr('href',url);
   });
});    
     
     
    function getUserInfo() {
	    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
	    var users = peoplePicker.GetAllUserInfo();
	      getUserId(users[0].Key);
     }
      
      
    
	function getUserId(loginName) {
	    var context = new SP.ClientContext.get_current();
	    this.user = context.get_web().ensureUser(loginName);
	    context.load(this.user);
	    context.executeQueryAsync(
	    	 Function.createDelegate(null, ensureUserSuccess), 
	         Function.createDelegate(null, onFail)
   		 );
	}

	function ensureUserSuccess() {
    	 getData(this.user.get_id());
   	}
	
	function onFail(sender, args) {
    	alert('Query failed. Error: ' + args.get_message());
	}

     
	function getActualDate(dateValue) {
	   var newDate= new Date(dateValue);
	   var day = newDate.getDate();
	   var month = newDate.getMonth()+1;
	   var year = newDate.getFullYear();
	   //return month + "-" + day  + "-" + year;
	   return month+"-"+day+"-"+year;
	}
	   
	var urlBase = window.location.href.split('&')[0];
	var urlId = urlBase.substring(urlBase.lastIndexOf('=') + 1); 

function getData(userId){  
           
          var clientContext = new SP.ClientContext.get_current();
			var oList = clientContext.get_web().get_lists().getByTitle('employList');
			var camlQuery = new SP.CamlQuery();
			camlQuery.set_viewXml("<View><Query><Where>"+"<Eq>"+"<FieldRef Name='ID' />"+"<Value Type='Number'>"+urlId+"</Value>"+"</Eq>"+"</Where></Query></View>");
			this.collListItem = oList.getItems(camlQuery);
			clientContext.load(collListItem);
			clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded),Function.createDelegate(this, this.onQueryFailed));
		}

	   function onQuerySucceeded(data,sender, args) {
		
				console.log(data);
				var listItemInfo = '';
				var listItemEnumerator = collListItem.getEnumerator();
				while (listItemEnumerator.moveNext()) {
				     var oListItem = listItemEnumerator.get_current();
				     var firstname = oListItem.get_item("FirstName");
					 var lastname = oListItem.get_item("Last_x0020_Name");
			 		 var username = oListItem.get_item("Title");
				     var employeid = oListItem.get_item("Employe_x0020_ID");
					 var emailId = oListItem.get_item("Email");
					 var phone = oListItem.get_item("Phone");
					 var dob =  getActualDate(oListItem.get_item("DOB"));
					 var joindate = getActualDate(oListItem.get_item("Joining_x0020_Date"));
	      	         var address = oListItem.get_item("WorkAddress");
	      	         var manager = oListItem.get_item("Employe_x0020_Manager");
	      	         var pp=[];
	      	         for(var i=0; i<manager.length; i++){
	      	         		var people =manager[i].get_lookupValue()+" ";
							//var people1 = manager[i].get_lookupValue();
							pp.push(people);
						}
						
				// listItemInfo += 
			  }
			        $('#FstName').val(firstname);
					$('#LstName').val(lastname);
					$('#Usernameid').val(username);
					$('#Empid').val(employeid);
					$('#Emailid').val(emailId);
					$('#Phoneid').text(phone);
					$('#Dobid').val(dob);
					$('#Joinid').val(joindate);
					$('#Addressid').text(address);
					$('#peoplePickerElementId').text(pp);
			  }
			
	    function onQueryFailed(sender, args) {
				alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
			}
 
     

