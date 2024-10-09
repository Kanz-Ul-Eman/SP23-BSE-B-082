document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");

  form.addEventListener("submit", function (event) {
    let hasError = false;

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const address = document.getElementById("Address");
    const city = document.getElementById("city");

    if (username.value.trim() === "") {
      username.nextElementSibling.textContent = "Username cannot be empty";
      hasError = true;
    }

    if (email.value.trim() === "") {
      email.nextElementSibling.textContent = "Email cannot be empty";
      hasError = true;
    }

    if (address.value.trim() === "") {
      address.nextElementSibling.textContent = "Address cannot be empty";
      hasError = true;
    }

    if (city.value.trim() === "") {
      city.nextElementSibling.textContent = "City cannot be empty";
      hasError = true;
    }

    if (hasError) {
      event.preventDefault();
    }
  });
});
