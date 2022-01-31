"use strict";
function sort(t, col, asc, dataType) {
    var container = t.querySelector(".sortable-container");
    if (!container)
        return;
    var rows = container.querySelectorAll("tr");
    var arr = [];
    for (var i = 0; i < rows.length; i++) {
        arr.push(rows[i]);
    }
    arr.sort(function (a, b) {
        var v1 = a.cells[col].innerHTML;
        var v2 = b.cells[col].innerHTML;
        if (dataType == "number") {
            v1 = parseFloat(v1);
            v2 = parseFloat(v2);
        }
        if (asc) {
            return v1 > v2 ? 1 : -1;
        }
        else {
            return v1 < v2 ? 1 : -1;
        }
    });
    container.innerHTML = "";
    for (var i = 0; i < rows.length; i++) {
        container.appendChild(arr[i]);
    }
    dispatchSorted(t);
}
function dispatchSorted(el) {
    document.dispatchEvent(new CustomEvent("sorted", { bubbles: true }));
}
function initTable(t) {
    function callback(c) {
        var col = c.cellIndex;
        var asc = c.classList.contains("asc");
        var dataType = c.getAttribute("data-type");
        sort(t, col, asc, dataType);
        if (asc) {
            c.classList.remove("asc");
            c.classList.add("desc");
        }
        else {
            c.classList.remove("desc");
            c.classList.add("asc");
        }
    }
    function initColumn(c) {
        c.tabIndex = 0;
        c.addEventListener("click", function (e) { return callback(c); });
        c.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                callback(c);
            }
        });
    }
    var cols = t.querySelectorAll("th.sortable");
    cols.forEach(initColumn);
}
function onInit() {
    var tables = document.querySelectorAll("table.sortable-table");
    tables.forEach(initTable);
}
window.addEventListener("load", onInit);
//# sourceMappingURL=sortable.js.map