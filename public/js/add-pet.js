async function addPetHandler(event) {
  event.preventDefault();

  const name = document.querySelector("#pet-name").value.trim();
  const age = document.querySelector("#pet-age").value.trim();
  const breed = document.querySelector("#pet-breed").value.trim();
  const vaccinated = document.querySelector("#pet-vaccinated").value.trim();
  const about = document.querySelector("#pet-about").value.trim();
  const pfp = document.querySelector("#pet-pfp").value.trim();
  
  

  const response = await fetch(`/api/pets`, {
    method: "POST",
    body: JSON.stringify({
      name,
      age,
      breed,
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
