let status = false
let data = []
let updateIndex = -1
let startIndex = 0
let paginationLimit = 6
let endIndex = startIndex + paginationLimit
// CRUD Status
let C = 0,
    R = 0,
    U = 0,
    D = 0

const DOC = document.getElementById('dataDynamic')
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
        alertBox('success-alert', 'Data Fetched')
    }
    DOC.innerHTML=''
    document.getElementById('footer').innerHTML=''
    //Add Pagination Button Number
    let pagNumber = Math.floor(data.length/paginationLimit) 
    if(data.length%paginationLimit>0){
        pagNumber+=1
    }
    // Adding Event Listener on Pagination Number
    for(let ind=1; ind<=pagNumber;ind++){
        let pagButton = document.createElement('button')
        pagButton.innerHTML = ind
        pagButton.className="pagination-custom-button"
        pagButton.addEventListener('click', function(event){
            startIndex = String(event.target.innerHTML) * paginationLimit - paginationLimit
            endIndex = startIndex + paginationLimit
            
            populate()
            updateActivePage(event.target.innerHTML)
        })
        
        document.getElementById('footer').appendChild(pagButton)
    }
    document.getElementById('tc').innerHTML = data.length
    for(let pageInd = startIndex;pageInd<=endIndex-1;pageInd++){
        // Create a client row with id = client.id
        let client = data[pageInd]
        if(client){
            let clientHead = createClientRow(client.id, 'client-row')
            // Create p tags with client name, username, email
            let name = createClientCred('p','cName',client.name)
            let username = createClientCred('p','cUsername',client.username)
            let email = createClientCred('p','cEmail',client.email)

            let edit = createClientCred('i', 'editBtn')
            edit.classList.add('far','fa-edit')
            // Attach Modal to Edit Button
            edit.addEventListener('click', function(e){
                // Pre Fill Details
                let targetElement = document.getElementById(e.target.parentElement.id)
                let previous = {
                    name : targetElement.querySelector('.cName').innerHTML,
                    username : targetElement.querySelector('.cUsername').innerHTML,
                    email : targetElement.querySelector('.cEmail').innerHTML
                }
                // Set Modal Values
                document.getElementById('u-name').value = previous.name
                document.getElementById('u-username').value = previous.username
                document.getElementById('u-email').value = previous.email
                document.querySelector('#updateUserModal').classList.toggle('d-none')
                updateIndex = client.id
            })
            let del = createClientCred('i', 'delBtn')
            del.classList.add('far','fa-minus-square')
            // Add Event Listener on Del Button
            del.addEventListener('click', function(e){
                if(confirm('Are you sure you want to delete this client?')){
                    updateIndex = e.target.parentElement.id
                    data = data.filter(delItem=>{
                        return delItem.id!=updateIndex
                    })
                    populate()
                    updateStatus(0,0,1)
                    alertBox('failure-alert', 'User Deleted')
                    if(data.length%paginationLimit==0){
                        startIndex=Math.floor(data.length/paginationLimit)-1
                        endIndex = startIndex + paginationLimit-1
                        populate()
                    }
                }
            })
            
            // Append 5 elements to clientHead
            clientHead.appendChild(name)
            clientHead.appendChild(username)
            clientHead.appendChild(email)
            clientHead.appendChild(edit)
            clientHead.appendChild(del)
            // Append ClientHead to body of html
            DOC.appendChild(clientHead)
            
            }
        
    }
}

const updateActivePage = (ev)=>{
    const paginationButtons = document.querySelectorAll('.pagination-custom-button')
    paginationButtons.forEach(btn=>{
        console.log(`${ev} - ${btn.innerHTML}`)
        if(btn.innerHTML === ev){
            btn.classList.add('active-page')
        }else{
            btn.classList.remove('active-page')
        }
    })
}

// Add Event Listener on Add User Form
document.querySelector('#add-user-form').addEventListener('submit', function(e){
    let name = document.getElementById('c-name')
    let username = document.getElementById('c-username')
    let email = document.getElementById('c-email')
    let status = true
    if(!validateInput(name,document.getElementById('nameHelp'))){
        status = false
    }if(!validateInput(username,document.getElementById('usernameHelp'))){
        status = false
    }if(!validateInput(email,document.getElementById('emailHelp'))){
        status = false
    }
    // Check if all entries are correct
    if(status){
        let newData = {
            name : name.value,
            username : username.value,
            email : email.value,
            id : Math.floor(Math.random()*100)
        }
        data.push(newData)
        populate()
        updateStatus(1,0,0)
        flushInputs(name,document.getElementById('nameHelp'))
        flushInputs(username,document.getElementById('usernameHelp'))
        flushInputs(email,document.getElementById('emailHelp'))
        alertBox('success-alert', 'User Added')
    }
});

// Add Event Listener on Update User Modal
document.getElementById('update-user-form').addEventListener('submit', function(e){
    let name = document.getElementById('u-name')
    let username = document.getElementById('u-username')
    let email = document.getElementById('u-email')
    let status = true
    if(!validateInput(name,document.getElementById('nameHelpupdate'))){
        status = false
    }if(!validateInput(username,document.getElementById('usernameHelpupdate'))){
        status = false
    }if(!validateInput(email,document.getElementById('emailHelpupdate'))){
        status = false
    }
    if(status){
        let newData = {
            name : name.value,
            username : username.value,
            email : email.value
        }
        data.forEach(item=>{
            if(item.id == updateIndex){
                item.name = newData.name,
                item.username = newData.username,
                item.email = newData.email
            }
        })
        updateStatus(0,1,0)
        flushInputs(name,document.getElementById('nameHelpupdate'))
        flushInputs(username,document.getElementById('usernameHelpupdate'))
        flushInputs(email,document.getElementById('emailHelpupdate'))
        populate()
        closeUpdateModal()
        alertBox('success-alert', 'User Updated')
    }
})

//Utility Functions
const createClientRow = (clientID, className) =>{
    let row = document.createElement('div')
    row.setAttribute('id', clientID)
    row.classList.add(className)
    return row
}
const createClientCred = (type, className, text) =>{
    let doc = document.createElement(type)
    doc.classList.add(className)
    if(text){ doc.innerHTML = text }
        return doc
}
const validateInput = (element, helpEl) =>{
    if(element.value == ''){
        element.style.border = '1px solid red'
        helpEl.innerHTML = 'Please Check this field'
        helpEl.style.color = 'red'
        return false
    }else{
        element.style.border = '1px solid green'
        helpEl.innerHTML = "Everything Looks Good"
        helpEl.style.color = 'green'
        return true
    }
}
const flushInputs = (element, helpEL) =>{
    element.style.border = '1px solid #dee'
    element.value=''
    helpEL.innerHTML = ''
}
const closeUpdateModal = () =>{
    document.querySelector('#updateUserModal').classList.add('d-none')
}
const updateStatus = (Cr,Up,De) =>{
    C += Cr
    U += Up
    D += De
    document.getElementById('ti').innerHTML = C
    document.getElementById('tc').innerHTML = data.length
    document.getElementById('tu').innerHTML = U
    document.getElementById('td').innerHTML = D
}
const alertBox = (status, text) =>{
    const par = document.getElementById('alertBox')
    par.classList.toggle('d-none')
    par.innerHTML = ''
    const box = document.createElement('p')
    box.className = `${status} px-3 py-1`
    box.innerHTML = text
    par.appendChild(box)
    setTimeout(()=>{
        par.classList.toggle('d-none')
    },2500)
    // Clears out the alert custom box after 2.5 seconds
}
//Set Pagination Limit Through UI

const setPagination = (evt,num)=>{
    paginationLimit = num
    startIndex=0
    endIndex=startIndex+paginationLimit
    populate()
}
// Global Execution Context
closeUpdateModal()
populate()


