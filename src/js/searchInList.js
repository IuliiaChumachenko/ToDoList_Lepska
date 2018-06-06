'use strict';

//Функция поиска
import {todos} from "./script";

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

}

export {searchInList};