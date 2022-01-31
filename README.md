# sorTable
A very light waight with 0 dependency , Html table sort

## Installation

> just include dist/sortable.js the document.

## Usage

<table class="sortable-table">
    <tr>
        <th class="sortable"> Some sortable column </th>
        <th class="sortable" data-type="number" >Sortable number column </th>
    </tr>
    <tbody class="sortable-container">
    <tr>
        <td>Washington </td>
        <td> 13% </td>
    </tr>
    <tr>
        <td> San fransisco </td>
        <td> 10% </td>
    </tr>
    </tbody>
</table>



```html
<table class="sortable-table">
    <tr>
        <th class="sortable"> Some sortable column </th>
        <th class="sortable" data-type="number" >Sortable number column </th>
    </tr>
    <tbody class="sortable-container">
    <tr>
        <td>Washington </td>
        <td> 13% </td>
    </tr>
    <tr>
        <td> San fransisco </td>
        <td> 10% </td>
    </tr>
    </tbody>
</table>
```

## Restrictions

1. Must be a table element.
2. We use tr and cell index to get the currect position. so must use both tr and td.



