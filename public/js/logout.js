async function logout() {
  await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  })
  .catch((error) => {
    alert(error);
  });
}

document.querySelector("#logout").addEventListener("click", logout);
