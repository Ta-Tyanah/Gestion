"use client"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Home, Package, ChevronDown, ChevronRight, Building2, User } from "lucide-react"
import "../admin/Sidebar.css"

function Sidebar() {
  const [consommablesOpen, setConsommablesOpen] = useState(false)
  const [immobiliersOpen, setImmobiliersOpen] = useState(false)

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/user" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <Home className="nav-icon" size={20} />
              <span>Accueil</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link dropdown-toggle ${consommablesOpen ? "open" : ""}`}
              onClick={() => setConsommablesOpen(!consommablesOpen)}
            >
              <Package className="nav-icon" size={20} />
              <span>Gestion des Consommables</span>
              <span className="dropdown-icon">
                {consommablesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            </button>

            {consommablesOpen && (
              <ul className="sub-nav-list">
                <li className="sub-nav-item">
                  <NavLink
                    to="/user/consommables/stock"
                    className={({ isActive }) => (isActive ? "sub-nav-link active" : "sub-nav-link")}
                  >
                    Stock
                  </NavLink>
                </li>
                <li className="sub-nav-item">
                  <NavLink
                    to="/user/consommables/consommation"
                    className={({ isActive }) => (isActive ? "sub-nav-link active" : "sub-nav-link")}
                  >
                    Consommation
                  </NavLink>
                </li>
                <li className="sub-nav-item">
                  <NavLink
                    to="/user/consommables/demande"
                    className={({ isActive }) => (isActive ? "sub-nav-link active" : "sub-nav-link")}
                  >
                    Demande de Stock
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <button
              className={`nav-link dropdown-toggle ${immobiliersOpen ? "open" : ""}`}
              onClick={() => setImmobiliersOpen(!immobiliersOpen)}
            >
              <Building2 className="nav-icon" size={20} />
              <span>Gestion des Immobiliers</span>
              <span className="dropdown-icon">
                {immobiliersOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            </button>

            {immobiliersOpen && (
              <ul className="sub-nav-list">
                <li className="sub-nav-item">
                  <NavLink
                    to="/user/immobiliers/stock"
                    className={({ isActive }) => (isActive ? "sub-nav-link active" : "sub-nav-link")}
                  >
                    Stock
                  </NavLink>
                </li>
                <li className="sub-nav-item">
                  <NavLink
                    to="/user/immobiliers/consommation"
                    className={({ isActive }) => (isActive ? "sub-nav-link active" : "sub-nav-link")}
                  >
                    Consommation
                  </NavLink>
                </li>
                <li className="sub-nav-item">
                  <NavLink
                    to="/user/immobiliers/demande"
                    className={({ isActive }) => (isActive ? "sub-nav-link active" : "sub-nav-link")}
                  >
                    Demande
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <NavLink to="/user/profil" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              <User className="nav-icon" size={20} />
              <span>Mon Profil</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
