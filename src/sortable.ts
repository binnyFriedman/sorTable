"use strict";

function sort(
  t: HTMLTableElement,
  col: number,
  asc: boolean,
  dataType?: string
) {
  let container = t.querySelector(".sortable-container");
  if (!container) return;
  let rows = container.querySelectorAll("tr");
  let arr: HTMLTableRowElement[] = [];

  for (let i = 0; i < rows.length; i++) {
    arr.push(rows[i]);
  }

  arr.sort(function (a, b) {
    let v1: any = a.cells[col].innerHTML;
    let v2: any = b.cells[col].innerHTML;
    if (dataType == "number") {
      v1 = parseFloat(v1);
      v2 = parseFloat(v2);
    }
    if (asc) {
      return v1 > v2 ? 1 : -1;
    } else {
      return v1 < v2 ? 1 : -1;
    }
  });

  container.innerHTML = "";

  for (let i = 0; i < rows.length; i++) {
    container.appendChild(arr[i]);
  }

  dispatchSorted(t);
}

function dispatchSorted(el: Element) {
  document.dispatchEvent(new CustomEvent("sorted", { bubbles: true }));
}

function initTable(t: HTMLTableElement) {
  function callback(c: HTMLTableCellElement) {
    let col = c.cellIndex;
    let asc = c.classList.contains("asc");
    let dataType = c.getAttribute("data-type");
    sort(t, col, asc, dataType);
    if (asc) {
      c.classList.remove("asc");
      c.classList.add("desc");
    } else {
      c.classList.remove("desc");
      c.classList.add("asc");
    }
  }

  function initColumn(c: HTMLTableCellElement) {
    c.tabIndex = 0;
    c.addEventListener("click", (e) => callback(c));
    c.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        callback(c);
      }
    });
  }

  let cols: NodeListOf<HTMLTableCellElement> =
    t.querySelectorAll("th.sortable");
  cols.forEach(initColumn);
}

function onInit() {
  let tables: NodeListOf<HTMLTableElement> = document.querySelectorAll(
    "table.sortable-table"
  );
  tables.forEach(initTable);
}

window.addEventListener("load", onInit);
