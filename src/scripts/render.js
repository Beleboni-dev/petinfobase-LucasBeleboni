import { handleShowMore } from "./modal.js"
import { formatDate } from "./utils.js"

export function userProfileRender(avatar, username){
    const imgContainer = document.getElementById("img-user-options")
    const img = document.createElement("img")
    img.src = avatar
    imgContainer.appendChild(img)
    const userBoxOptions = document.getElementById("user-box-options")
    const usernameSpan = document.createElement("span")
    usernameSpan.classList.add("font4-500")
    usernameSpan.textContent = "@"+ " " + username
    userBoxOptions.appendChild(usernameSpan)
    const buttonContainer = document.createElement("div")          
    buttonContainer.innerHTML = '<button class="font5-500" id="logout-button"><i class="fa-solid fa-right-from-bracket"></i>Sair da conta</button>'
    userBoxOptions.appendChild(buttonContainer)
}
export function postsRender(posts) {
    const feedContainer = document.querySelector('.feed-container')
    
    const userID = localStorage.getItem("userID")

    feedContainer.innerHTML = ''
  
    posts.forEach(post => {
      const postElement = document.createElement('div')
      postElement.classList.add('feed__post')
  
      const postHeader = document.createElement('div')
      postHeader.classList.add('post__header')
  
      const postHeaderLeftContainer = document.createElement('div')
      postHeaderLeftContainer.classList.add('post__header-left-container')
  
      const postHeaderImageContainer = document.createElement('div')
      postHeaderImageContainer.classList.add('post__header-image-container')
  
      const postHeaderImage = document.createElement('img')
      postHeaderImage.src = post.user.avatar
      postHeaderImage.alt = 'user-picture'
  
      const postHeaderUsername = document.createElement('span')
      postHeaderUsername.classList.add('post__header-username', 'font5-500')
      postHeaderUsername.textContent = post.user.username
  
      const postHeaderPip = document.createElement('span')
      postHeaderPip.classList.add('font5-500', 'post__header__pip')
      postHeaderPip.textContent = '|'
  
      const postHeaderCreatedAt = document.createElement('span')
      postHeaderCreatedAt.classList.add('post__header-create-at', 'font5-500')
      postHeaderCreatedAt.textContent = formatDate(post.createdAt)
      postHeaderImageContainer.appendChild(postHeaderImage)
      postHeaderLeftContainer.appendChild(postHeaderImageContainer)
      postHeaderLeftContainer.appendChild(postHeaderUsername)
      postHeaderLeftContainer.appendChild(postHeaderPip)
      postHeaderLeftContainer.appendChild(postHeaderCreatedAt)
      postHeader.appendChild(postHeaderLeftContainer)

        if(post.user.id === userID){
            const postHeaderRightContainer = document.createElement('div')
            postHeaderRightContainer.classList.add('post__header-right-container')
        
            const postHeaderEditButton = document.createElement('button')
            postHeaderEditButton.classList.add('post__header-edit-button', 'font5-500')
            postHeaderEditButton.textContent = 'Editar'
            postHeaderEditButton.dataset.postId = `${post.id}`
        
            const postHeaderDeleteButton = document.createElement('button')
            postHeaderDeleteButton.classList.add('post__header-delete-button', 'font5-500')
            postHeaderDeleteButton.id = "delete-post-button"
            postHeaderDeleteButton.dataset.postId = `${post.id}`
            postHeaderDeleteButton.textContent = 'Excluir'
            postHeaderRightContainer.appendChild(postHeaderEditButton)
            postHeaderRightContainer.appendChild(postHeaderDeleteButton)
            postHeader.appendChild(postHeaderRightContainer)
        }
     
      const postBody = document.createElement('div')
      postBody.classList.add('post__body')
  
      const postTitle = document.createElement('h2')
      postTitle.classList.add('post__title', 'font2-600')
      postTitle.textContent = post.title
  
      const postContent = document.createElement('p')
      postContent.classList.add('post__content-limited', 'font4-400')
      postContent.textContent = post.content.slice(0,145) + "..."
  
      const postOpenButton = document.createElement('button')
      postOpenButton.classList.add('post__button-open-complete-post', 'font4-500')
      postOpenButton.textContent = 'Acessar publicação'
      postOpenButton.addEventListener("click", () => handleShowMore(post.id))
    
      postBody.appendChild(postTitle)
      postBody.appendChild(postContent)
      postBody.appendChild(postOpenButton)
      postElement.appendChild(postHeader)
      postElement.appendChild(postBody)
      feedContainer.appendChild(postElement)
    })
  
  
}
  