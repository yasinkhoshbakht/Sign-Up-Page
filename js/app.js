let btn = document.querySelector(".btn");
function signUpUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let loader = document.getElementById("loader");
  if (!email || !password) {
    displayMessage("Email and password cannot be empty", "error");
    return;
  }
  let user = {
    email: email,
    password: password,
  };
  loader.style.display = "block";
  fetch("https://reqres.in/api/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      loader.style.display = "none";
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((error) => {
          throw new Error(error.error);
        });
      }
    })
    .then((res) => {
      displayMessage("Registration successful!", "success");
    })
    .catch((err) => {
      displayMessage(err.message, "error");
    });
}
function displayMessage(message, type) {
  let messageDiv = document.getElementById("message");
  messageDiv.style.display = "block";
  messageDiv.textContent = message;
  if (type === "success") {
    messageDiv.className = "message success";
  } else {
    messageDiv.className = "message error";
  }
  setTimeout(() => {
    messageDiv.style.display = "none";
  }, 3000);
}
btn.addEventListener("click", signUpUser);
