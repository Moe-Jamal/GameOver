// ? =============> Global ===============>
interface apiOptions {
  method: string;
  headers: {
    "x-rapidapi-key": string;
    "x-rapidapi-host": string;
  };
}
let currentCategory: string = "mmorpg";
const myLoader: HTMLElement = document.querySelector(".loading");
const logoutBtn: HTMLElement = document.querySelector(".logout-btn");
const themBtn: HTMLElement = document.getElementById("mode");
// * =============> Events ===============>
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");
    currentCategory = link.getAttribute("data-category");
    getGames();
  });
});
logoutBtn.addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "./index.html";
});
document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("Mode")
  );
  if (localStorage.getItem("Mode") === "light") {
    themBtn.classList.replace("fa-sun", "fa-moon");
  } else {
    themBtn.classList.replace("fa-moon", "fa-sun");
  }
  getGames();
});
themBtn.addEventListener("click", () => {
  if (themBtn.classList.contains("fa-sun")) {
    document.documentElement.setAttribute("data-theme", "light");
    themBtn.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem(
      "Mode",
      document.documentElement.getAttribute("data-theme")
    );
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themBtn.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem(
      "Mode",
      document.documentElement.getAttribute("data-theme")
    );
  }
});

// ! =============> Functions ===============>
async function getGames(): Promise<void> {
  myLoader.classList.remove("d-none");
  try {
    const options: apiOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "33f5a37d97msh308f8723fc21dabp1b13a3jsn2aec09c53299",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const apiUrl = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${currentCategory}`,
      options
    );
    const data: {
      id?: number;
      title?: string;
      genre?: string;
      short_description?: string;
      platform?: string;
      thumbnail?: string;
    }[] = await apiUrl.json();
    console.log(data);
    displayGames(data);
    setTimeout(() => {
      myLoader.classList.add("d-none");
    }, 1000);
  } catch (err) {
    console.log(`Error > ${err}`);
    myLoader.classList.add("d-none");
  }
}
function displayGames(
  gamesData: {
    id?: number;
    title?: string;
    genre?: string;
    short_description?: string;
    platform?: string;
    thumbnail?: any;
  }[]
): void {
  let content: string = ``;
  for (let i = 0; i < gamesData.length; i++) {
    let videoUrl: string = gamesData[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    let id: number = gamesData[i].id;
    content += `
         <div class="col">
          <div class="card h-100 bg-transparent" role="button" onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" onclick="showDetails(${id})">
            <div class="card-body">
              <figure class="position-relative">
                <img
                  src=${gamesData[i].thumbnail}
                  alt="${gamesData[i].title}"
                  class="card-img-top object-fit-cover h-100 d-block"
                />
                <video
                  muted
                  preload="none"
                  loop
                  class="w-100 d-none h-100 position-absolute top-0 start-0 z-3"
                >
                <source src="${videoUrl}">
               </video>
              </figure>
              <figcaption>
               <div class="hstack justify-content-between">
                  <h3 class="h6 small">${gamesData[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>
               <p class="card-text small text-center opacity-50 mt-2">${gamesData[
                 i
               ].short_description
                 ?.split(" ", 10)
                 .join(" ")}</p>
              </figcaption>
            </div>
            <footer class="card-footer small hstack justify-content-between">
               <span class="badge badge-color">${gamesData[i].genre}</span>
               <span class="badge badge-color">${gamesData[i].platform}</span>
            </footer>
          </div>
        </div>
        `;
  }
  document.getElementById("gameData").innerHTML = content;
}
function startVideo(event: { target: Element }): void {
  const videoElement: HTMLVideoElement = event.target.querySelector("video");
  videoElement.classList.remove("d-none");
  videoElement.play();
}
function stopVideo(event: { target: Element }): void {
  const videoElement: HTMLVideoElement = event.target.querySelector("video");
  videoElement.classList.add("d-none");
  videoElement.pause();
}

function showDetails(id: number): void {
  location.href = `./details.html?id=${id}`;
}
