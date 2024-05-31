import "./feed/referencias.js"
import { toggleDropdown } from "./feed/estetica.js"
//{ buttonfeed, buttonporhacer, buttonsugerenciasamigos , buttonsugerenciasthingos, buttontrending, dropdownporhacer, dropdownfeed, dropdownsugerenciasamigos, dropdownsugerenciasthingos, dropdowntrending } from 

document.addEventListener("DOMContentLoaded" , () => {
    toggleDropdown(dropdownporhacer)
    toggleDropdown(dropdownfeed)
    toggleDropdown(dropdownsugerenciasamigos)
    toggleDropdown(dropdownsugerenciasthingos)
    toggleDropdown(dropdowntrending)
})

buttonporhacer.addEventListener('click', () => {
    toggleDropdown(dropdownporhacer)
})

buttonfeed.addEventListener('click', () => {
    toggleDropdown(dropdownfeed)
})

buttonsugerenciasamigos.addEventListener('click', () => {
    toggleDropdown(dropdownsugerenciasamigos)
})

buttonsugerenciasthingos.addEventListener('click', () => {
    toggleDropdown(dropdownsugerenciasthingos)
})

buttontrending.addEventListener('click', () => {
    toggleDropdown(dropdowntrending)
})