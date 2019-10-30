import Storage from '../app/storage';

function dashboardAction() {
    return API.post("/dashboard", {},{
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': Storage.getUser()
      }
    });
  }