let status = false
let data = []

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

    data.forEach(item =>{
        let wrapper = document.createElement('div')
        wrapper.classList.add('dataRow')
        wrapper.setAttribute('id', `${item.id}`)

        let client = document.createElement('div')
        client.classList.add('clientNE')

        let name = createP(item.name)
        name.classList.add('client-name')
        client.appendChild(name)

        let phone = createP(item.phone)
        let user = createP(item.username)
        
        wrapper.appendChild(client)
        wrapper.appendChild(user)
        wrapper.appendChild(phone)

        document.getElementById('dataDynamic').appendChild(wrapper)
    })
}

const createP = (text) =>{
    const doc = document.createElement('p')
    doc.innerHTML = text
    return doc
}

populate()