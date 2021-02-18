let status = false
let index = -1
let data = []

let updateCount = 0,
    deleteCount = 0,
    insertCount = 0,
    totalCount = 0

const load = async() =>{
    let result = await fetch('https://jsonplaceholder.typicode.com/users')
    let json = await result.json()
    json.forEach(item=>{
        data.push(item)
    })
    status = true
}

const populate = async ()=>{
    if(!status){
        await load()
    }
    totalCount = data.length
    document.getElementById('count-t').innerHTML = totalCount
    
    let rowTag = document.createElement('section')
    rowTag.classList.add('row')
    
    const nHead = createHeader('col-3', 'Name')
    const uHead = createHeader('col-3', 'Username')
    const eHead = createHeader('col-6', 'Email')
    
    rowTag.appendChild(nHead)
    rowTag.appendChild(uHead)
    rowTag.appendChild(eHead)
    
    data.forEach((user)=>{
        
        let nameDOM = createP(user.name, 'col-3')
        let usernameDOM = createP(user.username, 'col-3')
        let emailDOM = createP(user.email, 'col-4')
        
        let edit = createI()
        edit.classList.add('far','fa-edit', 'col-1', 'edit-icon')
        edit.setAttribute('id', `e-${user.id}`)
        edit.addEventListener('click', function(){
            openEditUserModal()
            document.getElementById('updateName').value = user.name
            document.getElementById('updateUserame').value = user.username
            document.getElementById('updateEmail').value = user.email
            index = this.id
        })
        
        let del = createI()
        del.classList.add('far','fa-trash-alt', 'col-1', 'del-icon')
        del.setAttribute('id', `d-${user.id}`)
        del.addEventListener('click', function(){
            deleteUser(this.id)
        })
        
        rowTag.appendChild(nameDOM)
        rowTag.appendChild(usernameDOM)
        rowTag.appendChild(emailDOM)
        rowTag.appendChild(edit)
        rowTag.appendChild(del)
        rowTag.appendChild(document.createElement('hr'))
        
        let parent = document.getElementById('userData')
        parent.appendChild(rowTag)
    })

}
const updateList = () =>{
    const top = document.getElementById('userData')
    let child = top.lastElementChild  
    while (child) { 
        top.removeChild(child); 
        child = top.lastElementChild; 
    }
    populate()
    totalCount = data.length
    document.getElementById('count-t').innerHTML = totalCount
}
const addUser = function (){
    let newUser = {
        name : document.getElementById('name').value,
        username : document.getElementById('username').value,
        email : document.getElementById('email').value,
        id : data.length+1
    }
    data.push(newUser)
    insertCount += 1
    document.getElementById('count-i').textContent = insertCount
    closeAddUserModal()
    updateList()
    document.getElementById('name').value = ''
    document.getElementById('username').value = ''
    document.getElementById('email').value = ''
}

const deleteUser = (id) =>{
     data = data.filter(item =>{
        return id!=`d-${item.id}`
    })
    updateList()
    deleteCount += 1
    document.getElementById('count-d').textContent = deleteCount
}

const updateUser = () =>{
    let updatedUser = {
        name : document.getElementById('updateName').value,
        username : document.getElementById('updateUserame').value,
        email : document.getElementById('updateEmail').value,
    }
    
    data.forEach((item, index2) =>{
        if( `e-${item.id}` == index){
            data[index2] = updatedUser
        }
    })
    updateList()
    closeEditUserModal()
    updateCount = +1
    document.getElementById('count-u').innerHTML = updateCount
}
const openAddUserModal = () =>{
    document.getElementById('addUserModal').classList.remove('d-none')
}
const closeAddUserModal = () =>{
    document.getElementById('addUserModal').classList.add('d-none')
}

const openEditUserModal = () =>{
    document.getElementById('updateUserModal').classList.remove('d-none')
}
const closeEditUserModal = () =>{
    document.getElementById('updateUserModal').classList.add('d-none')
}
const createI = (property) =>{
    const i = document.createElement('i')
    return i
}
const createP = (text, className) =>{
    const p = document.createElement('p')
    p.innerHTML = text
    p.classList.add(className)
    return p
}
const createHeader = (className, text) =>{
    const el = document.createElement('h5')
    el.classList.add(className)
    el.innerHTML = text
    return el
}
populate()