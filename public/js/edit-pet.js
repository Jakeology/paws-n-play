async function editPetHandler(event) {
  event.preventDefault();

  const name = document.getElementById("pet-name").value.trim();
  const age = document.getElementById("pet-age").value.trim();
  const breed = document.getElementById("pet-breed").value.trim();
  const location = document.getElementById("pet-location").value.trim();
  const vaccinated = document.getElementById("pet-vaccinated").value.trim();
  const about = document.getElementById("pet-about").value.trim();
  const pfp = document.getElementById("pet-pfp").value.trim();

  const id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];

  const response = await fetch(`/api/pets/${id}`, {
    method: "put",
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
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".edit-form").addEventListener("submit", editPetHandler);


