// ? =============> Global ===============>
const params: URLSearchParams = new URLSearchParams(location.search);
let gameId: string = params.get("id");
interface details {
  description: string;
  developer: string;
  game_url: string;
  genre: string;
  minimum_system_requirements: {
    graphics: string;
    memory: string;
    os: string;
    processor: string;
    storage: string;
  };
  platform: string;
  publisher: string;
  release_date: string;
  thumbnail: string;
  title: string;
}
// ? =============> Event ===============>
document.addEventListener("DOMContentLoaded", getDetails);
// ! =============> Functions ===============>
async function getDetails(): Promise<void> {
  try {
    const options: apiOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "33f5a37d97msh308f8723fc21dabp1b13a3jsn2aec09c53299",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const apiUrl = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
      options
    );
    const data: details = await apiUrl.json();
    console.log(data);
    displayGameDetails(data);
  } catch (err) {
    console.log(`Error > ${err}`);
  }
}

function displayGameDetails(detailsData: details): void {
  const fullDetails: string = `
    <div class="col-md-4">
            <div class="img-holder">
              <img
                src="${detailsData.thumbnail}"
                alt="${detailsData.title}"
                class="w-100"
              />
            </div>
            <div class="row mt-2">
              <div class="col-4 pe-0">
                <span class="btn btn-dark d-block w-100 rounded-1">Free</span>
              </div>
              <div class="col-8 ps-1">
                  <a href="${
                    detailsData.game_url
                  }" target="_blank" class="text-decoration-none btn btn-primary d-block w-100 rounded-1" >
                  Play Now
                  </a>
              </div>
            </div>
            <div class="info mt-3">
              <h3 class="mb-3 text-center">General Information</h3>
              <div class="row">
                <div class="col-6 d-flex align-items-center flex-column">
                  <p class="small opacity-50 mb-1">Title</p>
                  <p class="text-center">${detailsData.title}</p>
                </div>
                <div class="col-6 d-flex align-items-center flex-column">
                  <p class="small opacity-50 mb-1">Developer</p>
                  <p class="text-center">${detailsData.developer}</p>
                </div>
                <div class="col-6 d-flex align-items-center flex-column">
                  <p class="small opacity-50 mb-1">Publisher</p>
                  <p class="text-center">${detailsData.publisher}</p>
                </div>
                <div class="col-6 d-flex align-items-center flex-column">
                  <p class="small opacity-50 mb-1">Release Date</p>
                  <p class="text-center">${detailsData.release_date}</p>
                </div>
                <div class="col-6 d-flex align-items-center flex-column">
                  <p class="small opacity-50 mb-1">Genre</p>
                  <p class="text-center">${detailsData.genre}</p>
                </div>
                <div class="col-6 d-flex align-items-center flex-column">
                  <p class="small opacity-50 mb-1">Platform</p>
                  <p class="text-center">${detailsData.platform}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="./home.html">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  ${detailsData.title}
                </li>
              </ol>
            </nav>
            <h2 class="mb-3">${detailsData.title}</h2>
            <div class="about mb-3">
              <div class="line-under mb-2">
                <h4>About ${detailsData.title}</h4>
              </div>
              <div class="gameDetails">
                <p>${detailsData.description}</p>
              </div>
              <span class="btn btn-dark role="button" onclick="moreDetails()" ">+ Read More</span>
            </div>
            <div class="min-requirments">
              <div class="line-under mb-2">
                <h4>Minimum System Requirements</h4>
              </div>
            ${
              detailsData.minimum_system_requirements
                ? `<div class="row mt-3">
                <div class="col-6">
                  <p class="small opacity-50 mb-1">OS</p>
                  <p>${detailsData.minimum_system_requirements.os}</p>
                </div>
                <div class="col-6">
                  <p class="small opacity-50 mb-1">Processor</p>
                  <p>${detailsData.minimum_system_requirements.processor}</p>
                </div>
                <div class="col-6">
                  <p class="small opacity-50 mb-1">Memory</p>
                  <p>${detailsData.minimum_system_requirements.memory}</p>
                </div>
                <div class="col-6">
                  <p class="small opacity-50 mb-1">Graphics</p>
                  <p>${detailsData.minimum_system_requirements.graphics}</p>
                </div>
                <div class="col-6">
                  <p class="small opacity-50 mb-1">Storage</p>
                  <p>${detailsData.minimum_system_requirements.storage}</p>
                </div>
                <div class="col-6">
                  <p class="small opacity-50 mb-1">Additional Notes</p>
                  <p>Specifications may change during development</p>
                </div>
              </div>
            `
                : `<p>${detailsData.title} is a browser based game and should run smoothly on practically any PC with a updated web-browser.</p>
                 <p>If you have old hardware or software, you may still be able to play Dark Orbit Reloaded, but your game experience may suffer.
                  For the best gameplay experience, we recommend the latest versions of Firefox, Chrome, or Internet Explorer.</p>`
            }
            </div>
          </div>
    `;
  document.getElementById("detailsData").innerHTML = fullDetails;
  const backgroundCover: string = detailsData.thumbnail.replace(
    "thumbnail",
    "background"
  );
  document.body.style.cssText = `
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5) ), url("${backgroundCover}");
    background-size: cover;
    background-position: center`;
}
function moreDetails(): void {
  const description = document.querySelector(".gameDetails") as HTMLElement;
  if (description.classList.contains("fullInfo")) {
    description.style.height = "100px";
  } else {
    description.style.height = `${description.scrollHeight}px`;
  }
  description.classList.toggle("fullInfo");
}
