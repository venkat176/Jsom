$(document).ready(function(){
        
    initializePeoplePicker('peoplePickerDiv');
        
    retrieveListItems();
    
   $("#Dobid").datepicker({		
      maxDate: 0,
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
  
  

  $("#cancel").click(function(){	
      var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx";
      $(location).attr('href',url); 
   });
 
  $('#Update').click(function(){
       
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
         updateListItem(); 
         var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx";
  		   Swal.fire({
			  icon: 'success',
			  title: 'Good...',
			  text: 'Your item has been successfully Updated:)',
			}).then((result) =>{
				$(location).attr('href',url);
			})  		
      } 
      //alert('click');      
     }); 
      
     $('#delete').click(function(){
       //alert('Working');
       
       var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx";
       
       const swalWithBootstrapButtons = Swal.mixin({
			  customClass: {
			    confirmButton: 'btn btn-success',
			    cancelButton: 'btn btn-danger'
			  },
			  buttonsStyling: false
			 })
			
			swalWithBootstrapButtons.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Yes, delete it!',
			  cancelButtonText: 'No, cancel!',
			  reverseButtons: true
			}).then((result) => {
			  if (result.value) {
			   deleteListItem();
			    swalWithBootstrapButtons.fire(
			      'Deleted!',
			      'Your file has been deleted.',
			      'success'
			    ).then((result) => {
			      $(location).attr('href',url)
			      }) 
			  } else if (
			    /* Read more about handling dismissals below */
			    result.dismiss === Swal.DismissReason.cancel
			  ) {
			    swalWithBootstrapButtons.fire(
			      'Cancelled',
			      'Your imaginary file is safe :)',
			      'error'
			    )
			  }
			})   
       });      

	});		

     var urlBase = window.location.href.split('&')[0];
     var urlId = urlBase.substring(urlBase.lastIndexOf('=') + 1); 
     var url = "https://xentechn.sharepoint.com/sites/Registration/Lists/employList/AllItems.aspx"; 
     
	 function initializePeoplePicker(peoplePickerElementId) {
        var schema = {};
        schema['PrincipalAccountType'] = 'User,DL,SecGroup,SPGroup';
        schema['SearchPrincipalSource'] = 15;
        schema['ResolvePrincipalSource'] = 15;
        schema['AllowMultipleValues'] = true;
        schema['MaximumEntitySuggestions'] = 50;
        schema['Width'] = '240px';
        this.SPClientPeoplePicker_InitStandaloneControlWrapper(peoplePickerElementId, null, schema);
     }
       
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
    	 retrieveListItems(this.user.get_id());
   	}
	
	function onFail(sender, args) {
    	alert('Query failed. Error: ' + args.get_message());
	}

		 
     function updateListItem()  
           {  
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
		    var user = new Array();
		    for (var i = 0; i < users.length; i++) {
		      var arryuser = users[i];
		      console.log(arryuser);
		      user.push(SP.FieldUserValue.fromUser(arryuser.Key)); 
			}
			var listTitle = "employList";
			//get the current client context
			context = SP.ClientContext.get_current();
			var oList = context.get_web().get_lists().getByTitle(listTitle);
			listItem = oList.getItemById(urlId);
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
			listItem.set_item('Employe_x0020_Manager',user);	
			listItem.update();
			context.load(listItem);
			context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded),Function.createDelegate(this, this.onQueryFailed));
		}
			
        function onQuerySucceeded(){  
  		   //alert('Item created: ');
  		   	
	     }
	    
		function onQueryFailed(sender, args)
	    { 
		   alert('Request failed'+args.get_message()+'\n'+args.get_stackTrace()); 
	    }    
       
     function deleteListItem()  
        {       
		  var clientContext = new SP.ClientContext.get_current();
		  var list = clientContext.get_web().get_lists().getByTitle('employList');
		  var listItem = list.getItemById(urlId);
		  listItem.deleteObject();
		  clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded),Function.createDelegate(this, this.onQueryFailed));
        }

		function onQuerySucceeded() {
		  //alert('Item deleted');
		  $(location).attr('href',url);
		}
		
		function onQueryFailed(sender, args) {
		  alert('Could not able to delete item: ' + args.get_message());
		} 
       
          
       function getActualDate(dateValue) {
          var newDate= new Date(dateValue);
          var day = newDate.getDate();
          var month = newDate.getMonth()+1;
          var year = newDate.getFullYear();
          return month+"-"+day+"-"+year;
         }
        
       function retrieveListItems(userId) {
			var clientContext = new SP.ClientContext.get_current();
			var oList = clientContext.get_web().get_lists().getByTitle('employList');
			var camlQuery = new SP.CamlQuery();
			camlQuery.set_viewXml("<View><Query><Where>"+"<Eq>"+"<FieldRef Name='ID'/>"+"<Value Type='Number'>"+urlId+"</Value>"+"</Eq>"+"<FieldRef Name='Employe_x0020_Manager'/>"+"<Value Type='Number'>sd</Value>"+"</Where></Query></View>");
			collListItem = oList.getItems(camlQuery);
			clientContext.load(collListItem);
			clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded),Function.createDelegate(this, this.onQueryFailed));
		
			
		}

	   function onQuerySucceeded(data,sender, args) {
		
				console.log(data);
				var clientContext = new SP.ClientContext.get_current();					
				var context = SP.ClientContext.get_current();
		      			
				
				var listItemEnumerator = collListItem.getEnumerator();
				while (listItemEnumerator.moveNext()) {
					 //var userName = collListItem.get_item("Employe_x0020_Manager").get_lookupValue();
	             	// var user = clientContext.get_web().ensureUser(userName);
				     var oListItem = listItemEnumerator.get_current();
				     console.log(oListItem);
				     
				    /*var web = clientContext.get_web();
			        var userName = collListItem.get_item("Employe_x0020_Manager").get_lookupValue();
			        var user = web.ensureUser(userName);
			        var email = user.get_email();
			 	    var loginName = user.get_loginName();*/
				     
				     var firstname = oListItem.get_item("FirstName");
					 var lastname = oListItem.get_item("Last_x0020_Name");
			 		 var username = oListItem.get_item("Title");
				     var employeid = oListItem.get_item("Employe_x0020_ID");
					 var emailId = oListItem.get_item("Email");
					 var phone = oListItem.get_item("Phone");
					 var dob =  getActualDate(oListItem.get_item("DOB"));
					 var joindate = getActualDate(oListItem.get_item("Joining_x0020_Date"));
	      	         var address = oListItem.get_item("WorkAddress");
	      	         var people = oListItem.get_item("Employe_x0020_Manager");
	      	         
	      	         
	      	        // var people = oListItem.get_item("Employe_x0020_Manager").get_lookupValue();
	      	         //var user = web.ensureUser(people);
	      	         /* for(var i = 0;i < people.length;i++) 
				        {
				      
				         var lookId = people[i].get_lookupId(); 
				         var lookName = people[i].get_lookupValue(); 
				        
				        //var email = user.get_email();
				 	    //var loginName = user.get_loginName();

				         }*/
					    // console.log(lookName);
					     
					    var pp = []; 
					     
					    if (oListItem.get_item('Employe_x0020_Manager') != null) {
					    for(var i = 0;i < people.length;i++) 
				        {
				      		var requestorUser = oListItem.get_item('Employe_x0020_Manager')[i].get_lookupValue();
				      		var loginId = oListItem.get_item('Employe_x0020_Manager')[i].get_lookupId();
				      		pp.push(requestorUser);
				      				         
				         }
							
				    
				    $(".sp - peoplepicker - delImage").css({ 'display': 'none' });
				
				    if (requestorUser != null && requestorUser != undefined && requestorUser != "")
				    {
				       // var form = $("div[id ='peoplePickerDiv']");
				        //var userField = $("input[id$='peoplepicker_TopSpan_EditorInput']").get(0);
						//var peoplepicker = SPClientPeoplePicker.PickerObjectFromSubElement(userField);
						
						var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict.peoplePickerDiv_TopSpan;
						//var usrObj = { 'Key': loginId };
						//peoplePicker.AddUnresolvedUser(usrObj,true); 
				        //var userField = form.find("input[id$ ='divPeoplePicker_TopSpan_HiddenInput']").get(0);
				        //var peoplepicker = SPClientPeoplePicker.PickerObjectFromSubElement(userField);
				        for(var i = 0; i < pp.length; i++){
				       			peoplePicker.AddUserKeys(pp[i]);
				        }
				    }
				  }
					
					     
					/*var userField = $("input[id$='peoplePickerDiv']").get(0); // simplified user control search, real word scenario, first search proper row in your form
					 var peoplepicker = SPClientPeoplePicker.PickerObjectFromSubElement(userField);
					 peoplepicker.AddUserKeys("Employe_x0020_Manager"); // or display name*/
					// peoplepicker.AddUserKeys("Login2");
					
					
									
	      	        //var columnFieldValue = oListItem.get_item("columnName");
	      	        /* var value = SP.FieldLookupValue.get_lookupValue();
					 var lookupValue = people.get_lookupValue();
					 console.log(lookupValue);
					 var lookupId = people.get_lookupId();
	      	         console.log(lookupValue);*/
	      	         //var people=$("#peoplePickerDiv").find("div[role='TextBox']").text();
	      	         //var people="testUser";
	      	         //var people=$("#peoplePickerDiv").find("div[role='TextBox']").text();
	      	        // var value = SP.FieldUserValue.fromUser(people);	
	      	   			  
			   }				
						  
			        $('#FstName').val(firstname);
					$('#LstName').val(lastname);
					$('#Usernameid').val(username);
					$('#Empid').val(employeid);
					$('#Emailid').val(emailId);
					$('#Phoneid').val(phone);
					$('#Dobid').val(dob);
					$('#Joinid').val(joindate);
					$('#Addressid').val(address);
					//$("#peoplePickerDiv").find("div[role='TextBox']").text(lookName);
					//$('#peoplePickerDiv').val(lookName);
					
					
					
					
			  }
			
	    function onQueryFailed(sender, args) {
				alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
			}
			
       