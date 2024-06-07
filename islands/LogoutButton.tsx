
const LogoutButton = () => {
 function LimpiarCookie(){
    document.cookie = "auth=; path=/;"
    window.location.href = "/login"
 }
 return (
    <>
      <a class="logout-button" onClick={() => LimpiarCookie()}>Logout</a>
    </>
 )
}

export default LogoutButton