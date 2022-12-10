let text1holder = document.getElementById("text1holder");
let text2holder = document.getElementById("text2holder");
let text1input = document.getElementById("text1input");
let text2input = document.getElementById("text2input");

let pass1holder = document.getElementById("pass1holder");
let pass2holder = document.getElementById("pass2holder");
let pass1input = document.getElementById("pass1input");
let pass2input = document.getElementById("pass2input");

let form = document.getElementById("form");
let errMessage = document.getElementById("errMessage");

let username = "";
let email = "";
let password = "";
let passwordConfirm = "";

let confirmUsername = false;
let confirmEmail = false;
let confirmPassword = false;
let confirmPasswordConfirm = false;

// username validation

let regExpSympols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

let usernameError = document.createElement("small");
usernameError.className = "userError";
usernameError.textContent = "";
text1holder.append(usernameError);

text1input.onblur = function (e) {
  username = e.target.value;
  regExpSympols.test(username)
    ? (usernameError.textContent =
        "username must contain only alphanumeric characters")
    : username.length < 5 || username.length > 15
    ? (usernameError.textContent =
        "username must be less than 15 and more than 5 characters")
    : /^\d/.test(username) == true
    ? (usernameError.textContent = "username must start with characters")
    : ((confirmUsername = true), (usernameError.textContent = ""));
};

// email validation

let emailError = document.createElement("small");
emailError.className = "userError";
emailError.textContent = "";
text2holder.append(emailError);

text2input.onblur = function (e) {
  email = e.target.value;
  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
    ? ((confirmEmail = true), (emailError.textContent = ""))
    : (emailError.textContent = "Email must be in a valid format");
};

// password validation

let passError = document.createElement("small");
passError.className = "userError";
passError.textContent = "";
pass1holder.append(passError);

pass1input.onblur = function (e) {
  password = e.target.value;
  password.length >= 8
    ? ((confirmPassword = true), (passError.textContent = ""))
    : ((passError.textContent = "Password must be at least 8 characters"),
      (confirmPassword = false));
};

//confirm password validation

let conPassError = document.createElement("small");
conPassError.className = "userError";
conPassError.textContent = "";
pass2holder.append(conPassError);

pass2input.onblur = function (e) {
  passwordConfirm = e.target.value;
  passwordConfirm == password
    ? ((confirmPasswordConfirm = true), (conPassError.textContent = ""))
    : ((confirmPasswordConfirm = false),
      (conPassError.textContent = "password is not identical"));
};

// submit & post data

form.onsubmit = function (e) {
  e.preventDefault();
  if (
    confirmUsername &&
    confirmEmail &&
    confirmPassword &&
    confirmPasswordConfirm
  ) {
    let payload = {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
    };

    fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.message
          ? (errMessage.textContent = data.message + data.errors.password[0])
          : (errMessage.textContent = "");
        let userData = [
          { username: data.username, email: data.email, id: data.id },
        ];
        localStorage.setItem("datauser", JSON.stringify(userData));
      })
      .then(() => (location.href = "./succeed.html"));
  }
};
