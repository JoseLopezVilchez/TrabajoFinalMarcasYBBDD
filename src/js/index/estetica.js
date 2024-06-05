function hacerprimario(target) {
    target.classList.remove("border-transparent", "hover:text-gray-600", "hover:border-gray-300", "dark:hover:text-gray-300")
    target.classList.add("text-blue-600", "border-blue-600", "active", "dark:text-blue-500", "dark:border-blue-500")
}

function hacersecundario(target) {
    target.classList.add("border-transparent", "hover:text-gray-600", "hover:border-gray-300", "dark:hover:text-gray-300")
    target.classList.remove("text-blue-600", "border-blue-600", "active", "dark:text-blue-500", "dark:border-blue-500")
}

export function toggletablogin() {
    tabregistro.removeAttribute('aria-current');
    tablogin.setAttribute('aria-current', 'page');
    if (login.classList.contains("hidden")) {
        login.classList.remove("hidden")
        registro.classList.add("hidden")
    }
    hacerprimario(tablogin)
    hacersecundario(tabregistro)
}

export function toggletabregistro() {
    tablogin.removeAttribute('aria-current');
    tabregistro.setAttribute('aria-current', 'page');
    if (registro.classList.contains("hidden")) {
        registro.classList.remove("hidden")
        login.classList.add("hidden")
    }
    hacerprimario(tabregistro)
    hacersecundario(tablogin)
}

