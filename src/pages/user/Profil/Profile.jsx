"use client"

import { useState } from "react"
import "./css/Profile.css"

function Profile() {
  const [activeTab, setActiveTab] = useState("info")

  // Données simulées pour l'utilisateur
  const user = {
    nom: "Jean Dupont",
    email: "jean.dupont@example.com",
    fonction: "Comptable",
    departement: "Finance",
    agence: "Paris",
    dateInscription: "15/01/2023",
  }

  // Données simulées pour l'historique des activités
  const activities = [
    {
      id: 1,
      action: "Demande de stock",
      item: "Papier A4",
      date: "2023-05-05T10:30:00",
      details: "Demande de 5 ramettes",
    },
    {
      id: 2,
      action: "Consommation",
      item: "Stylos",
      date: "2023-05-03T09:45:00",
      details: "Utilisation de 3 stylos",
    },
    {
      id: 3,
      action: "Demande d'immobilier",
      item: "Écran 24 pouces",
      date: "2023-05-01T16:20:00",
      details: "Demande approuvée",
    },
  ]

  // Données simulées pour les préférences
  const preferences = {
    notifications: true,
    emailAlerts: true,
    language: "Français",
    theme: "Clair",
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.nom
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
        <div className="profile-title">
          <h2>{user.nom}</h2>
          <p>{user.fonction}</p>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`tab-button ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
          Informations
        </button>
        <button
          className={`tab-button ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activités
        </button>
        <button
          className={`tab-button ${activeTab === "preferences" ? "active" : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          Préférences
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "info" && (
          <div className="profile-info">
            <div className="info-card">
              <div className="info-item">
                <div className="info-icon">👤</div>
                <div className="info-content">
                  <h4>Nom complet</h4>
                  <p>{user.nom}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">💼</div>
                <div className="info-content">
                  <h4>Fonction</h4>
                  <p>{user.fonction}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">🏢</div>
                <div className="info-content">
                  <h4>Département</h4>
                  <p>{user.departement}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>Agence</h4>
                  <p>{user.agence}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📅</div>
                <div className="info-content">
                  <h4>Date d'inscription</h4>
                  <p>{user.dateInscription}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="activity-history">
            <h3>Historique des activités</h3>
            <div className="activity-timeline">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-date">{formatDate(activity.date)}</div>
                  <div className="activity-content">
                    <h4>{activity.action}</h4>
                    <p>
                      <strong>Article:</strong> {activity.item}
                    </p>
                    <p>{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "preferences" && (
          <div className="user-preferences">
            <h3>Préférences utilisateur</h3>
            <div className="preferences-list">
              <div className="preference-item">
                <div className="preference-label">Notifications push</div>
                <div className="preference-value">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked={preferences.notifications} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-label">Alertes par email</div>
                <div className="preference-value">
                  <label className="toggle">
                    <input type="checkbox" defaultChecked={preferences.emailAlerts} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-label">Langue</div>
                <div className="preference-value">
                  <select defaultValue={preferences.language}>
                    <option value="Français">Français</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-label">Thème</div>
                <div className="preference-value">
                  <select defaultValue={preferences.theme}>
                    <option value="Clair">Clair</option>
                    <option value="Sombre">Sombre</option>
                    <option value="Système">Système</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="preferences-actions">
              <button className="save-button">Enregistrer les modifications</button>
              <button className="reset-button">Réinitialiser</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
