'use strict';

import addItemToList from './TodoItemFunc';
import {fromLocalStorage} from "./localStorage";
import {showAllList, saveItem, makeTemplateForItems, showPrevPageOfList, showNextPageOfList, searchInList} from "./showList";
import {sortList} from "./sortList";

export let todos = [];
export let form = document.forms.main;

//формируем макет для отображения todo list'a
makeTemplateForItems();

// проверка local storage при загрузке страницы

if(fromLocalStorage() !== null){

    let savedTodos = fromLocalStorage();

    savedTodos.forEach(function(item, index){
        savedTodos[index].showText = function(){
          return this._text
        };

        todos.push(item);
    });

    showAllList();
}

// навесили события на кнопки создания и сохранения изменений

let addBtn = document.getElementById('addBtn'),
    saveBtn = document.getElementById('saveBtn');

if (addBtn) {
    addBtn.addEventListener('click', addItemToList);
}

if (saveBtn) {
    saveBtn.addEventListener('click', saveItem);
}

// навесили события на кнопки сортировки.

let sortTaskBtn = document.getElementById('sortTaskBtn'),
    sortDateBtn = document.getElementById('sortDateBtn'),
    showAllBtn = document.getElementById('showAllBtn');

if (sortTaskBtn){
    sortTaskBtn.addEventListener('click', () => {sortList('byTask')});
}

if (sortDateBtn){
    sortDateBtn.addEventListener('click', () => {sortList('byDate')});
}

if (showAllBtn){
    showAllBtn.addEventListener('click', showAllList);
}

//навесили событие на кнопку поиска
let searchBtn = document.getElementById('searchBtn');

if (searchBtn){
    searchBtn.addEventListener('click', searchInList);
}

//навесили событие на кнопки вперед/назад (пагинация)
let navPrev = document.getElementById('navPrev'),
    navNext = document.getElementById('navNext');

if (navPrev){
    navPrev.addEventListener('click', showPrevPageOfList);
}

if (navNext){
    navNext.addEventListener('click', showNextPageOfList);
}

