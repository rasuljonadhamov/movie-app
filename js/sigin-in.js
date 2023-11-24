const name = document.getElementById("name");
const persons = document.getElementById("persons");
const age = document.getElementById("age");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
const form = document.getElementById("form-wrapper");

// functions
function checkValues() {
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  ValidateEmail(email.value);

  if (!name.value) {
    name.style.outlineColor = "red";
    name.focus();
    return;
  }

  if (!age.value) {
    age.style.outlineColor = "red";
    age.focus();
    return;
  }

  if (!email.value) {
    email.style.outlineColor = "red";
    email.focus();
    return;
  } else {
    user = {
      name: name.value,
      age: age.value,
      email: email.value,
    };

    // Storing user information in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    form.reset();
    window.location.replace(
      `../index.html?name=${name.value}&age=${age.value}&email=${email.value}`
    );
  }
}

// Events
btn.addEventListener("click", function (e) {
  e.preventDefault();

  checkValues();
});
