import {openDeleteModal, newPostModal, editPostModal, createNewPost} from "./modal.js"
import { postsRender, userProfileRender } from "./render.js"
import { endpoints, getToken } from "./utils.js"

showUserOptions()
getUserProfile()
newPostModal()
postsUpdate() 
createNewPost()


function showUserOptions(){
    const imgAction = document.getElementById("img-user-options")
    const userOptions = document.getElementById("user-box-options")
    imgAction.addEventListener("click", ()=>{
            userOptions.classList.toggle("hide")
            const logoutButton = document.getElementById("logout-button")
            logoutButton.addEventListener("click", ()=>{
                window.history.back()
                localStorage.clear()
            })
    })
}
function getUserProfile(){
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
}
    fetch(endpoints.getUserProfile, {headers})
    .then(response => response.json())
    .then(data =>{
        localStorage.setItem("userID", data.id)
        userProfileRender(data.avatar, data.username)
    })
    .catch(error => console.log(error))
}
export function postsUpdate(){
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
}
fetch(endpoints.getPosts, {headers})
.then(response => response.json())
.then(data => {
    postsRender(data)
    openDeleteModal()
    editPostModal()
})
.catch(error => console.log(error))        
}
