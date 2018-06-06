'use strict';

// функции сортировки
import {toLocalStorage} from "./localStorage";
import {showAllList} from "./showList";
import {todos} from "./script";

function sortList(sortParam) {
    let sortParametr;
    switch (sortParam) {
        case 'byTask' :
            sortParametr = '_text';
            break;
        case 'byDate' :
            sortParametr = 'date';
            break;
    }

    todos.sort(function (a, b) {
        if (a[sortParametr] > b[sortParametr]) {
            return -1;
        }
        if (a[sortParametr] < b[sortParametr]) {
            return 1;
        }
        // a должно быть равным b
        return 0;
    });

    toLocalStorage();

    showAllList();

}

export {sortList};