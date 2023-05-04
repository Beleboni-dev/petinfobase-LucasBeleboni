
import { postsUpdate } from "./dashboard.js"
import { showToast } from "./toast.js"
import { endpoints, formatDate, getToken } from "./utils.js"



export function handleShowMore(postId) {
    const headers = {
        "Authorization": `Bearer ${getToken()}`,
        "Content-Type": "application/json"
    }
        fetch(endpoints.getPosts, {headers})
        .then(response => response.json())
        .then(data => {
         const post = data.find(post => post.id === postId)
            showMoreModal(post)
            closeModal()
        })
}
function showMoreModal(post){
    const dialog = document.getElementById("dialog-open-post");
    const title = dialog.querySelector(".post__title");
    const username = dialog.querySelector(".post__header-username");
    const createdAt = dialog.querySelector(".post__header-create-at");
    const content = dialog.querySelector(".modal-open-post__content");
    const postHeaderImage = document.querySelector('.modal-image__container img')
    console.log(postHeaderImage)
    postHeaderImage.src = post.user.avatar
    postHeaderImage.alt = 'user-picture'

    title.textContent = post.title;
    username.textContent = post.user.username;
    createdAt.textContent = formatDate(post.createdAt);
    content.innerHTML = post.content;
    dialog.showModal();
}
export function editPostModal() {
    const buttons = document.querySelectorAll(".post__header-edit-button")
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = document.getElementById("dialog-edit-post")
            modal.showModal()
            closeModal()
            const postId = button.dataset.postId
            postEdit(postId)
        })
    })
}
export function newPostModal() {
    const button = document.getElementById("create-post-button")
    button.addEventListener("click", () => {
        const modal = document.getElementById("dialog-new-post")
        modal.showModal()
        closeModal()
    })
}
function removeAllEventListeners(button) {
    const newButton = button.cloneNode(true)
    button.parentNode.replaceChild(newButton, button)
    return newButton
}

export function openDeleteModal() {

    const buttons = document.querySelectorAll(".post__header-delete-button")
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = document.getElementById("dialog-delete-post")
            modal.showModal()
            const postId = button.dataset.postId
            removeAllEventListeners(button)
            confirmDeletePostModal(postId)
        })
    })
}
async function confirmDeletePostModal(postId) {
    const button = document.getElementById("confirm-delete")
    button.addEventListener("click", () => {

        postDelete(postId).then(() => {
            removeAllEventListeners(button)
            postsUpdate()
        })
    })
}
function closeModal() {
    const buttons = document.querySelectorAll(".close-modal,.button--cancel")
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog")
            modal.close()
        })
    })
}
//modal utils functions
export function createNewPost() {
    const publishButton = document.querySelector(".modal-new-post__button.button--save")
    publishButton.addEventListener("click", () => {
        const postTitle = document.getElementById("input-new-title").value
        const postContent = document.getElementById("new-post-textarea").value
        const body = {
            "title": postTitle,
            "content": postContent
        }
        const headers = {
            "Authorization": `Bearer ${getToken()}`,
            "Content-Type": "application/json"
        }
        fetch(endpoints.createPost, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Não foi possível incluir o post")
                }
                postsUpdate()
                const modal = publishButton.closest("dialog")
                modal.close()
                return response.json()
            })
            .catch(error => console.log(error))
    })
}
function postEdit(postId) {
    const title = document.getElementById("input-title")
    const content = document.getElementById("edit-post-textarea")
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
    }

    fetch(`${endpoints.getPosts}`, { headers })
        .then(response => response.json())
        .then(data => {
            const post = data.find(post => post.id === postId)
            const postTitle = post.title
            const postContent = post.content

            title.value = postTitle
            content.value = postContent

            const saveButton = document.getElementById("button-save")
            saveButton.addEventListener("click", () => {
                const newTitle = title.value
                const newContent = content.value
                if(postTitle !== newTitle || postContent !== newContent){
                    const body = {
                        title: newTitle,
                        content: newContent
                    }
                    patchPost(postId, headers, body)
                }    else{
                const modal = document.getElementById("dialog-edit-post")
                    modal.close()
                }

            })

        })
        .catch(error => console.log(error))
}
function patchPost(postId, headers, body) {
    fetch(`${endpoints.PostById}${postId}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar o post')
      }
window.location.reload()
    })
    .catch(error => console.log(error))
}
  async function postDelete(postId) {
    try {
        const confirmButton = document.getElementById("confirm-delete")
        const response = await fetch(`${endpoints.PostById}${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            showToast("delete")
        }
        const data = await response.json()
        console.log(data)

        const modal = confirmButton.closest("dialog")
        modal.close()
    } catch (error) {
        console.log(error)
    }
}