
export function getToken(){
    const token = localStorage.getItem("token")
    return token
}

export const endpoints = {
    login: "http://localhost:3333/login",
    createUser: "http://localhost:3333/users/create",
    getUserProfile: "http://localhost:3333/users/profile",
    createPost: "http://localhost:3333/posts/create",
    getPosts: "http://localhost:3333/posts",
    PostById: "http://localhost:3333/posts/"
}

export function formatDate(dataString) {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]
  
    const data = new Date(dataString)
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
  
    return `${mes} de ${ano}`
}


