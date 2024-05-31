function sessionHandler(session_id) {
    if (sessionStorage.getItem("session_id") != null) {

    } else {
        sessionStorage.setItem("session_id" , session_id)
    }
}