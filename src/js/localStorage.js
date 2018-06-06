'use strict';

// функция отправки данных в local storage
import {todos} from "./script";

function toLocalStorage() {
    let todosINJSONFormat = JSON.stringify(todos);
    localStorage.setItem('todoarr', todosINJSONFormat);
}

// функция получения данных из local storage
function fromLocalStorage() {
    return JSON.parse(localStorage.getItem('todoarr'));
}

export {toLocalStorage, fromLocalStorage};
