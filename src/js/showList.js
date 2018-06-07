'use strict';

import {form, todos} from './script';
import {toLocalStorage} from "./localStorage";
import countDate from "./countDate";

const maxItemsInList = 3;

// функция отрисовки списка на экране - отрисовывает последние maxItemsInList элементов


function showAllList() {
    let str = '';

    if(todos.length > maxItemsInList) {
        for(let index = todos.length - 1; index > todos.length - maxItemsInList - 1; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="btn-container">
                            <div class="itemDate">${todos[index].date}</div>
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;

        }
    } else {
        for(let index = todos.length - 1; index >= 0; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="btn-container">
                            <div class="itemDate">${todos[index].date}</div>
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;

        }
    }

    document.getElementById('list').innerHTML = str;

    addBtnEvents();
    addNavButtons();

    let navBtns = document.getElementsByClassName('navButton');
    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].classList.remove('navSelectedButton');
    }
    navBtns[0].classList.add('navSelectedButton');
}

function showList(navigatorList) {
    let str = '';
    // console.log(navigatorList);
    let navBtns = document.getElementsByClassName('navButton');
    let navigatorListReverse = navBtns.length - parseInt(event.target.getAttribute('data-index'))+ 1;


    if(todos.length % maxItemsInList && navigatorList === 1) {
        for(let index = todos.length - 1 - maxItemsInList*(navBtns.length - 1); index >= 0; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="btn-container">
                            <div class="itemDate">${todos[index].date}</div>
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;
        }
    } else {
        for(let index = todos.length - 1 - maxItemsInList*(navigatorListReverse-1); index >= todos.length - maxItemsInList*navigatorListReverse; index--) {
            str += `<div class='list-note' data-index='${index}'>
                        <div class="itemText">${todos[index].showText()}</div>
                        <div class="btn-container">
                            <div class="itemDate">${todos[index].date}</div>
                            <div class="button editBtn">Edit</div>
                            <div class="button deleteBtn">Delete</div>
                        </div>
                    </div>`;
        }
    }

    document.getElementById('list').innerHTML = str;

    addBtnEvents();
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

// добавили внизу навигатор по блокам в maxItemsInList элементов списка

function addNavButtons() {
    let navigator = document.getElementById('navigator');
    navigator.innerHTML = '';
    let butCount = Math.ceil(todos.length/maxItemsInList);

    for (let i = butCount; i >= 1; i--) {
        let butElem = document.createElement('div');
        butElem.classList.add('navButton');
        butElem.setAttribute('data-index', i);
        butElem.innerHTML = i;
        navigator.appendChild(butElem);
    }

    if (!butCount){
        let butElem = document.createElement('div');
        butElem.classList.add('navButton');
        butElem.setAttribute('data-index', 1);
        butElem.innerHTML = 1;
        navigator.appendChild(butElem);
    }

    addNavBtnEvents();
}

// навешиваем события на динамически созданные кнопки перехода между блоками задач

function addNavBtnEvents() {
    let navBtns = document.getElementsByClassName('navButton');

    for (let i = 0; i < navBtns.length; i++) {
        // console.log(navBtns[i]);

        navBtns[i].addEventListener('click', (event) => {
            let navBtns = document.getElementsByClassName('navButton');
            for (let i = 0; i < navBtns.length; i++) {
                // console.log(navBtns[i]);
                navBtns[i].classList.remove('navSelectedButton');
            }
            navBtns[i].classList.add('navSelectedButton');

            showList(parseInt(event.target.getAttribute('data-index')));
        });
    }
}

// фукнция удаления элемента
function deleteItem(event) {
    let index = event.target.parentNode.parentNode.getAttribute('data-index');
    todos.splice(index, 1);

    toLocalStorage();

    showAllList();

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
}

export { showAllList, saveItem };