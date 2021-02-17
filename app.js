
let data = []
const load = ()=>{
    fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(json => {
        json.forEach((item)=>{
            data.push(item)
        })
    })
}

const populate = ()=>{
    const top = document.getElementById('dataOnLoad')
    data.forEach((item)=>{
        // Create 3 Element
        let name = item.name
        let username = item.username
        let email = item.email
        let id = item.id
        // console.log(`${name} - ${username} - ${email} - ${id}`)
        let DOMname = newElement('div', 'col-3', name)
        let DOMemail = newElement('div', 'col-3', email)
        let DOMuser = newElement('div', 'col-2', username)
        // Create Edit Button
        let edit = newElement('button', 'col-2', 'Edit')
        edit.classList.add('btn', 'btn-success')

        // Create Delete Button
        let del = newElement('button','col-2', 'Delete')
        del.classList.add('btn', 'btn-danger')
        del.setAttribute('id', `del-${id}`)
        del.addEventListener('click', function(){
            data = data.filter(item =>{
                 return this.id!=`del-${item.id}`
            })
            updateList()
        })


        top.appendChild(DOMname)
        top.appendChild(DOMemail)
        top.appendChild(DOMuser)
        top.appendChild(edit)
        top.appendChild(del)
    })
}

const newElement = (element, className, text) =>{
    const newElement = document.createElement(element)
    newElement.classList.add(className)
    newElement.innerHTML = `${text}`
    return newElement;
}

const addUser = ()=>{
    let newUser = {
        name : document.getElementById('formName').value,
        email  : document.getElementById('formEmail').value,
        username : document.getElementById('formUsername').value,
        id : data.length+1
    }
    data.push(newUser)
    updateList()
    
    flushInput()
    console.log(data)
}

const updateList = ()=>{
    const top = document.getElementById('dataOnLoad')
    let child = top.lastElementChild  
    while (child) { 
        top.removeChild(child); 
        child = top.lastElementChild; 
    } 
    populate();
}

const flushInput = () =>{
    document.getElementById('formName').value = ''
    document.getElementById('formEmail').value = ''
    document.getElementById('formUsername').value = ''
}

load()

setTimeout(()=>{populate() },3000)