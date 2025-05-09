"use client"

import { useState, useEffect } from "react"
import { Search, FileDown } from "lucide-react"
import "./css/ImInventaire.css"

function ImInventaire() {
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [filtreMois, setFiltreMois] = useState("")
  const [filtreAnnee, setFiltreAnnee] = useState("")
  const [filtreStatut, setFiltreStatut] = useState("")
  const [showHistorique, setShowHistorique] = useState(false)
  const [loading, setLoading] = useState(false)
  const [agences, setAgences] = useState([])
  const [westernUnions, setWesternUnions] = useState([])
  const [directions, setDirections] = useState([])
  const [inventaireData, setInventaireData] = useState([])

  // Générer les options pour les années
  const genererOptionsAnnees = () => {
    const anneeActuelle = new Date().getFullYear()
    const annees = []
    for (let i = anneeActuelle - 5; i <= anneeActuelle; i++) {
      annees.push(i)
    }
    return annees.reverse()
  }

  // Simuler un chargement lors du montage du composant
  useEffect(() => {
    setLoading(true)

    // Simuler la récupération des données depuis l'API
    setTimeout(() => {
      // Récupérer les agences, Western Union et directions depuis le dispatche
      // Dans une implémentation réelle, cela serait un appel API
      setAgences([])
      setWesternUnions([])
      setDirections([])
      setInventaireData([])
      setLoading(false)
    }, 1000)
  }, [])

  // Écouter les événements de synchronisation avec le dispatche
  useEffect(() => {
    const handleAgenceAjoutee = (event) => {
      if (event.detail && event.detail.type === "agence") {
        setAgences((prev) => [...prev, event.detail])
      } else if (event.detail && event.detail.type === "wu") {
        setWesternUnions((prev) => [...prev, event.detail])
      } else if (event.detail && event.detail.type === "direction") {
        setDirections((prev) => [...prev, event.detail])
      }
    }

    window.addEventListener("dispatche:agence-ajoutee", handleAgenceAjoutee)

    return () => {
      window.removeEventListener("dispatche:agence-ajoutee", handleAgenceAjoutee)
    }
  }, [])

  // Fonction pour exporter en Excel
  const exporterEnExcel = () => {
    alert("Exportation en Excel initiée. Cette fonctionnalité sera implémentée ultérieurement.")
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

  // Filtrer les données d'inventaire
  const filteredInventaire = inventaireData.filter((item) => {
    const matchDesignation = item.designation.toLowerCase().includes(filtreDesignation.toLowerCase())
    const matchStatut = filtreStatut === "" || item.statut === filtreStatut
    return matchDesignation && matchStatut
  })

  return (
    <div className="inventaire-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <div className="inventaire-header">
        <h2>Inventaire des immobiliers</h2>
        <div className="inventaire-actions">
          <button className="btn-secondary" onClick={() => setShowHistorique(!showHistorique)}>
            {showHistorique ? "Masquer l'historique" : "Historique"}
          </button>
          <button className="btn-secondary" onClick={exporterEnExcel}>
            <FileDown size={16} /> Exporter
          </button>
        </div>
      </div>

      {showHistorique ? (
        <div className="historique-inventaires">
          <h3>Historique des inventaires</h3>
          <table className="table-historique">
            <thead>
              <tr>
                <th>Date</th>
                <th>Précision</th>
                <th>Écarts détectés</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="no-data">
                  Aucun historique disponible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="filtres-section">
            <div className="filtre-groupe">
              <div className="champ-recherche-wrapper">
                <Search size={18} className="icone-recherche" />
                <input
                  type="text"
                  placeholder="Rechercher par désignation..."
                  value={filtreDesignation}
                  onChange={(e) => setFiltreDesignation(e.target.value)}
                  className="champ-filtre"
                />
              </div>
            </div>

            <div className="filtre-groupe">
              <div className="select-wrapper">
                <label htmlFor="filtreStatut">Statut:</label>
                <select
                  id="filtreStatut"
                  value={filtreStatut}
                  onChange={(e) => setFiltreStatut(e.target.value)}
                  className="select-filtre"
                >
                  <option value="">Tous</option>
                  <option value="actif">Actif</option>
                  <option value="amorti">Amorti</option>
                </select>
              </div>
            </div>

            <div className="filtre-groupe">
              <div className="select-wrapper">
                <label htmlFor="filtreMois">Mois:</label>
                <select
                  id="filtreMois"
                  value={filtreMois}
                  onChange={(e) => setFiltreMois(e.target.value)}
                  className="select-filtre"
                >
                  <option value="">Tous</option>
                  <option value="1">Janvier</option>
                  <option value="2">Février</option>
                  <option value="3">Mars</option>
                  <option value="4">Avril</option>
                  <option value="5">Mai</option>
                  <option value="6">Juin</option>
                  <option value="7">Juillet</option>
                  <option value="8">Août</option>
                  <option value="9">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
              </div>
            </div>

            <div className="filtre-groupe">
              <div className="select-wrapper">
                <label htmlFor="filtreAnnee">Année:</label>
                <select
                  id="filtreAnnee"
                  value={filtreAnnee}
                  onChange={(e) => setFiltreAnnee(e.target.value)}
                  className="select-filtre"
                >
                  <option value="">Toutes</option>
                  {genererOptionsAnnees().map((annee) => (
                    <option key={annee} value={annee.toString()}>
                      {annee}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="tableau-container">
            <table className="tableau-inventaire">
              <thead>
                <tr>
                  <th>Code Article</th>
                  <th>Désignation</th>
                  <th>Code Barre</th>
                  <th>Prix d'achat</th>
                  <th>Type d'immobilier</th>
                  <th>Date d'acquisition</th>
                  <th>Quantité</th> 
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventaire.length > 0 ? (
                  filteredInventaire.map((item) => (
                    <tr key={item.id}>
                      <td>{item.codeArticle}</td>
                      <td>{item.designation}</td>
                      <td>{item.codeBarre}</td>
                      <td>{item.prixAchat.toLocaleString()} FCFA</td>
                      <td>{item.typeImmobilier}</td>
                      <td>{item.dateAcquisition}</td>
                      <td>{item.quantite || 1}</td> 
                      <td>
                        <span className={`statut-badge ${item.statut}`}>
                          {item.statut === "actif" ? "Actif" : "Amorti"}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn-action btn-edit" title="Modifier">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button className="btn-action btn-delete" title="Supprimer">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                          <button className="btn-action btn-view" title="Voir détails">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">
                      Aucun article trouvé. Utilisez la page "Stock" pour ajouter des articles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default ImInventaire
