async function signupFormHandler(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email-signup");
  const usernameInput = document.getElementById("username-signup");

  const first_name = document.getElementById("first-name").value.trim();
  const last_name = document.getElementById("last-name").value.trim();
  const phone_number = document.getElementById("phone-number").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (first_name && last_name && phone && email && password) {
    await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        first_name,
        last_name,
        phone_number,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        alert(error);
      });
  }
}

document.querySelector(".signup-page").addEventListener("submit", signupFormHandler);
