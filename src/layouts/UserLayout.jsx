"use client"
import Logo from "../components/Logo"
import UserSidebar from "../components/user/Sidebar"
import "./Layout.css"

function UserLayout({ onLogout, children }) {
  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="header-logo">
          <Logo />
        </div>
        <div className="header-actions">
          <button className="btn-profil">Mon Profil</button>
          <button onClick={onLogout} className="btn-deconnexion">
            Déconnexion
          </button>
        </div>
      </header>
      <div className="layout-main">
        <UserSidebar />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  )
}

export default UserLayout
