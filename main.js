 'use strict'

 let input = document.getElementById('input');
let submitBtn = document.getElementById('submit');
 let itemsContent = document.querySelector('.item-content');
 let list = document.querySelector('.list');


 let tasks  = JSON.parse(localStorage.getItem('data')) || [];

window.addEventListener('load', ()=> {
    update();
})



submitBtn.addEventListener('click', (e) => {
    let inputValue = input.value
    if (inputValue === '') {
        alert('no content')
        return
    }
    
    console.log(input.value.length);
    if (inputValue.length >= 25) {
        alert('so long')
        input.value = ''
        return
    }
    e.preventDefault()
    let id = Math.floor(Math.random()*10000)
     let obj = {
         id: id,
         nameTask: inputValue,
     }
     tasks.push(obj)
     createElement(obj.nameTask, id)
     deleteItem()
     localStorage.setItem('data', JSON.stringify(tasks))
    input.value = ''
})

 const createElement = (e,id) => { 

     const title = document.createElement('div');
     title.classList.add('item')
     title.setAttribute('data', `${id}`)
     title.textContent = e
     itemsContent.appendChild(title)

     const deleteItem = document.createElement('button');
     deleteItem.classList.add('delete','bi-trash3')
     title.appendChild(deleteItem) 

 }

    const removeItem = (e) => { 
     tasks = tasks.filter((x)=>x.id !== e);
     localStorage.setItem('data', JSON.stringify(tasks))
 }


const update = () => {
    itemsContent.innerHTML = tasks.map((e)=>{
    localStorage.setItem('data', JSON.stringify(tasks))
        return `
        <div class="item" data="${e.id}">${e.nameTask}
        <button class="delete bi bi-trash3"></button>
        </div>
        `
}).join("")
    deleteItem()
}

const deleteItem = () => {
    const remove = document.querySelectorAll('.delete');
    remove.forEach((e)=> {
        e.addEventListener('click', () => {
            //?Selection the item content DIV
            let item = e.parentElement
            let newItem = item.getAttribute('data')
            
            //? Delete from local storage
           let newNumberItem = parseInt(newItem)
            removeItem(newNumberItem)

            //?Delete from display
            item.style.display = 'none'
        })
    }) 
}

update()
