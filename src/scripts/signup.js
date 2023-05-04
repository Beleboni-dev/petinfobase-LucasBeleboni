import { endpoints } from "./utils.js"
import { showToast } from "./toast.js"

//Go to login page =>
(() => {
    const buttonsToBack = document.querySelectorAll(".back-to-login")

    buttonsToBack.forEach(button => {
        button.addEventListener("click", () => {
            window.location.href = "../../index.html"
        })
    })
})()

// Get Values function, return object
function getValues() {
    const username = document.getElementById("user-input").value
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value
    const avatar = document.getElementById("link-photo-input").value
    return {
        username: username,
        email: email,
        password: password,
        avatar: avatar
    }
}
//Create user in Api
function createUser() {
    const createButton = document.querySelector(".form-button-signup")

    createButton.addEventListener("click", (e) => {
        e.preventDefault()
        const body = getValues()

        fetch(endpoints.createUser, {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.ok){
                showToast("success")
                setTimeout(()=>{
                    window.location.href = "../../index.html"
                },1500)
            }else{
                throw new Error("Não foi possível criar o usuário")
            }
        }).catch(error => console.error(error))
    })
}
createUser()    
