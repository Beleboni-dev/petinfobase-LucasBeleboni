import { endpoints } from "./utils.js"

//Go to signup page =>
(() => {
    login()

    const buttonsToSignup = document.querySelectorAll(".go-to-signup")
    buttonsToSignup.forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "./src/pages/signup.html"
        })
    })
})()

function login() {
    const loginButton = document.querySelector(".form-button-login")

    loginButton.addEventListener("click", (event) => {
        event.preventDefault()

        const email = document.querySelector("#email-input").value
        const password = document.querySelector("#password-input").value
        const loginIcon = document.createElement("i")

        const emailInput = document.querySelector("#email-input")
        const passwordInput = document.querySelector("#password-input")
        const isWrong = document.querySelector(".password-status-nok")

        emailInput.addEventListener("focus", () => {
            isWrong.classList.add("hide")
        })

        passwordInput.addEventListener("focus", () => {
            isWrong.classList.add("hide")
        })

        loginIcon.classList.add("fas", "fa-spinner", "fa-spin")
        loginButton.textContent = ""
        loginButton.appendChild(loginIcon)

        fetch(endpoints.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    const isWrong = document.querySelector(".password-status-nok")
                    isWrong.classList.remove("hide")
                    loginButton.textContent = "Acessar"
                    if (loginButton.contains(loginIcon)) {
                        loginButton.removeChild(loginIcon)
                    }
                    throw new Error("usuário e/ou senha inválidos")
                }
            })
            .then((data) => {
                localStorage.setItem("token", data.token)
                setTimeout(() => {
                    loginButton.textContent = "Acessar"
                    if (loginButton.contains(loginIcon)) {
                        loginButton.removeChild(loginIcon)
                    }
                    window.location.href = "./src/pages/dashboard.html"
                }, 500)
            })
            .catch((error) => {
                console.log(error)
            })
    })
}