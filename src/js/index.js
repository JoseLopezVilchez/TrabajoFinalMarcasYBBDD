import "./index/referencias.js";
import { toggletablogin , toggletabregistro } from "./index/estetica.js"
import { loginhandler } from "./index/login.js";
import { registrohandler } from "./index/registro.js";
import { username } from "./index/referencias.js";

tabregistro.addEventListener('click', () => {
    toggletabregistro()
})

tablogin.addEventListener('click', () => {
    toggletablogin()
})

login.addEventListener('submit', (e) => {
    e.preventDefault()

    loginhandler()
})

registro.addEventListener('submit', (e) => {
    e.preventDefault()

    registrohandler()
})