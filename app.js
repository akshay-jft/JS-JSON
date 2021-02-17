let status = false
let data = []
let updatingIndex
const load = async ()=>{
    let result = await fetch('https://jsonplaceholder.typicode.com/users/')
    let json = await result.json()
    json.forEach(item =>{
        data.push(item)
    })
    status = true
}

const populate = async ()=>{
    const top = document.getElementById('dataOnLoad')
    if(!status){     
        await load()
    }
    
    data.forEach((item)=>{
        // Collecting Values here
        let name = item.name
        let username = item.username
        let email = item.email
        let id = item.id
        
        let DOMname = newElement('div', 'col-3', name)
        let DOMemail = newElement('div', 'col-3', email)
        let DOMuser = newElement('div', 'col-2', username)

        // Create Edit Button
        let edit = newElement('button', 'col-2', 'Edit')
        edit.classList.add('btn', 'btn-success')
        edit.setAttribute('id', `edit-${id}`)
        edit.setAttribute('data-bs-toggle', 'modal')
        edit.setAttribute('data-bs-target', '#updateModal')
        edit.addEventListener('click', function(){
            
            data.forEach((item, index)=>{
                if(`${this.id}` ==  `edit-${item.id}`){
                    updatingIndex = index
                }
            })
            console.log(updatingIndex)
            document.getElementById('formNameUpdate').value = data[updatingIndex].name
            document.getElementById('formEmailUpdate').value = data[updatingIndex].email
            document.getElementById('formUsernameUpdate').value = data[updatingIndex].username
        })

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

const updateUserProfile = ()=>{
    let updatedUser = {
        name : document.getElementById('formNameUpdate').value ,
        email : document.getElementById('formEmailUpdate').value ,
        username : document.getElementById('formUsernameUpdate').value 
    }
    console.log(updatedUser)
    data[updatingIndex] = updatedUser
    updateList()
    flushInput()
}

const flushInput = () =>{
    document.getElementById('formName').value = ''
    document.getElementById('formEmail').value = ''
    document.getElementById('formUsername').value = ''
}

populate()