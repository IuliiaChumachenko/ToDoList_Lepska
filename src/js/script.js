'use strict';

let todos = [];

let form = document.forms.main;

function TodoItem (text){
    this._text = text;
    this.date = '';
    // this.deleted = false;
    this.showText = function(){
        return this._text;
    }
}

// проверка локал сторидж при загрузке страницы

if(fromLocalStorage() !== null){

    let savedTodos = fromLocalStorage();

    savedTodos.forEach(function(item, index){
        savedTodos[index].showText = function(){
          return this._text
        };

        todos.push(item);
    });

    showList();

    addBtnEvents();


}

// навесили события на кнопки создания и сохранения изменений

document.getElementById('addBtn').onclick = addItemToList;

document.getElementById('saveBtn').onclick = saveItem;

// навесили события на кнопки сортировки.
document.getElementById('sortTaskBtn').onclick = sortByTask;

document.getElementById('sortDateBtn').onclick = sortByDate;

// функция добавления нового элемента
function addItemToList() {

    let text = form.elements.newItem.value;
    let item = new TodoItem(text);

    item.date = countDate();
    todos.push(item);
    form.elements.newItem.value = '';
//    console.log(todos);

    toLocalStorage();

    // перерисовали весь список
    showList();

    addBtnEvents();

    // дата создан
    // todos.forEach(function(item, index){
    //     console.log(item.date);
    // });

}

// document.querySelectorAll("body").addEventListener("click", function(event) {
//     if(!event.target.classList.contains("deleteBtn")) return;
//     /* Code */
//     console.log(111);
// });


// функция отрисовки списка на экране

function showList() {
    let str = '';
    todos.forEach(function(item, index){
        str += `<div class='list-note' data-index='${index}'><div class="itemText">${item.showText()}</div><div class="itemDate">${item.date}</div><div class="btn-container"><div class="button editBtn">Edit</div><div class="button deleteBtn">Delete</div></div></div>`;
    });

    document.getElementById('list').innerHTML = str;
}

// функция получения данных из локал сторидж
function toLocalStorage() {
    let todosINJSONFormat = JSON.stringify(todos);
    localStorage.setItem('todoarr', todosINJSONFormat);
}

// функция отправки данных в локал сторидж
function fromLocalStorage() {
    return JSON.parse(localStorage.getItem('todoarr'));
}


// фукнция удаления элемента
function deleteItem(event) {
    // console.log(event);
    let index = event.target.parentNode.parentNode.getAttribute('data-index');
    // console.log(index);
    todos.splice(index, 1);

    toLocalStorage();

    showList();

    addBtnEvents();
}

// EditHandler - функция, которая срабатывает на кнопе Edit
function editItem(event) {
    document.getElementById('addBtn').style.display ='none';
    document.getElementById('saveBtn').style.display ='block';

    let index = event.target.parentNode.parentNode.getAttribute('data-index');

    form.elements.newItem.value = todos[index].showText();
    form.elements.index.value = index;
}

// Save handler - фунция сохранения изменений

function saveItem() {
    document.getElementById('addBtn').style.display ='block';
    document.getElementById('saveBtn').style.display ='none';

    let index = form.elements.index.value;
    let text = form.elements.newItem.value;
    form.elements.newItem.value = '';

    todos[index]._text = text;
    todos[index].date = countDate();

    toLocalStorage();
    showList();

    addBtnEvents();

}

// навешиваем события на динамически созданные кнопки - Edit и Delete
function addBtnEvents() {
    let delBut = document.querySelectorAll('.deleteBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].onclick = deleteItem;
    }

    let edBut = document.querySelectorAll('.editBtn');
    for(let i  = 0; i < edBut.length; i++){
        edBut[i].onclick = editItem;
    }
}

// функция расчета даты
function countDate() {
    let now = new Date();
    return `${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

// функции сортировки
function sortByTask() {

    todos = todos.sort(function (a, b) {
        if (a._text > b._text) {
            return 1;
        }
        if (a._text < b._text) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    });

    toLocalStorage();
    showList();

    addBtnEvents();
}

function sortByDate() {
    todos = todos.sort(function (a, b) {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
        // a должно быть равным b
        return 0;
    });

    toLocalStorage();
    showList();

    addBtnEvents();

}