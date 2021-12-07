async function addPetHandler(event) {
  event.preventDefault();

  const name = document.getElementById("pet-name").value.trim();
  const age = document.getElementById("pet-age").value.trim();
  const breed = document.getElementById("pet-breed").value.trim();
  const location = document.getElementById("pet-location").value.trim();
  const vaccinated = document.getElementById("pet-vaccinated").value.trim();
  const about = document.getElementById("pet-about").value.trim();
  const pfp = document.getElementById("pet-pfp").value.trim();

  await fetch(`/api/pets`, {
    method: "POST",
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

document.querySelector(".add-pet-page").addEventListener("submit", addPetHandler);
