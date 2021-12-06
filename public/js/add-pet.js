async function addPetHandler(event) {
  event.preventDefault();

  const name = document.getElementById("pet-name").value.trim();
  const age = document.getElementById("pet-age").value.trim();
  const breed = document.getElementById("pet-breed").value.trim();
  const location = "Akron"
  const vaccinated = document.getElementById("pet-vaccinated").value.trim();
  const about = document.getElementById("pet-about").value.trim();
  const pfp = document.getElementById("pet-pfp").value.trim();
  

  console.log(vaccinated);
  

  const response = await fetch(`/api/pets`, {
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
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".add-pet-page").addEventListener("submit", addPetHandler);
