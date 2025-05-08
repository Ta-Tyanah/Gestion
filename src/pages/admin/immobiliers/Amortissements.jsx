"use client"

import { useState, useEffect } from "react"
import { Search, Filter, FileDown, Calculator } from "lucide-react"
import "./css/Amortissements.css"

function Amortissements() {
  const [loading, setLoading] = useState(false)
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [filtreType, setFiltreType] = useState("")
  const [modalOuvert, setModalOuvert] = useState(false)
  const [immobilierSelectionne, setImmobilierSelectionne] = useState(null)

  // Tableau vide pour les immobiliers (à remplir avec des données réelles)
  const immobiliers = []

  // Simuler un chargement lors du montage du composant
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrer les immobiliers
  const immobiliersFiltres = immobiliers.filter((item) => {
    const matchDesignation =
      item.designation.toLowerCase().includes(filtreDesignation.toLowerCase()) ||
      item.codeArticle.toLowerCase().includes(filtreDesignation.toLowerCase())
    const matchType = filtreType === "" || item.typeImmobilier === filtreType
    return matchDesignation && matchType
  })

  // Ouvrir le modal de détail d'amortissement
  const ouvrirModalDetail = (immobilier) => {
    setImmobilierSelectionne(immobilier)
    setModalOuvert(true)
  }

  // Fermer le modal
  const fermerModal = () => {
    setModalOuvert(false)
    setImmobilierSelectionne(null)
  }

  // Formater le prix
  const formaterPrix = (prix) => {
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  // Exporter les données
  const exporterDonnees = () => {
    alert("Exportation des données initiée. Le fichier sera téléchargé dans quelques instants.")
  }

  return (
    <div className="amortissements-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <h2 className="page-title">Amortissements des immobilisations</h2>

      <div className="amortissements-filters">
        <div className="filter-group">
          <label>
            <Search size={16} /> Recherche:
          </label>
          <input
            type="text"
            placeholder="Rechercher par désignation ou code..."
            value={filtreDesignation}
            onChange={(e) => setFiltreDesignation(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>
            <Filter size={16} /> Type:
          </label>
          <select value={filtreType} onChange={(e) => setFiltreType(e.target.value)}>
            <option value="">Tous les types</option>
            <option value="Informatique">Informatique</option>
            <option value="Mobilier">Mobilier</option>
            <option value="Véhicule">Véhicule</option>
            <option value="Bâtiment">Bâtiment</option>
            <option value="Équipement">Équipement</option>
          </select>
        </div>

        <button className="btn-export" onClick={exporterDonnees}>
          <FileDown size={16} /> Exporter
        </button>
      </div>

      <div className="amortissements-table-container">
        <table className="amortissements-table">
          <thead>
            <tr>
              <th>Code Article</th>
              <th>Désignation</th>
              <th>Type</th>
              <th>Date d'acquisition</th>
              <th>État d'amortissement</th>
              <th>Durée (années)</th>
              <th>Taux (%)</th>
              <th>VNC actuelle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {immobiliersFiltres.length > 0 ? (
              immobiliersFiltres.map((item) => {
                // Calculer la VNC actuelle
                const anneeActuelle = new Date().getFullYear()
                const amortissementActuel =
                  item.amortissements.find((a) => a.annee === anneeActuelle) ||
                  item.amortissements[item.amortissements.length - 1]
                const vncActuelle = amortissementActuel ? amortissementActuel.valeurNetteComptable : 0

                return (
                  <tr key={item.id}>
                    <td>{item.codeArticle}</td>
                    <td>{item.designation}</td>
                    <td>{item.typeImmobilier}</td>
                    <td>{item.dateAcquisition}</td>
                    <td>
                      <span className={`etat-amortissement ${vncActuelle === 0 ? "amorti" : "actif"}`}>
                        {vncActuelle === 0 ? "Amorti" : "Actif"}
                      </span>
                    </td>
                    <td>{item.dureeAmortissement} ans</td>
                    <td>{item.tauxAmortissement}%</td>
                    <td>{formaterPrix(vncActuelle)} Ar</td>
                    <td className="actions-cell">
                      <button className="btn-detail" onClick={() => ouvrirModalDetail(item)}>
                        <Calculator size={16} /> Détails
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="9" className="no-data">
                  Aucun immobilier trouvé pour les critères sélectionnés.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de détail d'amortissement */}
      {modalOuvert && immobilierSelectionne && (
        <div className="modal-overlay">
          <div className="modal-contenu modal-large">
            <h2>Tableau d'amortissement - {immobilierSelectionne.designation}</h2>

            <div className="amortissement-info">
              <div className="info-group">
                <span className="info-label">Code Article:</span>
                <span className="info-value">{immobilierSelectionne.codeArticle}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Type:</span>
                <span className="info-value">{immobilierSelectionne.typeImmobilier}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Date d'acquisition:</span>
                <span className="info-value">{immobilierSelectionne.dateAcquisition}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Prix d'achat:</span>
                <span className="info-value">{formaterPrix(immobilierSelectionne.prixAchat)} Ar</span>
              </div>
              <div className="info-group">
                <span className="info-label">Durée d'amortissement:</span>
                <span className="info-value">{immobilierSelectionne.dureeAmortissement} ans</span>
              </div>
              <div className="info-group">
                <span className="info-label">Taux d'amortissement:</span>
                <span className="info-value">{immobilierSelectionne.tauxAmortissement}%</span>
              </div>
            </div>

            <div className="tableau-amortissement-container">
              <table className="tableau-amortissement">
                <thead>
                  <tr>
                    <th>Année</th>
                    <th>Base amortissable</th>
                    <th>Dotation annuelle</th>
                    <th>Valeur nette comptable</th>
                  </tr>
                </thead>
                <tbody>
                  {immobilierSelectionne.amortissements.map((amort, index) => (
                    <tr key={index}>
                      <td>{amort.annee}</td>
                      <td>{formaterPrix(amort.baseAmortissable)} Ar</td>
                      <td>{formaterPrix(amort.dotation)} Ar</td>
                      <td>{formaterPrix(amort.valeurNetteComptable)} Ar</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="actions-modal">
              <button className="bouton-fermer" onClick={fermerModal}>
                Fermer
              </button>
              <button className="bouton-exporter">
                <FileDown size={16} /> Exporter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Amortissements
