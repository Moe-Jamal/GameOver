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
// ? =============> Global ===============>
const inputsLogin = document.querySelectorAll("input");
const loginForm = document.querySelector("form");
const themBtn2 = document.getElementById("mode");
if (localStorage.getItem("Mode")) {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("Mode"));
    if (localStorage.getItem("Mode") === "light") {
        themBtn2.classList.replace("fa-sun", "fa-moon");
    }
    else {
        themBtn2.classList.replace("fa-moon", "fa-sun");
    }
}
// * =============> Events ===============>
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (emailLoginValidation() && passwordLoginValidation()) {
        login();
    }
});
inputsLogin[0].addEventListener("blur", emailLoginValidation);
inputsLogin[1].addEventListener("blur", passwordLoginValidation);
themBtn2.addEventListener("click", () => {
    if (themBtn2.classList.contains("fa-sun")) {
        document.documentElement.setAttribute("data-theme", "light");
        themBtn2.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("Mode", document.documentElement.getAttribute("data-theme"));
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
        themBtn2.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("Mode", document.documentElement.getAttribute("data-theme"));
    }
});
// ! =============> Functions ===============>
function login() {
    const userLogin = {
        email: inputsLogin[0].value,
        password: inputsLogin[1].value,
    };
    loginData(userLogin);
}
function loginData(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = yield fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const data = yield apiUrl.json();
        if (data.message === "success") {
            sessionStorage.setItem("uToken", data.token);
            location.href = "./home.html";
        }
        else {
            document.getElementById("msg").innerText = data.message;
        }
    });
}
//  =============> Validation ===============>
function emailLoginValidation() {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regex.test(inputsLogin[0].value)) {
        inputsLogin[0].classList.add("is-valid");
        inputsLogin[0].classList.remove("is-invalid");
        return true;
    }
    else {
        inputsLogin[0].classList.remove("is-valid");
        inputsLogin[0].classList.add("is-invalid");
        return false;
    }
}
function passwordLoginValidation() {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regex.test(inputsLogin[1].value)) {
        inputsLogin[1].classList.add("is-valid");
        inputsLogin[1].classList.remove("is-invalid");
        return true;
    }
    else {
        inputsLogin[1].classList.remove("is-valid");
        inputsLogin[1].classList.add("is-invalid");
        return false;
    }
}
