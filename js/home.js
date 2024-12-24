"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentCategory = "mmorpg";
const myLoader = document.querySelector(".loading");
const logoutBtn = document.querySelector(".logout-btn");
const themBtn = document.getElementById("mode");
if (localStorage.getItem("Mode")) {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("Mode"));
    if (localStorage.getItem("Mode") === "light") {
        themBtn.classList.replace("fa-sun", "fa-moon");
    }
    else {
        themBtn.classList.replace("fa-moon", "fa-sun");
    }
}
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
    getGames();
});
themBtn.addEventListener("click", () => {
    if (themBtn.classList.contains("fa-sun")) {
        document.documentElement.setAttribute("data-theme", "light");
        themBtn.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("Mode", document.documentElement.getAttribute("data-theme"));
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
        themBtn.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("Mode", document.documentElement.getAttribute("data-theme"));
    }
});
// ! =============> Functions ===============>
function getGames() {
    return __awaiter(this, void 0, void 0, function* () {
        myLoader.classList.remove("d-none");
        try {
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "33f5a37d97msh308f8723fc21dabp1b13a3jsn2aec09c53299",
                    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
                },
            };
            const apiUrl = yield fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${currentCategory}`, options);
            const data = yield apiUrl.json();
            console.log(data);
            displayGames(data);
            setTimeout(() => {
                myLoader.classList.add("d-none");
            }, 1000);
        }
        catch (err) {
            console.log(`Error > ${err}`);
            myLoader.classList.add("d-none");
        }
    });
}
function displayGames(gamesData) {
    var _a;
    let content = ``;
    for (let i = 0; i < gamesData.length; i++) {
        let videoUrl = gamesData[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
        let id = gamesData[i].id;
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
               <p class="card-text small text-center opacity-50 mt-2">${(_a = gamesData[i].short_description) === null || _a === void 0 ? void 0 : _a.split(" ", 10).join(" ")}</p>
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
function startVideo(event) {
    const videoElement = event.target.querySelector("video");
    videoElement.classList.remove("d-none");
    videoElement.play();
}
function stopVideo(event) {
    const videoElement = event.target.querySelector("video");
    videoElement.classList.add("d-none");
    videoElement.pause();
}
function showDetails(id) {
    location.href = `./details.html?id=${id}`;
}
