'use strict';

import {form, todos} from './script';
import {toLocalStorage} from "./localStorage";
import countDate from "./countDate";

const maxItemsInList = 3;

let text = document.getElementsByClassName('itemText');
let itemDate = document.getElementsByClassName('itemDate');
let listNote = document.getElementsByClassName('list-note');

let navBtns = document.getElementsByClassName('navButton');

// функция отрисовки макета для элементов списка
function makeTemplateForItems() {
    let str = '';
    for (let i = 0; i < maxItemsInList; i++) {
        str += `<div class='list-note' style = 'display: none'> 
                    <div class="itemText"></div>
                    <div class="btn-container">
                        <div class="itemDate"></div>
                        <div class="button editBtn">Edit</div>
                        <div class="button deleteBtn">Delete</div>
                    </div>
                </div>`;
    }
    document.getElementById('list2').innerHTML = str;
}

// функция отрисовки списка на экране - отрисовывает последние maxItemsInList элементов
function showAllList() {
    let pageOfList = [];
    let indexesOfItems = [];

    if(todos.length > maxItemsInList) {
        for(let index = todos.length - 1; index > todos.length - maxItemsInList - 1; index--) {
            pageOfList.push(todos[index]);
            indexesOfItems.push(index);
        }
    } else {
        for(let index = todos.length - 1; index >= 0; index--) {
            pageOfList.push(todos[index]);
            indexesOfItems.push(index);
        }
    }

    for( let i = 0; i < maxItemsInList; i++) {
        if(pageOfList[i]) {
            text[i].innerHTML = pageOfList[i].showText();
            itemDate[i].innerHTML = pageOfList[i].date;
            listNote[i].style.display = "flex";
            listNote[i].setAttribute('data-index', indexesOfItems[i]);
        } else {
            listNote[i].style.display = "none";
            listNote[i].removeAttribute('data-index');
        }
    }

    addBtnEvents();
    addNavButtons();


    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].removeAttribute('id');
    }
    navBtns[0].setAttribute('id', 'navSelectedButton');
}

function showList(navigatorList) {
    let pageOfList = [];
    let indexesOfItems = [];

    let navigatorListReverse = navBtns.length - navigatorList + 1;

    if(todos.length % maxItemsInList && navigatorList === 1) {
        for(let index = todos.length - 1 - maxItemsInList*(navBtns.length - 1); index >= 0; index--) {
            pageOfList.push(todos[index]);
            indexesOfItems.push(index);
        }
    } else {
        for(let index = todos.length - 1 - maxItemsInList*(navigatorListReverse-1); index >= todos.length - maxItemsInList*navigatorListReverse; index--) {
            pageOfList.push(todos[index]);
            indexesOfItems.push(index);
        }
    }

    for( let i = 0; i < maxItemsInList; i++) {
        if(pageOfList[i]) {
            text[i].innerHTML = pageOfList[i].showText();
            itemDate[i].innerHTML = pageOfList[i].date;
            listNote[i].style.display = "flex";
            listNote[i].setAttribute('data-index', indexesOfItems[i]);
        } else {
            listNote[i].style.display = "none";
            listNote[i].removeAttribute('data-index');
        }
    }

    addBtnEvents();
}

// навешиваем события на динамически созданные кнопки - Edit и Delete
function addBtnEvents() {
    let delBut = document.querySelectorAll('.deleteBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].style.display = 'block';
        delBut[i].addEventListener('click', deleteItem);
    }

        let edBut = document.querySelectorAll('.editBtn');
    for(let i  = 0; i < edBut.length; i++){
        edBut[i].style.display = 'block';
        edBut[i].addEventListener('click', editItem);
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

// функция поиска
function searchInList() {

    let searchingItem = document.getElementById('searchLine').value;

    if (!document.getElementById('searchLine').value) {
        return;
    }

    let lastElem = searchingItem.length;
    let searchArray = [];

    todos.forEach((item) => {
        if(item.showText().slice(0, lastElem) ===  searchingItem) {
            searchArray.push(item);
        }
    });

    for( let i = 0; i < maxItemsInList; i++) {
        if(searchArray[i]) {
            text[i].innerHTML = searchArray[i].showText();
            itemDate[i].innerHTML = searchArray[i].date;
            listNote[i].style.display = "flex";
        } else {
            listNote[i].style.display = "none";
        }
    }

    let delBut = document.querySelectorAll('.deleteBtn');
    let edBut = document.querySelectorAll('.editBtn');
    for(let i  = 0; i < delBut.length; i++){
        delBut[i].style.display = 'none';
        edBut[i].style.display = 'none';
    }
    document.getElementById('navigatorContainer').style.display = 'none';

    if (searchArray.length === 0) {
        document.getElementById('searchLine').value = 'No matches';
        return;
    }
}

// пагинация
// добавили внизу навигатор по блокам в maxItemsInList элементов списка

function addNavButtons() {
    document.getElementById('navigatorContainer').style.display = 'flex';
    let navigator = document.getElementById('btnNavigator');
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

// навешиваем события на динамически созданные кнопки пагинации

function addNavBtnEvents() {

    for (let i = 0; i < navBtns.length; i++) {

        navBtns[i].addEventListener('click', (event) => {
            for (let i = 0; i < navBtns.length; i++) {
                navBtns[i].removeAttribute('id');
            }
            navBtns[i].setAttribute('id', 'navSelectedButton');
            showList(parseInt(event.target.getAttribute('data-index')));
        });
    }
}

//переключение страниц по стрелочкам

function showPrevPageOfList(){
    let index = parseInt((document.getElementById('navSelectedButton')).getAttribute('data-index'));

    if(index === navBtns.length) {
        return;
    }

    let indexInBtnArray = navBtns.length - index;

    navBtns[indexInBtnArray].removeAttribute('id');
    navBtns[indexInBtnArray - 1].setAttribute('id', 'navSelectedButton');

    showList(index + 1);
}

function showNextPageOfList(){
    let index = parseInt((document.getElementById('navSelectedButton')).getAttribute('data-index'));

    if(index === 1) {
        return;
    }

    let indexInBtnArray = navBtns.length - index;

    navBtns[indexInBtnArray].removeAttribute('id');
    navBtns[indexInBtnArray + 1].setAttribute('id', 'navSelectedButton');

    showList(index - 1);
}

export { showAllList, saveItem, makeTemplateForItems, showPrevPageOfList, showNextPageOfList, addBtnEvents, searchInList};