'use strict';

let todos = [];

// let form = document.forms.main;

function TodoItem (text){
    this._text = text;
    // this.deleted = false;
    this.showText = function(){
        return this._text;
    }
}


if(fromLocalStorage() !== null){

    let savedTodos = fromLocalStorage();

    savedTodos.forEach(function(item, index){
        savedTodos[index].showText = function(){
          return this._text
        };
        todos.push(item);
    });

    showList();

    let delBut = document.querySelectorAll('.deleteBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].onclick = deleteItem;
    }
}

document.getElementById('addBtn').onclick = addItemToList;


function addItemToList() {

    let text = main.elements.newItem.value;
    let item = new TodoItem(text);
    todos.push(item);
    main.elements.newItem.value = '';
//    console.log(todos);

    toLocalStorage();

//    fromLocalStorage();

    showList();


    let delBut = document.querySelectorAll('.deleteBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].onclick = deleteItem;
    }

}

// document.querySelectorAll("body").addEventListener("click", function(event) {
//     if(!event.target.classList.contains("deleteBtn")) return;
//     /* Code */
//     console.log(111);

// });

function showList() {
    let str = '';
    todos.forEach(function(item, index){
        str += `<div class='list-note' data-index='${index}'><div class="itemText">${item.showText()}</div><div class="deleteBtn">Delete</div></div>`;
    });

    document.getElementById('list').innerHTML = str;


}

function toLocalStorage() {
    let todosINJSONFormat = JSON.stringify(todos);
    localStorage.setItem('todoarr', todosINJSONFormat);
}

function fromLocalStorage() {
    return JSON.parse(localStorage.getItem('todoarr'));
}

function deleteItem(event) {
    // console.log(event);
    let index = event.target.parentNode.getAttribute('data-index');
    // console.log(index);
    todos.splice(index, 1);

    toLocalStorage();

    showList();

    let delBut = document.querySelectorAll('.deleteBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].onclick = deleteItem;
    }
}



