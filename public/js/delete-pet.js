async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  await fetch(`/api/pets/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    })
    .catch((error) => {
      alert(error);
    });
}

document.querySelector(".delete-btn").addEventListener("click", deleteFormHandler);
