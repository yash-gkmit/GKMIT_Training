


//  Dependency Inversion Principle

// Instead of directly referencing a specific data storage implementation in your application logic, rely on an abstract DataStore interface. 

// Before (Violates DIP):

class EmailController { 
  sendEmail(emailDetails) { 
   
   	 // Need to change this line in every controller that uses YahooAPI.const response = YahooAPI.sendEmail(emailDetails); 

    if (response.status == 200) { 
       return true;
    } else {
       return false;
    }
  }
}



// After (DIP Applied):

class EmailController { 
  sendEmail(emailDetails) { 
    const response = EmailApiController.sendEmail(emailDetails);   
    if (response.status == 200) { 
       return true;
    } else {
       return false;
    }
  }
}

class EmailApiController {
  sendEmail(emailDetails) {
    // Only need to change this controller. return YahooAPI.sendEmail(emailDetails);
  }
}



