let userIdData = document.getElementById("userId");

let data = JSON.parse(localStorage.getItem("datauser"));

userIdData.textContent = data[0].email;
