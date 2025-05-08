import { Routes, Route } from "react-router-dom"
import Sidebar from "../../components/user/Sidebar"
import UserStock from "./consommables/UserStock"
import UserConsommation from "./consommables/UserConsommation"
import UserDemande from "./consommables/UserDemande"
import UserImStock from "./Immobiliers/UserImStock"
import UserImConsommation from "./Immobiliers/UserImConsommation"
import UserImDemande from "./Immobiliers/UserImDemande"
import Profile from "./Profil/Profile"
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route
            index
            element={<div className="dashboard-welcome">Bienvenue dans le tableau de bord utilisateur</div>}
          />
          <Route path="consommables/stock" element={<UserStock />} />
          <Route path="consommables/consommation" element={<UserConsommation />} />
          <Route path="consommables/demande" element={<UserDemande />} />
          <Route path="immobiliers/stock" element={<UserImStock />} />
          <Route path="immobiliers/consommation" element={<UserImConsommation />} />
          <Route path="immobiliers/demande" element={<UserImDemande />} />
          <Route path="profil" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
