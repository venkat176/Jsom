$(document).ready(function(){
  
	initializePeoplePicker('peoplePickerDiv');
	//ExecuteOrDelayUntilScriptLoaded(getItemFromList, "sp.js");
	 	
	$("#Dobid").datepicker({
		maxDate: 0,
		prevText: "Earlier",
		changeMonth: true,
        changeYear: true,
        showAnim: "bounce",
        showOtherMonths: true,                       
	});
	
	$("#Joinid").datepicker({
		 showAnim: "clip",
		 showOtherMonths: true,
	});
	
	$('#FstName').change(function() {	
		$('#LstName').change(function() {
   			 $('#Usernameid').val($('#FstName').val()+" "+$('#LstName').val());
		});
	});

	$("#save").click(function(){
		//alert('btn clicked');
		 var firstname = $('#FstName').val();
            var lastname = $('#LstName').val();
            var employeid = $('#Empid').val();
            var emailid = $('#Emailid').val();
            var phone = $('#Phoneid').val();
            var dob = $('#Dobid').val();
            var joindate = $('#Joinid').val();
            var address = $('#Addressid').val();
            var manager = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan.IsEmpty();
            var isValid = true;
      
      $(".error").remove();
      $(".pherror").remove();
      $(".merror").remove();

      if (firstname.length < 1) {
         $('#FstName').after('<span class="error">This field is required*</span>');
         isValid = false;
      }
      
      
      if (lastname.length < 1) {
          $('#LstName').after('<span class="error">This field is required*</span>');
          isValid = false;
      }
     
      
      if (employeid.length < 1) {
         $('#Empid').after('<span class="error">This field is required*</span>');
         isValid = false;
      }
      
      
      if (emailid.length < 1) {
         $('#Emailid').after('<span class="error">This field is required*</span>');
         isValid = false;
      }
      
              
      if (phone.length < 1) {
        $('#Phoneid').after('<span class="pherror">This field is required*</span>');
        isValid = false;
      }
      
      
      if (dob.length < 1) {
        $('#Dobid').after('<span class="error">This field is required*</span>');
        isValid = false;
      }
      
      if (joindate.length < 1) {
        $('#Joinid').after('<span class="error">This field is required*</span>');
        isValid = false;
      }
      
      if (address.length < 1) {
        $('#Addressid').after('<span class="error">This field is required*</span>');
        isValid = false;
      }
      
      if (manager) {
        $('#peoplePickerDiv').after('<span class="merror">This field is required*</span>');
        isValid = false;
      }
      
       if (firstname.length >1 && !(/^[A-Za-z]+$/.test(firstname))) {
          $('#FstName').after('<span class="error">Please enter valid text in first name</span>');
          isValid = false;
      }			
       if (lastname.length >1 && !(/^[A-Za-z]+$/.test(lastname ))) {
          $('#LstName').after('<span class="error">Please enter valid text in last name</span>');
          isValid = false;
      }
       if (employeid.length >1 && !(/^[A-Za-z0-9]+$/.test(employeid ))) {
          $('#Empid').after('<span class="error">Please enter valid id</span>');
          isValid = false;
      }
       if (emailid.length >1 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid))) {
            $('#Emailid').after('<span class="error">Please enter valid email id</span>');
            isValid = false;
      }	
       if (phone.length >=1 && !(/^\d{10}$/.test(phone))) {
         $('#Phoneid').after('<span class="pherror">Please enter valid phone number</span>');
         isValid = false;
      }
      if(isValid){
         createItem();  		
      } 
				  
	   		 
	});
	
	$("#cancel").click(function(){	
		var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx";
		$(location).attr('href',url);
	 });
	 	
    });
       
    function initializePeoplePicker(peoplePickerElementId) {
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '222px';
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
     }
	
	// Query the picker for user information.
	/*function getUserInfo() {
	    var peoplePicker = this.SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
	    var users = peoplePicker.GetAllUserInfo();
	    /*var userInfo = '';
	    for (var i = 0; i < users.length; i++) {
	        var user = users[i];
	        for (var userProperty in user) { 
	            userInfo += userProperty + ':  ' + user[userProperty] + '<br>';
	        }	*/
	     //    getUserId(users[0].Key);
     // }
      
      
     /* var keys = peoplePicker.GetAllUserKeys();
   		 $('#userKeys').html(keys);
   		  getUserId(users[0].Key);
		}*/

	/*function getUserId(loginName) {
	    var context = new SP.ClientContext.get_current();
	    this.user = context.get_web().ensureUser(loginName);
	    context.load(this.user);
	    context.executeQueryAsync(
	    	 Function.createDelegate(null, ensureUserSuccess), 
	         Function.createDelegate(null, onFail)
   		 );
	}

	function ensureUserSuccess() {
    	//createItem('https://xentechn.sharepoint.com/sites/Registration/Lists','EmployeList',this.user.get_id());
    		 createItem(this.user.get_id());
             //$('#userId').html(this.user.get_id());
           // createItem();
	}
	
	function onFail(sender, args) {
    	alert('Query failed. Error: ' + args.get_message());
	}*/

	 
	function createItem(){
		
			var firstname = $('#FstName').val();
			var lastname = $('#LstName').val();
			var username = $('#Usernameid').val();
			var employeid = $('#Empid').val();
			var emailId = $('#Emailid').val();
			var phone = $('#Phoneid').val();
			var dob =  $('#Dobid').val();
			var joindate = $('#Joinid').val();
			var address = $('#Addressid').val();
			//var manager = $('#peoplePickerDiv').val();
			var status = 'Success';
			
		   var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
		   // Get information about all users.
		   var users = peoplePicker.GetAllUserInfo();
		   var keys = peoplePicker.GetAllUserKeys();
		   var finalusers = new Array();
		   for (var i = 0; i < users.length; i++) {
		      var arryuser = users[i];
		      finalusers.push(SP.FieldUserValue.fromUser(arryuser.Key)); 
		   // alert(arryuser.get_lookupId());
		     console.log(finalusers);
		   }
			
			var listTitle = "employList";
			//get the current client context
			context = SP.ClientContext.get_current();
			var oList = context.get_web().get_lists().getByTitle(listTitle);
			//create a new record
			var itemCreateInfo = new SP.ListItemCreationInformation();
			this.listItem = oList.addItem(itemCreateInfo);
			//set the values      
			
			listItem.set_item('FirstName', firstname);
			listItem.set_item('Last_x0020_Name', lastname);
			listItem.set_item('Title', username);
			listItem.set_item('Employe_x0020_ID', employeid);
			listItem.set_item('Email', emailId);
			listItem.set_item('Phone', phone);
			listItem.set_item('DOB', dob);
			listItem.set_item('Joining_x0020_Date', joindate);
			listItem.set_item('WorkAddress', address);
			//listItem.set_item('Submitstatus',+status);
			listItem.set_item('Employe_x0020_Manager',finalusers);
			
			listItem.update();
			context.load(listItem);
			context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded),Function.createDelegate(this, this.onQueryFailed));
		}
			
        function onQuerySucceeded(){  
  		 //  alert('Item created: ' + listItem.get_id());
  		 var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx";
  		 Swal.fire({
			  icon: 'success',
			  title: 'Good...',
			  text: 'Your item has been successfully Created:)',
			}).then((result) =>{
				$(location).attr('href',url);
			})	
	    }
	    
		function onQueryFailed(sender, args)
	    { 
		   alert('Request failed'+args.get_message()+'\n'+args.get_stackTrace()); 
	    }  
		 
				
	
		