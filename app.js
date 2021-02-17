
let data = []
const load = async ()=>{
    let loading = true
    fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(json => {
        data.push(json)
    })
}
const userData = async ()=>{
    // Load all the element data 
    await load()
    const parent = document.getElementById('dataOnLoad')
    const rowItem = document.createElement('div')
    rowItem.classList.add("row")
    parent.appendChild(rowItem);
    // Div ke andar row. Ab row ke andar columns

    let name,username,email;

    data[0].forEach(item =>{
        name = item.name;
        email = item.email;
        username = item.username;

        // Create Elements
        let nameDOM = create('div', 'col-3', name)
        let emailDOM = create('div', 'col-3', email)
        let usernameDOM = create('div', 'col-2', username)
        let edit = document.createElement('button')
        edit.classList.add("btn", "btn-primary", "col-2")
        edit.innerHTML = "Edit"
        let del = document.createElement('button')
        del.classList.add("btn", "btn-danger", "col-2")
        del.innerHTML = "Delete"
        
        // Add Elements to DOM
        rowItem.appendChild(nameDOM)
        rowItem.appendChild(emailDOM)
        rowItem.appendChild(usernameDOM)
        rowItem.appendChild(del)
        rowItem.appendChild(edit)
    })

}

const create = (type, className, text) =>{
    let newElement = document.createElement(`${type}`)
    newElement.classList.add(`${className}`)
    newElement.innerHTML = `${text}`
    return newElement
}

load()
setTimeout(()=>{userData() },3000)