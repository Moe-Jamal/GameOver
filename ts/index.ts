// ? =============> Global ===============>
const inputsLogin = document.querySelectorAll("input");
interface UserLogin {
  email: string;
  password: string;
}
const loginForm: HTMLElement = document.querySelector("form");
const themBtn2: HTMLElement = document.getElementById("mode");
if (localStorage.getItem("Mode")) {
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("Mode")
  );
  if (localStorage.getItem("Mode") === "light") {
    themBtn2.classList.replace("fa-sun", "fa-moon");
  } else {
    themBtn2.classList.replace("fa-moon", "fa-sun");
  }
}
// * =============> Events ===============>
loginForm?.addEventListener("submit", function (e) {
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
    localStorage.setItem(
      "Mode",
      document.documentElement.getAttribute("data-theme")
    );
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themBtn2.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem(
      "Mode",
      document.documentElement.getAttribute("data-theme")
    );
  }
});
// ! =============> Functions ===============>
function login(): void {
  const userLogin: UserLogin = {
    email: inputsLogin[0].value,
    password: inputsLogin[1].value,
  };
  loginData(userLogin);
}

async function loginData(userData: UserLogin): Promise<void> {
  const apiUrl = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data: { message: string; token: string } = await apiUrl.json();

  if (data.message === "success") {
    sessionStorage.setItem("uToken", data.token);
    location.href = "./home.html";
  } else {
    document.getElementById("msg").innerText = data.message;
  }
}
//  =============> Validation ===============>
function emailLoginValidation(): boolean {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regex.test(inputsLogin[0].value)) {
    inputsLogin[0].classList.add("is-valid");
    inputsLogin[0].classList.remove("is-invalid");
    return true;
  } else {
    inputsLogin[0].classList.remove("is-valid");
    inputsLogin[0].classList.add("is-invalid");
    return false;
  }
}
function passwordLoginValidation(): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputsLogin[1].value)) {
    inputsLogin[1].classList.add("is-valid");
    inputsLogin[1].classList.remove("is-invalid");
    return true;
  } else {
    inputsLogin[1].classList.remove("is-valid");
    inputsLogin[1].classList.add("is-invalid");
    return false;
  }
}
