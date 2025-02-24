const jsonFile = "/data/credits.json";
const credits = document.querySelector(".credits");

fetch(jsonFile)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((credit) => {
      const { link, name } = credit;
      credits.innerHTML += `
      <div class="credits-card">
         <p>${name}</p>
         <a href="${link}" aria-label="${name} Website" target="_blank">Link</a>
	  </div>
        `;
    });
  });
