"use client"

import { useState, useEffect } from "react"
import { BarChart3, Filter, Search, FileDown, Bell, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import "./css/Suivi.css"

function SuiviStock() {
  const [categorie, setCategorie] = useState("all")
  const [periode, setPeriode] = useState("trimestre")
  const [recherche, setRecherche] = useState("")
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Stock critique",
      message: "Cartouches d'encre en stock critique (20 unités)",
      time: "Il y a 2 heures",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Nouvelle livraison",
      message: "Livraison de papier A4 reçue (150 ramettes)",
      time: "Il y a 5 heures",
      read: true,
    },
    {
      id: 3,
      type: "success",
      title: "Inventaire terminé",
      message: "L'inventaire mensuel a été complété avec succès",
      time: "Hier",
      read: false,
    },
    {
      id: 4,
      type: "warning",
      title: "Stock bas",
      message: "Le stock de stylos est bas (25 unités)",
      time: "Il y a 2 jours",
      read: false,
    },
    {
      id: 5,
      type: "info",
      title: "Commande en attente",
      message: "Commande de fournitures en attente de validation",
      time: "Il y a 3 jours",
      read: true,
    },
  ])

  // Simuler un chargement lors du montage du composant
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Données simulées pour le tableau de suivi
  const mouvementsStock = [
    {
      id: 1,
      designation: "Papier A4",
      categorie: "Fournitures",
      stockInitial: 100,
      entrees: 200,
      sorties: 150,
      stockFinal: 150,
    },
    {
      id: 2,
      designation: "Stylos",
      categorie: "Fournitures",
      stockInitial: 50,
      entrees: 100,
      sorties: 75,
      stockFinal: 75,
    },
    {
      id: 3,
      designation: "Cartouches d'encre",
      categorie: "Fournitures",
      stockInitial: 30,
      entrees: 50,
      sorties: 60,
      stockFinal: 20,
    },
    {
      id: 4,
      designation: "Ordinateurs",
      categorie: "Informatique",
      stockInitial: 10,
      entrees: 5,
      sorties: 3,
      stockFinal: 12,
    },
    {
      id: 5,
      designation: "Produits nettoyants",
      categorie: "Entretien",
      stockInitial: 20,
      entrees: 30,
      sorties: 25,
      stockFinal: 25,
    },
  ]

  // Filtrer les mouvements selon les critères
  const mouvementsFiltres = mouvementsStock.filter((mouvement) => {
    const matchCategorie = categorie === "all" || mouvement.categorie.toLowerCase() === categorie.toLowerCase()
    const matchRecherche = mouvement.designation.toLowerCase().includes(recherche.toLowerCase())
    return matchCategorie && matchRecherche
  })

  // Fonction pour appliquer les filtres
  const appliquerFiltres = () => {
    console.log("Filtres appliqués:", { categorie, periode })
    // Ici vous pourriez charger les données depuis une API avec ces filtres
  }

  // Fonction pour exporter les données
  const exporterDonnees = () => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Exportation des données</div>
        <div class="alerte-message">L'exportation des données a été initiée. Le fichier sera téléchargé dans quelques instants.</div>
        <div class="alerte-actions">
          <button class="bouton-confirmer-alerte">OK</button>
        </div>
      </div>
    `
    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonConfirmer.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })
  }

  // Marquer une notification comme lue
  const marquerCommeLue = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  // Supprimer une notification
  const supprimerNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  // Obtenir l'icône pour le type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="notification-icon warning" />
      case "success":
        return <CheckCircle className="notification-icon success" />
      case "info":
        return <Bell className="notification-icon info" />
      default:
        return <Bell className="notification-icon" />
    }
  }

  // Compter les notifications non lues
  const nonLues = notifications.filter((notif) => !notif.read).length

  return (
    <div className="suivi-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <h2>Suivi des Stocks</h2>

      <div className="suivi-layout">
        <div className="suivi-main">
          <div className="suivi-filters">
            <div className="filter-group">
              <label>
                <Filter size={16} /> Catégorie:
              </label>
              <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                <option value="all">Tous</option>
                <option value="fournitures">Fournitures</option>
                <option value="informatique">Informatique</option>
                <option value="entretien">Entretien</option>
              </select>
            </div>

            <div className="filter-group">
              <label>
                <Filter size={16} /> Période:
              </label>
              <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
                <option value="mois">Ce mois</option>
                <option value="trimestre">Ce trimestre</option>
                <option value="semestre">Ce semestre</option>
                <option value="annee">Cette année</option>
              </select>
            </div>

            <div className="filter-group search">
              <label>
                <Search size={16} /> Recherche:
              </label>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
            </div>

            <button className="btn-apply" onClick={appliquerFiltres}>
              Appliquer
            </button>

            <button className="btn-export" onClick={exporterDonnees}>
              <FileDown size={16} /> Exporter
            </button>
          </div>

          <div className="suivi-section">
            <div className="section-header">
              <h3>
                <BarChart3 size={18} /> Tableau de Suivi des Stocks
              </h3>
            </div>

            <div className="table-container">
              <table className="suivi-table">
                <thead>
                  <tr>
                    <th>Désignation</th>
                    <th>Catégorie</th>
                    <th>Stock Initial</th>
                    <th>Entrées</th>
                    <th>Sorties</th>
                    <th>Stock Final</th>
                    <th>Variation</th>
                  </tr>
                </thead>
                <tbody>
                  {mouvementsFiltres.length > 0 ? (
                    mouvementsFiltres.map((mouvement) => {
                      const variation = mouvement.stockFinal - mouvement.stockInitial
                      return (
                        <tr key={mouvement.id}>
                          <td>{mouvement.designation}</td>
                          <td>{mouvement.categorie}</td>
                          <td>{mouvement.stockInitial}</td>
                          <td className="entrees">{mouvement.entrees}</td>
                          <td className="sorties">{mouvement.sorties}</td>
                          <td>{mouvement.stockFinal}</td>
                          <td className={variation >= 0 ? "positive" : "negative"}>
                            {variation > 0 ? "+" : ""}
                            {variation}
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-data">
                        Aucune donnée trouvée pour les critères sélectionnés
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="suivi-summary">
            <div className="summary-card">
              <h4>Total Entrées</h4>
              <div className="summary-value">385</div>
            </div>
            <div className="summary-card">
              <h4>Total Sorties</h4>
              <div className="summary-value">313</div>
            </div>
            <div className="summary-card">
              <h4>Balance</h4>
              <div className="summary-value positive">+72</div>
            </div>
            <div className="summary-card">
              <h4>Articles Critiques</h4>
              <div className="summary-value warning">2</div>
            </div>
          </div>

          <div className="suivi-alerts">
            <h3>Alertes de stock</h3>
            <div className="alert-list">
              <div className="alert-item">
                <div className="alert-icon">⚠️</div>
                <div className="alert-details">
                  <p className="alert-title">Cartouches d'encre</p>
                  <p className="alert-description">Stock critique (20 unités restantes)</p>
                </div>
                <button className="btn-secondary">Commander</button>
              </div>
              <div className="alert-item">
                <div className="alert-icon">⚠️</div>
                <div className="alert-details">
                  <p className="alert-title">Papier A4</p>
                  <p className="alert-description">Stock bas (150 ramettes restantes)</p>
                </div>
                <button className="btn-secondary">Commander</button>
              </div>
            </div>
          </div>
        </div>

        <div className="suivi-sidebar">
          <div className="notifications-header">
            <h3>
              <Bell size={18} /> Notifications
              {nonLues > 0 && <span className="badge">{nonLues}</span>}
            </h3>
          </div>
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? "read" : "unread"}`}
                  onClick={() => marquerCommeLue(notification.id)}
                >
                  <div className="notification-icon-container">{getNotificationIcon(notification.type)}</div>
                  <div className="notification-content">
                    <div className="notification-title">{notification.title}</div>
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      <Clock size={12} /> {notification.time}
                    </div>
                  </div>
                  <button
                    className="notification-close"
                    onClick={(e) => {
                      e.stopPropagation()
                      supprimerNotification(notification.id)
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-notifications">Aucune notification</div>
            )}
          </div>
          <div className="notifications-footer">
            <button
              className="btn-mark-all-read"
              onClick={() => setNotifications(notifications.map((notif) => ({ ...notif, read: true })))}
              disabled={nonLues === 0}
            >
              Marquer tout comme lu
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuiviStock
