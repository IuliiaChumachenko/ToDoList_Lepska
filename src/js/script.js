'use strict';

import addItemToList from './TodoItemFunc';
import {fromLocalStorage} from "./localStorage";
import { showAllList, saveItem } from "./showList";
import {sortList} from "./sortList";
import {searchInList} from "./searchInList";

export let todos = [];
export let form = document.forms.main;

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

document.getElementById('addBtn').addEventListener('click', addItemToList);

document.getElementById('saveBtn').addEventListener('click', saveItem);

// навесили события на кнопки сортировки.

document.getElementById('sortTaskBtn').addEventListener('click', () => {sortList('byTask')});

document.getElementById('sortDateBtn').addEventListener('click', () => {sortList('byDate')});

document.getElementById('showAllBtn').addEventListener('click', showAllList);

//навесили событие на кнопку поиска

document.getElementById('searchBtn').addEventListener('click', searchInList);


