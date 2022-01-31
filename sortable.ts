"use strict";

function sort(t:HTMLTableElement,col:number,asc:boolean,dataType?:string){
    let tbody = t.querySelector('tbody');
    if(!tbody) return;
    let rows = tbody.querySelectorAll('tr');
    let rlen = rows.length;
    let arr:HTMLTableRowElement[] = new Array();

    for(let i=0;i<rlen;i++){
        arr.push(rows[i]);
    }

    arr.sort(function(a,b){
        let v1:any = a.cells[col].innerHTML;
        let v2:any = b.cells[col].innerHTML;
        if(dataType=="number"){
            v1 = parseFloat(v1);
            v2 = parseFloat(v2);
        }
        if(asc){
            return (v1>v2)?1:-1;
        }else{
            return (v1<v2)?1:-1;
        }
    });


    tbody.innerHTML = "";

    for(let i=0;i<rlen;i++){
        tbody.appendChild(arr[i]);
    }

    dispatchSorted(t)
}

function dispatchSorted(el:Element){
    document.dispatchEvent(new CustomEvent('sorted',{bubbles:true}));
}

function onInit(){
    let tables:NodeListOf<HTMLTableElement> = document.querySelectorAll("table.sortable-table");

    tables.forEach(t=>{
       //get all soratable columns
        function callback(c:HTMLTableCellElement){
            let col = c.cellIndex;
            let asc = c.classList.contains("asc");
            let dataType = c.getAttribute("data-type");
            sort(t,col,asc,dataType);
            c.classList.toggle("asc");
        }
       let cols:NodeListOf<HTMLTableCellElement> = t.querySelectorAll("th.sortable");
       cols.forEach(c=>{
           c.addEventListener("click",(e)=>{
               callback(c);
           });
           c.addEventListener("keydown",(e)=>{
               if(e.keyCode==13){
                   callback(c);
               }
           });
       });
    })

}

window.addEventListener("load",onInit);
