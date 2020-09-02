## Vanilla JS Excel
A personal project which copies some of Google Sheets features built with HTML/CSS(SCSS) and vanilla JS.

Link: https://excel-vanilla-js.web.app

### Implemented features:
* Routing between pages without reloading
* Adding/deleting new tables
* Persist storage: all changes made in the table remain after page reload, e.g., text in cells, text styles, table name changed columns/rows size.
* Resizing columns and rows.
* Select multiple cells with Shift + Click.
* Apply text align/styling for current cells or selected sells
* Two-way binding in formula and current cell
* Calculation in the formula works like you write '=' and then an expression. For example '=5+3*8' will result as 29 in a highlighted cell
* Navigation:
    * Jump from cell to cell using arrow keys 
    * Tab jumps to the right cell
    * Enter jumps to the bottom cell
    * Enter/Tab in formula jumps to the highlighted cell
