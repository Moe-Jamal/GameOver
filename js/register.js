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
const inputs = document.querySelectorAll("input");
const myForm = document.querySelector("form");
const themBtn3 = document.getElementById("mode");
// * =============> Events ===============>
myForm === null || myForm === void 0 ? void 0 : myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (NameValidation() &&
        emailValidation() &&
        passwordValidation() &&
        rePasswordValidation() &&
        phoneValidation()) {
        register();
    }
});
inputs[0].addEventListener("blur", NameValidation);
inputs[1].addEventListener("blur", emailValidation);
inputs[2].addEventListener("blur", passwordValidation);
inputs[3].addEventListener("blur", rePasswordValidation);
inputs[4].addEventListener("blur", phoneValidation);
document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("Mode"));
    if (localStorage.getItem("Mode") === "light") {
        themBtn3.classList.replace("fa-sun", "fa-moon");
    }
    else {
        themBtn3.classList.replace("fa-moon", "fa-sun");
    }
});
themBtn3.addEventListener("click", () => {
    if (themBtn3.classList.contains("fa-sun")) {
        document.documentElement.setAttribute("data-theme", "light");
        themBtn3.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("Mode", document.documentElement.getAttribute("data-theme"));
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
        themBtn3.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("Mode", document.documentElement.getAttribute("data-theme"));
    }
});
// ! =============> Functions ===============>
function register() {
    const newUser = {
        name: inputs[0].value,
        email: inputs[1].value,
        password: inputs[2].value,
        rePassword: inputs[3].value,
        phone: inputs[4].value,
    };
    registerData(newUser);
}
function registerData(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = yield fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const data = yield apiUrl.json();
        if (data.message === "success") {
            location.href = "./index.html";
        }
        else {
            document.getElementById("msg").innerText = data.message;
        }
    });
}
//  =============> Validation ===============>
function NameValidation() {
    const regex = /^(?:[a-zA-Z\s_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
    if (regex.test(inputs[0].value)) {
        inputs[0].classList.add("is-valid");
        inputs[0].classList.remove("is-invalid");
        return true;
    }
    else {
        inputs[0].classList.remove("is-valid");
        inputs[0].classList.add("is-invalid");
        return false;
    }
}
function emailValidation() {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (regex.test(inputs[1].value)) {
        inputs[1].classList.add("is-valid");
        inputs[1].classList.remove("is-invalid");
        return true;
    }
    else {
        inputs[1].classList.remove("is-valid");
        inputs[1].classList.add("is-invalid");
        return false;
    }
}
function passwordValidation() {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (regex.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid");
        inputs[2].classList.remove("is-invalid");
        return true;
    }
    else {
        inputs[2].classList.remove("is-valid");
        inputs[2].classList.add("is-invalid");
        return false;
    }
}
function rePasswordValidation() {
    if (inputs[3].value === inputs[2].value) {
        inputs[3].classList.add("is-valid");
        inputs[3].classList.remove("is-invalid");
        return true;
    }
    else {
        inputs[3].classList.remove("is-valid");
        inputs[3].classList.add("is-invalid");
        return false;
    }
}
function phoneValidation() {
    const regex = /^(\+2)?01[0125][0-9]{8}$/;
    if (regex.test(inputs[4].value)) {
        inputs[4].classList.add("is-valid");
        inputs[4].classList.remove("is-invalid");
        return true;
    }
    else {
        inputs[4].classList.remove("is-valid");
        inputs[4].classList.add("is-invalid");
        return false;
    }
}
