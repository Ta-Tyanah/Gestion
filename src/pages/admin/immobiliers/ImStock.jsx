"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash, Search, Save, Barcode } from "lucide-react"
import "./css/ImStock.css"

function ImStock() {
  const [loading, setLoading] = useState(false)
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [modalOuvert, setModalOuvert] = useState(false)
  const [immobilierEnEdition, setImmobilierEnEdition] = useState(null)
  const [nouvelImmobilier, setNouvelImmobilier] = useState({
    codeArticle: "",
    designation: "",
    codeBarre: "",
    prixAchat: "",
    typeImmobilier: "",
    dateAcquisition: new Date().toISOString().split("T")[0],
  })

  // Tableau vide pour les immobiliers (à remplir avec des données réelles)
  const [immobilierItems, setImmobilierItems] = useState([])

  // Simuler un chargement lors du montage du composant
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Appliquer des styles supplémentaires pour améliorer l'alignement
    const style = document.createElement("style")
    style.textContent = `
      .imstock-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      
      .imstock-table th,
      .imstock-table td {
        padding: 12px 16px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .imstock-table th {
        background-color: #f5f5f5;
        font-weight: 600;
        color: #333;
      }
      
      .imstock-table tr:last-child td {
        border-bottom: none;
      }
      
      .imstock-table tr:hover {
        background-color: #f9f9f9;
      }
      
      .code-barre-cell {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .code-barre-value {
        font-family: monospace;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Générer un code barre EAN-13
  const genererCodeBarre = () => {
    // Générer 12 chiffres aléatoires
    let code = "978" // Préfixe pour les livres (juste pour l'exemple)
    for (let i = 0; i < 9; i++) {
      code += Math.floor(Math.random() * 10)
    }

    // Calculer le chiffre de contrôle
    let somme = 0
    for (let i = 0; i < 12; i++) {
      somme += Number.parseInt(code[i]) * (i % 2 === 0 ? 1 : 3)
    }
    const chiffreControle = (10 - (somme % 10)) % 10

    return code + chiffreControle
  }

  // Ouvrir le modal pour ajouter un nouvel immobilier
  const ouvrirModalAjout = () => {
    setImmobilierEnEdition(null)
    setNouvelImmobilier({
      codeArticle: `IMM-${String(immobilierItems.length + 1).padStart(3, "0")}`,
      designation: "",
      codeBarre: genererCodeBarre(),
      prixAchat: "",
      typeImmobilier: "",
      dateAcquisition: new Date().toISOString().split("T")[0],
    })
    setModalOuvert(true)
  }

  // Ouvrir le modal pour éditer un immobilier existant
  const ouvrirModalEdition = (immobilier) => {
    setImmobilierEnEdition(immobilier)
    setNouvelImmobilier({
      codeArticle: immobilier.codeArticle,
      designation: immobilier.designation,
      codeBarre: immobilier.codeBarre,
      prixAchat: immobilier.prixAchat.toString(),
      typeImmobilier: immobilier.typeImmobilier,
      dateAcquisition: immobilier.dateAcquisition,
    })
    setModalOuvert(true)
  }

  // Fermer le modal
  const fermerModal = () => {
    setModalOuvert(false)
  }

  // Mettre à jour les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNouvelImmobilier({
      ...nouvelImmobilier,
      [name]: value,
    })
  }

  // Régénérer le code barre
  const regenererCodeBarre = () => {
    setNouvelImmobilier({
      ...nouvelImmobilier,
      codeBarre: genererCodeBarre(),
    })
  }

  // Sauvegarder l'immobilier
  const sauvegarderImmobilier = () => {
    if (immobilierEnEdition) {
      // Mise à jour d'un immobilier existant
      const immobiliersModifies = immobilierItems.map((item) => {
        if (item.id === immobilierEnEdition.id) {
          return {
            ...item,
            codeArticle: nouvelImmobilier.codeArticle,
            designation: nouvelImmobilier.designation,
            codeBarre: nouvelImmobilier.codeBarre,
            prixAchat: Number.parseFloat(nouvelImmobilier.prixAchat),
            typeImmobilier: nouvelImmobilier.typeImmobilier,
            dateAcquisition: nouvelImmobilier.dateAcquisition,
          }
        }
        return item
      })

      setImmobilierItems(immobiliersModifies)
      afficherMessage("Immobilier modifié avec succès!", "succes")
    } else {
      // Ajout d'un nouvel immobilier
      const nouvelImmobilierComplet = {
        id: Date.now(),
        codeArticle: nouvelImmobilier.codeArticle,
        designation: nouvelImmobilier.designation,
        codeBarre: nouvelImmobilier.codeBarre,
        prixAchat: Number.parseFloat(nouvelImmobilier.prixAchat),
        typeImmobilier: nouvelImmobilier.typeImmobilier,
        dateAcquisition: nouvelImmobilier.dateAcquisition,
        etat: "Bon", // Par défaut
      }

      setImmobilierItems([...immobilierItems, nouvelImmobilierComplet])
      afficherMessage("Immobilier ajouté avec succès!", "succes")
    }

    fermerModal()
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

  // Supprimer un immobilier
  const supprimerImmobilier = (id) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cet immobilier ?</div>
        <div class="alerte-actions">
          <button class="bouton-annuler-alerte">Annuler</button>
          <button class="bouton-confirmer-alerte">Supprimer</button>
        </div>
      </div>
    `
    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer l'immobilier
      setImmobilierItems(immobilierItems.filter((item) => item.id !== id))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        afficherMessage("Immobilier supprimé avec succès!", "succes")
      }, 300)
    })
  }

  // Filtrer les immobiliers
  const immobiliersFiltres = immobilierItems.filter(
    (item) =>
      item.designation.toLowerCase().includes(filtreDesignation.toLowerCase()) ||
      item.codeArticle.toLowerCase().includes(filtreDesignation.toLowerCase()) ||
      item.typeImmobilier.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Formater le prix
  const formaterPrix = (prix) => {
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  return (
    <div className="imstock-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <h2 className="page-title">Gestion du stock des immobiliers</h2>

      <div className="imstock-header">
        <div className="imstock-actions">
          <button className="btn-add" onClick={ouvrirModalAjout}>
            <Plus size={16} /> Ajouter un bien
          </button>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un bien..."
              value={filtreDesignation}
              onChange={(e) => setFiltreDesignation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="imstock-table-container">
        <table className="imstock-table">
          <thead>
            <tr>
              <th>Code Article</th>
              <th>Désignation</th>
              <th>Code Barre</th>
              <th>Prix d'achat</th>
              <th>Type d'immobilier</th>
              <th>Date d'acquisition</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {immobiliersFiltres.length > 0 ? (
              immobiliersFiltres.map((item) => (
                <tr key={item.id}>
                  <td>{item.codeArticle}</td>
                  <td>{item.designation}</td>
                  <td className="code-barre-cell">
                    <span className="code-barre-value">{item.codeBarre}</span>
                    <Barcode size={16} className="code-barre-icon" />
                  </td>
                  <td>{formaterPrix(item.prixAchat)} Ar</td>
                  <td>{item.typeImmobilier}</td>
                  <td>{item.dateAcquisition}</td>
                  <td>
                    <span className={`etat-badge etat-${item.etat.toLowerCase()}`}>{item.etat}</span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => ouvrirModalEdition(item)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-delete" onClick={() => supprimerImmobilier(item.id)}>
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-data">
                  Aucun immobilier trouvé. Utilisez le bouton "Ajouter un bien" pour en créer un.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal d'ajout/modification */}
      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{immobilierEnEdition ? "Modifier" : "Ajouter"} un immobilier</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="codeArticle">Code Article</label>
                <input
                  id="codeArticle"
                  name="codeArticle"
                  type="text"
                  value={nouvelImmobilier.codeArticle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="designation">Désignation</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={nouvelImmobilier.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="codeBarre">Code Barre</label>
                <div className="input-with-button">
                  <input
                    id="codeBarre"
                    name="codeBarre"
                    type="text"
                    value={nouvelImmobilier.codeBarre}
                    onChange={handleInputChange}
                    readOnly
                  />
                  <button type="button" className="btn-regenerate" onClick={regenererCodeBarre}>
                    <Barcode size={16} /> Générer
                  </button>
                </div>
              </div>

              <div className="groupe-champ">
                <label htmlFor="prixAchat">Prix d'achat (Ar)</label>
                <input
                  id="prixAchat"
                  name="prixAchat"
                  type="number"
                  value={nouvelImmobilier.prixAchat}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="typeImmobilier">Type d'immobilier</label>
                <select
                  id="typeImmobilier"
                  name="typeImmobilier"
                  value={nouvelImmobilier.typeImmobilier}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="Informatique">Informatique</option>
                  <option value="Mobilier">Mobilier</option>
                  <option value="Véhicule">Véhicule</option>
                  <option value="Bâtiment">Bâtiment</option>
                  <option value="Équipement">Équipement</option>
                </select>
              </div>

              <div className="groupe-champ">
                <label htmlFor="dateAcquisition">Date d'acquisition</label>
                <input
                  id="dateAcquisition"
                  name="dateAcquisition"
                  type="date"
                  value={nouvelImmobilier.dateAcquisition}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModal}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderImmobilier}
                  disabled={
                    !nouvelImmobilier.codeArticle ||
                    !nouvelImmobilier.designation ||
                    !nouvelImmobilier.codeBarre ||
                    !nouvelImmobilier.prixAchat ||
                    !nouvelImmobilier.typeImmobilier ||
                    !nouvelImmobilier.dateAcquisition
                  }
                >
                  <Save size={16} /> Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImStock
