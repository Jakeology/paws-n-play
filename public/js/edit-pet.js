async function editPetHandler(event) {
  event.preventDefault();

  const name = document.getElementById("pet-name").value.trim();
  const age = document.getElementById("pet-age").value.trim();
  const breed = document.getElementById("pet-breed").value.trim();
  const location = document.getElementById("pet-location").value.trim();
  const vaccinated = document.getElementById("pet-vaccinated").value.trim();
  const about = document.getElementById("pet-about").value.trim();
  const pfp = document.getElementById("edit-pet-pfp").value.trim();

  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  await fetch(`/api/pets/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      age,
      breed,
      location,
      vaccinated,
      about,
      pfp,
    }),
    headers: {
      "Content-Type": "application/json",
    },
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

document.querySelector(".edit-form").addEventListener("submit", editPetHandler);
