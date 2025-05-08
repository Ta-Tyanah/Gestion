"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  ArrowRight,
  AlertTriangle,
  Package,
  BarChart,
  Plus,
  User,
  Building,
  Mail,
  Phone,
} from "lucide-react"
import "./css/gestion.css"

function GestionUtilisateurs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("Tous les types")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [nouvelleAgence, setNouvelleAgence] = useState("")
  const [nouveauRole, setNouveauRole] = useState("Gestionnaire d'agence")
  const [nouveauNom, setNouveauNom] = useState("")
  const [nouveauEmail, setNouveauEmail] = useState("")
  const [loading, setLoading] = useState(true)

  // Données initiales des utilisateurs
  const [users, setUsers] = useState([])

  // Simuler un chargement initial
  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Ajouter un effet pour synchroniser avec les agences du dispatche
  useEffect(() => {
    // Cette fonction serait remplacée par un appel API réel
    const synchroniserAvecDispatche = () => {
      // Simuler la récupération des agences depuis le dispatche
      console.log("Synchronisation avec la gestion des utilisateurs")
    }

    synchroniserAvecDispatche()

    // Écouter les événements de synchronisation
    const handleAgenceAjoutee = (e) => {
      // Ajouter un nouvel utilisateur basé sur l'agence ajoutée
      if (e.detail) {
        const nouvelUtilisateur = {
          id: Date.now(),
          nom: `Responsable ${e.detail.nom}`,
          role: e.detail.type || "Gestionnaire d'agence",
          agence: e.detail.nom,
          email: `contact@${e.detail.nom.toLowerCase()}.com`,
          telephone: "+261 34 00 000 00",
          dateCreation: new Date().toLocaleDateString(),
          stockCritique: false,
          stockLevel: 0,
          stockItems: [],
        }
        setUsers((prevUsers) => [...prevUsers, nouvelUtilisateur])
      }
    }

    // Ajouter l'écouteur d'événement
    window.addEventListener("dispatche:agence-ajoutee", handleAgenceAjoutee)

    return () => {
      window.removeEventListener("dispatche:agence-ajoutee", handleAgenceAjoutee)
    }
  }, [])

  // Ajouter un utilisateur
  const ajouterUtilisateur = () => {
    if (!nouveauNom || !nouvelleAgence || !nouveauEmail) {
      afficherMessage("Veuillez remplir tous les champs obligatoires", "erreur")
      return
    }

    const nouvelUtilisateur = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      nom: nouveauNom,
      role: nouveauRole,
      agence: nouvelleAgence,
      email: nouveauEmail,
      telephone: "+261 34 00 000 00",
      dateCreation: new Date().toLocaleDateString(),
      stockCritique: false,
      stockLevel: 0,
      stockItems: [],
    }

    setUsers([...users, nouvelUtilisateur])
    setNouveauNom("")
    setNouvelleAgence("")
    setNouveauEmail("")
    setNouveauRole("Gestionnaire d'agence")
    setShowAddUserModal(false)
    afficherMessage(`Utilisateur ${nouveauNom} ajouté avec succès!`, "succes")
  }

  // Fonction pour afficher un message
  const afficherMessage = (texte, type) => {
    const messageElement = document.createElement("div")
    messageElement.className = `alerte-flottante alerte-${type}`
    messageElement.innerHTML = `
      <div class="icone-alerte">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div class="texte-alerte">${texte}</div>
      <button class="fermer-alerte">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `

    document.body.appendChild(messageElement)

    // Ajouter l'animation d'entrée
    setTimeout(() => {
      messageElement.classList.add("visible")
    }, 10)

    // Ajouter l'événement pour fermer l'alerte
    const boutonFermer = messageElement.querySelector(".fermer-alerte")
    if (boutonFermer) {
      boutonFermer.addEventListener("click", () => {
        messageElement.classList.remove("visible")
        messageElement.classList.add("disparition")
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement)
          }
        }, 300)
      })
    }

    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.classList.remove("visible")
        messageElement.classList.add("disparition")
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement)
          }
        }, 300)
      }
    }, 5000)
  }

  // Filtrer les utilisateurs en fonction de la recherche et du filtre
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.agence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "Tous les types" || user.role === filterType

    return matchesSearch && matchesFilter
  })

  // Ouvrir le modal avec les détails de l'utilisateur
  const openUserDetails = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  // Obtenir les initiales pour l'avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="gestion-utilisateurs-container">
      <h1 className="page-title">Gestion des Utilisateurs</h1>

      <div className="search-filter-container">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <Filter className="filter-icon" size={18} />
          <label>Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option>Tous les types</option>
            <option>Gestionnaire d'agence</option>
            <option>Responsable Western Union</option>
            <option>Directeur régional</option>
          </select>
        </div>

        <button className="btn-add-user" onClick={() => setShowAddUserModal(true)}>
          <Plus size={16} /> Ajouter un utilisateur
        </button>
      </div>

      {/* Modal d'ajout d'utilisateur */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <div className="modal-header">
              <h2>Ajouter un utilisateur</h2>
              <button className="close-modal-btn" onClick={() => setShowAddUserModal(false)}>
                &times;
              </button>
            </div>
            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="nom">
                  <User size={16} /> Nom complet*
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={nouveauNom}
                  onChange={(e) => setNouveauNom(e.target.value)}
                  required
                  placeholder="Ex: Rakoto Jean"
                />
              </div>
              <div className="groupe-champ">
                <label htmlFor="email">
                  <Mail size={16} /> Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={nouveauEmail}
                  onChange={(e) => setNouveauEmail(e.target.value)}
                  required
                  placeholder="Ex: rakoto.jean@example.com"
                />
              </div>
              <div className="groupe-champ">
                <label htmlFor="agence">
                  <Building size={16} /> Agence*
                </label>
                <input
                  id="agence"
                  name="agence"
                  type="text"
                  value={nouvelleAgence}
                  onChange={(e) => setNouvelleAgence(e.target.value)}
                  required
                  placeholder="Ex: CEM01"
                />
              </div>
              <div className="groupe-champ">
                <label htmlFor="role">Rôle*</label>
                <select
                  id="role"
                  name="role"
                  value={nouveauRole}
                  onChange={(e) => setNouveauRole(e.target.value)}
                  required
                >
                  <option value="Gestionnaire d'agence">Gestionnaire d'agence</option>
                  <option value="Responsable Western Union">Responsable Western Union</option>
                  <option value="Directeur régional">Directeur régional</option>
                </select>
              </div>
              <div className="actions-modal">
                <button className="bouton-annuler" onClick={() => setShowAddUserModal(false)}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={ajouterUtilisateur}
                  disabled={!nouveauNom || !nouvelleAgence || !nouveauEmail}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Chargement des utilisateurs...</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <div className="user-avatar">
                    <div className="avatar-circle">{getInitials(user.nom)}</div>
                  </div>
                  <div className="user-info">
                    <h3>{user.nom}</h3>
                    <p>{user.role}</p>
                    <p className="user-agence">
                      Agence: <span>{user.agence}</span>
                    </p>
                  </div>
                  {user.stockCritique && (
                    <button className="stock-alert-btn" onClick={() => openUserDetails(user)}>
                      <AlertTriangle size={16} /> Stock critique
                    </button>
                  )}
                </div>

                <div className="user-details">
                  <div className="detail-item">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                  <div className="detail-item">
                    <Phone size={16} />
                    <span>{user.telephone}</span>
                  </div>
                </div>

                <div className="stock-progress-container">
                  <div className="stock-label">
                    <span>Niveau de stock</span>
                    <span>{user.stockLevel}%</span>
                  </div>
                  <div className="stock-progress-bar">
                    <div
                      className={`stock-progress ${user.stockLevel < 30 ? "low" : user.stockLevel < 70 ? "medium" : "high"}`}
                      style={{ width: `${user.stockLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className="user-actions">
                  <button className="view-details-btn" onClick={() => openUserDetails(user)}>
                    Voir détails <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <User size={48} />
              </div>
              <h3>Aucun utilisateur trouvé</h3>
              <p>Aucun utilisateur ne correspond à votre recherche ou aucun utilisateur n'a été créé.</p>
              <button className="btn-add-user" onClick={() => setShowAddUserModal(true)}>
                <Plus size={16} /> Ajouter un utilisateur
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal de détails utilisateur */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="user-details-modal">
            <div className="modal-header">
              <div className="user-modal-info">
                <div className="modal-avatar">{getInitials(selectedUser.nom)}</div>
                <div>
                  <h2>{selectedUser.nom}</h2>
                  <p>
                    {selectedUser.role} - {selectedUser.agence}
                  </p>
                </div>
              </div>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-content">
              <div className="user-contact-info">
                <div className="contact-item">
                  <Mail size={18} />
                  <span>{selectedUser.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <span>{selectedUser.telephone}</span>
                </div>
                <div className="contact-item">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Créé le {selectedUser.dateCreation}</span>
                </div>
              </div>

              <div className="user-stats">
                <div className="stat-box">
                  <div className="stat-icon">
                    <Package size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>Articles en stock</h4>
                    <p>{selectedUser.stockItems.reduce((total, item) => total + item.quantite, 0)}</p>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>Articles critiques</h4>
                    <p>{selectedUser.stockItems.filter((item) => item.quantite < item.seuil).length}</p>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon">
                    <BarChart size={24} />
                  </div>
                  <div className="stat-info">
                    <h4>Valeur totale</h4>
                    <p>
                      {selectedUser.stockItems
                        .reduce((total, item) => total + item.quantite * item.cmup, 0)
                        .toLocaleString()}{" "}
                      Ar
                    </p>
                  </div>
                </div>
              </div>

              <div className="stock-details">
                <h3>Détails du stock</h3>
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Quantité</th>
                      <th>Seuil critique</th>
                      <th>CMUP</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser.stockItems.length > 0 ? (
                      selectedUser.stockItems.map((item) => (
                        <tr key={item.id} className={item.quantite < item.seuil ? "critical-row" : ""}>
                          <td>{item.designation}</td>
                          <td>{item.quantite}</td>
                          <td>{item.seuil}</td>
                          <td>{item.cmup.toLocaleString()} Ar</td>
                          <td>
                            <span className={`status-badge ${item.quantite < item.seuil ? "critical" : "normal"}`}>
                              {item.quantite < item.seuil ? "Critique" : "Normal"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="no-data">
                          Aucun article en stock
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="user-actions-footer">
                <button className="action-btn send-stock">Envoyer du stock</button>
                <button className="action-btn contact-user">Contacter l'utilisateur</button>
                <button className="action-btn edit-user">Modifier l'utilisateur</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionUtilisateurs
