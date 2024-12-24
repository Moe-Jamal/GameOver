// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
interface User {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
const myForm: HTMLElement = document.querySelector("form");
const themBtn3: HTMLElement = document.getElementById("mode");
if (localStorage.getItem("Mode")) {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("Mode")
  );
  if (localStorage.getItem("Mode") === "light") {
    themBtn3.classList.replace("fa-sun", "fa-moon");
  } else {
    themBtn3.classList.replace("fa-moon", "fa-sun");
  }
}
// * =============> Events ===============>
myForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    NameValidation() &&
    emailValidation() &&
    passwordValidation() &&
    rePasswordValidation() &&
    phoneValidation()
  ) {
    register();
  }
});
inputs[0].addEventListener("blur", NameValidation);
inputs[1].addEventListener("blur", emailValidation);
inputs[2].addEventListener("blur", passwordValidation);
inputs[3].addEventListener("blur", rePasswordValidation);
inputs[4].addEventListener("blur", phoneValidation);
document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("Mode")
  );
  if (localStorage.getItem("Mode") === "light") {
    themBtn3.classList.replace("fa-sun", "fa-moon");
  } else {
    themBtn3.classList.replace("fa-moon", "fa-sun");
  }
});
themBtn3.addEventListener("click", () => {
  if (themBtn3.classList.contains("fa-sun")) {
    document.documentElement.setAttribute("data-theme", "light");
    themBtn3.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem(
      "Mode",
      document.documentElement.getAttribute("data-theme")
    );
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themBtn3.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem(
      "Mode",
      document.documentElement.getAttribute("data-theme")
    );
  }
});
// ! =============> Functions ===============>
function register(): void {
  const newUser: User = {
    name: inputs[0].value,
    email: inputs[1].value,
    password: inputs[2].value,
    rePassword: inputs[3].value,
    phone: inputs[4].value,
  };
  registerData(newUser);
}

async function registerData(userData: User): Promise<void> {
  const apiUrl = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data: { message: string } = await apiUrl.json();

  if (data.message === "success") {
    location.href = "./index.html";
  } else {
    document.getElementById("msg").innerText = data.message;
  }
}
//  =============> Validation ===============>

function NameValidation(): boolean {
  const regex =
    /^(?:[a-zA-Z\s_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

  if (regex.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");
    return true;
  } else {
    inputs[0].classList.remove("is-valid");
    inputs[0].classList.add("is-invalid");
    return false;
  }
}
function emailValidation(): boolean {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regex.test(inputs[1].value)) {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");
    return true;
  } else {
    inputs[1].classList.remove("is-valid");
    inputs[1].classList.add("is-invalid");
    return false;
  }
}
function passwordValidation(): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputs[2].value)) {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    inputs[2].classList.remove("is-valid");
    inputs[2].classList.add("is-invalid");
    return false;
  }
}
function rePasswordValidation(): boolean {
  if (inputs[3].value === inputs[2].value) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    inputs[3].classList.remove("is-valid");
    inputs[3].classList.add("is-invalid");
    return false;
  }
}

function phoneValidation(): boolean {
  const regex = /^(\+2)?01[0125][0-9]{8}$/;
  if (regex.test(inputs[4].value)) {
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    inputs[4].classList.remove("is-valid");
    inputs[4].classList.add("is-invalid");
    return false;
  }
}
