// const { createApp } = Vue

// createApp({
//   data() {
//     return {
//       message: 'Hello Vue!'
//     }
//   },
//   template: "<h1>prekl</h1>"
// }).mount('#app')

function loginAdmin() {
  const adminLogin = document.getElementById("adminLogin").value;
  const adminPassword = document.getElementById("adminPassword").value;

  const xhttp = new XMLHttpRequest();
  // xhttp.open("POST", "https://snt-electronics.herokuapp.com/auth/admins/login");
  xhttp.open("POST", `${process.env.API_ENDPOINT}/auth/admins/login`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "login": adminLogin,
    "password": adminPassword
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects['success'] == true) {
        console.log(objects['message'])
        document.cookie = "token=" + objects['token'];
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './home';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
}

function registerAdmin() {
  const adminLogin = document.getElementById("adminLogin").value;
  const adminPassword = document.getElementById("adminPassword").value;

  const xhttp = new XMLHttpRequest();
  // xhttp.open("POST", "https://snt-electronics.herokuapp.com/auth/admins/register");
  xhttp.open("POST", `${process.env.API_ENDPOINT}/auth/admins/register`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "login": adminLogin,
    "password": adminPassword
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects['success'] == true) {
        console.log(objects['message'])
        document.cookie = "token=" + objects['token'];
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './admin-login';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
}
