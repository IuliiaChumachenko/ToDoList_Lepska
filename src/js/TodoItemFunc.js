'use strict';

import countDate from './countDate';
import {form, todos} from "./script";
import {toLocalStorage} from "./localStorage";
import {showAllList} from "./showList";

class TodoItem {
    constructor (text) {
        this._text = text;
        this.date = '';
    }

    showText (){
        return this._text;
    }
}

// функция добавления нового элемента

function addItemToList() {

    let text = form.elements.newItem.value;

    if(!text) {
        alert('Please enter your tsk');
        return;
    }

    let item = new TodoItem(text);

    item.date = countDate();
    todos.push(item);
    form.elements.newItem.value = '';

    toLocalStorage();

    showAllList();
}


export default addItemToList;