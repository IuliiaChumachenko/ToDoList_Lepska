'use strict';


let todos = [];

let form = document.forms.main;

const maxItemsInList = 3;

let searchForm = document.forms.searchForm;



// function TodoItem (text){
//     this._text = text;
//     this.date = '';
//     // this.deleted = false;
//     this.showText = function(){
//         return this._text;
//     }
// }


class TodoItem {
    constructor (text) {
        this._text = text;
        this.date = '';
    }

    showText (){
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

    showAllList();
    addNavButtons();

    addBtnEvents();
    addNavBtnEvents();
}

// навесили события на кнопки создания и сохранения изменений

document.getElementById('addBtn').addEventListener('click', addItemToList);

document.getElementById('saveBtn').addEventListener('click', saveItem);


// навесили события на кнопки сортировки.
document.getElementById('sortTaskBtn').addEventListener('click', sortByTask);

document.getElementById('sortDateBtn').addEventListener('click', sortByDate);

document.getElementById('showAllBtn').addEventListener('click', showAllList);

//навесили событие на кнопку поиска

document.getElementById('searchBtn').addEventListener('click', searchInList);


// функция добавления нового элемента
function addItemToList() {

    let text = form.elements.newItem.value;
    let item = new TodoItem(text);

    item.date = countDate();
    todos.push(item);
    form.elements.newItem.value = '';

    toLocalStorage();

    // перерисовали весь список
    showAllList();
    addNavButtons();

    addBtnEvents();
    addNavBtnEvents();
}

// document.querySelectorAll("body").addEventListener("click", function(event) {
//     if(!event.target.classList.contains("deleteBtn")) return;
//     /* Code */
//     console.log(111);
// });


// функция отрисовки списка на экране - отрисовывает последние maxItemsInList элементов

function showAllList() {
    let str = '';
    // todos.forEach(function(item, index){
    //     newItem = `<div class='list-note' data-index='${index}'><div class="itemText">${item.showText()}</div><div class="itemDate">${item.date}</div><div class="btn-container"><div class="button editBtn">Edit</div><div class="button deleteBtn">Delete</div></div></div>`;
    //     str = newItem + str;
    // });
    if(todos.length > maxItemsInList) {
        for(let index = todos.length - 1; index > todos.length - maxItemsInList - 1; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="itemDate">${todos[index].date}</div>
                        <div class="btn-container">
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;

        }
    } else {
        for(let index = todos.length - 1; index >= 0; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="itemDate">${todos[index].date}</div>
                        <div class="btn-container">
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;

        }
    }

    document.getElementById('list').innerHTML = str;
    // addBtnEvents();
}

function showList(navigatorList) {
    let str = '';

    if(navigatorList !== Math.ceil(todos.length/maxItemsInList)) {

        for(let index = (navigatorList - 1) * maxItemsInList + maxItemsInList - 1; index >= (navigatorList - 1) * maxItemsInList; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="itemDate">${todos[index].date}</div>
                        <div class="btn-container">
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;
        }
    } else {

        for(let index = todos.length - 1; index >= (navigatorList - 1) * maxItemsInList; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="itemDate">${todos[index].date}</div>
                        <div class="btn-container">
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;
        }
    }

    document.getElementById('list').innerHTML = str;

    // addBtnEvents();
}

// функция отправки данных в локал сторидж
function toLocalStorage() {
    let todosINJSONFormat = JSON.stringify(todos);
    localStorage.setItem('todoarr', todosINJSONFormat);
}

// функция получения данных из локал сторидж
function fromLocalStorage() {
    return JSON.parse(localStorage.getItem('todoarr'));
}


// фукнция удаления элемента
function deleteItem(event) {
    let index = event.target.parentNode.parentNode.getAttribute('data-index');
    todos.splice(index, 1);

    toLocalStorage();

    showAllList();
    addBtnEvents();

    addNavButtons();
    addNavBtnEvents();
}

// функция, которая срабатывает на кнопе Edit
function editItem(event) {
    document.getElementById('addBtn').style.display ='none';
    document.getElementById('saveBtn').style.display ='block';

    let index = event.target.parentNode.parentNode.getAttribute('data-index');

    form.elements.newItem.value = todos[index].showText();
    form.elements.index.value = index;
}

// фунция сохранения изменений

function saveItem() {
    document.getElementById('addBtn').style.display ='block';
    document.getElementById('saveBtn').style.display ='none';

    let index = form.elements.index.value;
    let text = form.elements.newItem.value;
    form.elements.newItem.value = '';

    todos[index]._text = text;
    todos[index].date = countDate();

    toLocalStorage();
    showAllList();

    addBtnEvents();

    addNavButtons();
    addNavBtnEvents();
}

// навешиваем события на динамически созданные кнопки - Edit и Delete
function addBtnEvents() {
    let delBut = document.querySelectorAll('.deleteBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].addEventListener('click', deleteItem);
    }

    let edBut = document.querySelectorAll('.editBtn');
    for(let i  = 0; i < edBut.length; i++){
        edBut[i].addEventListener('click', editItem);
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
            return -1;
        }
        if (a._text < b._text) {
            return 1;
        }
        // a должно быть равным b
        return 0;
    });

    toLocalStorage();
    showAllList();

    addBtnEvents();

    addNavButtons();
    addNavBtnEvents();
}

function sortByDate() {
    todos = todos.sort(function (a, b) {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }

        return 0;
    });

    toLocalStorage();
    showAllList();

    addBtnEvents();

    addNavButtons();
    addNavBtnEvents();
}

//Функция поиска
function searchInList() {

    let searchingItem = document.getElementById('searchLine').value;

    if (!document.getElementById('searchLine').value) {
        return;
    }

    let lastElem = searchingItem.length;
    let str = '';

    todos.forEach((item, index) => {
        if(item.showText().slice(0, lastElem) ===  searchingItem) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${item.showText()}</div>
                        <div class="itemDate">${item.date}</div>
                        <div class="btn-container">
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;
        }
    });

    if (!str) {
        document.getElementById('searchLine').value = 'No matches';
        return;
    }

    document.getElementById('list').innerHTML = str;

    // addBtnEvents();
}


// добавили внизу навигатор по блокам в maxItemsInList элементов списка

function addNavButtons() {
    let navigator = document.getElementById('navigator');
    navigator.innerHTML = '';
    let butCount = Math.ceil(todos.length/maxItemsInList);

    for (let i = 1; i <= butCount; i++) {
        let butElem = document.createElement('div');
        butElem.classList.add('navButton');
        butElem.setAttribute('data-index', i);
        butElem.innerHTML = i;
        navigator.appendChild(butElem);
    }
}

// навешиваем события на динамически созданные кнопки перехода между блоками задач

function addNavBtnEvents() {
    let navBtns = document.getElementsByClassName('navButton');
    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].addEventListener('click', (event) => {
            showList(parseInt(event.target.getAttribute('data-index')));
        });
    }
}

