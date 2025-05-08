"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash, Save } from "lucide-react"
import "./css/ImDispatche.css"

function ImDispatche() {
  // État pour le chargement
  const [loading, setLoading] = useState(false)

  // État pour les agences normaux
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [nouvelleAgence, setNouvelleAgence] = useState("")
  const [listeAgencesOuverte, setListeAgencesOuverte] = useState(false)
  const [modalOuvert, setModalOuvert] = useState(false)
  const [agences, setAgences] = useState([])
  const [dispatches, setDispatches] = useState([])
  const [dispatchEnEdition, setDispatchEnEdition] = useState(null)
  const [nouveauDispatch, setNouveauDispatch] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  // État pour les Western Union
  const [filtreWesternUnion, setFiltreWesternUnion] = useState("")
  const [nouvelleAgenceWU, setNouvelleAgenceWU] = useState("")
  const [listeAgencesWUOuverte, setListeAgencesWUOuverte] = useState(false)
  const [modalWesternUnionOuvert, setModalWesternUnionOuvert] = useState(false)
  const [agencesWU, setAgencesWU] = useState([])
  const [westernUnions, setWesternUnions] = useState([])
  const [westernUnionEnEdition, setWesternUnionEnEdition] = useState(null)
  const [nouveauWesternUnion, setNouveauWesternUnion] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  // État pour les Directions
  const [filtreDirection, setFiltreDirection] = useState("")
  const [nouvelleAgenceDir, setNouvelleAgenceDir] = useState("")
  const [listeAgencesDirOuverte, setListeAgencesDirOuverte] = useState(false)
  const [modalDirectionOuvert, setModalDirectionOuvert] = useState(false)
  const [agencesDir, setAgencesDir] = useState([])
  const [directions, setDirections] = useState([])
  const [directionEnEdition, setDirectionEnEdition] = useState(null)
  const [nouvelleDirection, setNouvelleDirection] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Simuler un chargement lors du montage du composant
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

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

  // Fonction pour basculer l'affichage de la liste des agences
  const toggleListeAgences = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setListeAgencesOuverte(!listeAgencesOuverte)
    setListeAgencesWUOuverte(false)
    setListeAgencesDirOuverte(false)
  }

  // Fonction pour basculer l'affichage de la liste des agences Western Union
  const toggleListeAgencesWU = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setListeAgencesWUOuverte(!listeAgencesWUOuverte)
    setListeAgencesOuverte(false)
    setListeAgencesDirOuverte(false)
  }

  // Fonction pour basculer l'affichage de la liste des agences Direction
  const toggleListeAgencesDir = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setListeAgencesDirOuverte(!listeAgencesDirOuverte)
    setListeAgencesOuverte(false)
    setListeAgencesWUOuverte(false)
  }

  // Fermer les listes si on clique ailleurs
  useEffect(() => {
    const fermerListesSiClicExterieur = () => {
      setListeAgencesOuverte(false)
      setListeAgencesWUOuverte(false)
      setListeAgencesDirOuverte(false)
    }

    document.addEventListener("click", fermerListesSiClicExterieur)
    return () => {
      document.removeEventListener("click", fermerListesSiClicExterieur)
    }
  }, [])

  // SECTION AGENCES NORMALES
  // Fonction pour ajouter une agence
  const ajouterAgence = () => {
    if (!nouvelleAgence.trim()) return

    const nouvelleAgenceObj = {
      id: agences.length > 0 ? Math.max(...agences.map((a) => a.id)) + 1 : 1,
      nom: nouvelleAgence,
    }

    setAgences([...agences, nouvelleAgenceObj])
    setNouvelleAgence("")

    // Mettre à jour les dispatches existants pour inclure la nouvelle agence
    const dispatchesUpdated = dispatches.map((dispatch) => ({
      ...dispatch,
      consommations: [...(dispatch.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setDispatches(dispatchesUpdated)

    // Synchroniser avec la gestion des utilisateurs
    // Cette fonction serait implémentée pour communiquer avec le backend
    synchroniserAvecGestionUtilisateurs(nouvelleAgenceObj)

    afficherMessage("Agence ajoutée avec succès!", "succes")
  }

  // Fonction pour synchroniser avec la gestion des utilisateurs
  const synchroniserAvecGestionUtilisateurs = (agence) => {
    // Cette fonction serait implémentée pour communiquer avec le backend
    console.log("Synchronisation avec la gestion des utilisateurs:", agence)
    // Dans une implémentation réelle, on enverrait une requête au backend
  }

  // Fonction pour supprimer une agence
  const supprimerAgence = (agenceId) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence ?</div>
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
      // Supprimer l'agence
      setAgences(agences.filter((a) => a.id !== agenceId))

      // Mettre à jour les dispatches pour retirer cette agence
      const dispatchesUpdated = dispatches.map((dispatch) => ({
        ...dispatch,
        consommations: dispatch.consommations.filter((c) => c.agenceId !== agenceId),
      }))
      setDispatches(dispatchesUpdated)

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        setListeAgencesOuverte(false)
        afficherMessage("Agence supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Ouvrir le modal pour ajouter un nouveau dispatch
  const ouvrirModal = () => {
    setDispatchEnEdition(null)
    setNouveauDispatch({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
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
    setNouveauDispatch({
      ...nouveauDispatch,
      [name]: value,
    })
  }

  // Ajouter ou modifier un dispatch
  const sauvegarderDispatch = () => {
    if (dispatchEnEdition) {
      // Mettre à jour un dispatch existant
      const dispatchesUpdated = dispatches.map((d) =>
        d.id === dispatchEnEdition.id
          ? {
              ...d,
              designation: nouveauDispatch.designation,
              quantite: Number.parseInt(nouveauDispatch.quantite),
              date: nouveauDispatch.date,
            }
          : d,
      )
      setDispatches(dispatchesUpdated)
      afficherMessage("Dispatch modifié avec succès!", "succes")
    } else {
      // Ajouter un nouveau dispatch
      const nouveauId = dispatches.length > 0 ? Math.max(...dispatches.map((d) => d.id)) + 1 : 1

      const dispatch = {
        id: nouveauId,
        designation: nouveauDispatch.designation,
        quantite: Number.parseInt(nouveauDispatch.quantite),
        date: nouveauDispatch.date,
        consommations: agences.map((agence) => ({ agenceId: agence.id, quantite: 0 })),
      }

      setDispatches([...dispatches, dispatch])
      afficherMessage("Dispatch ajouté avec succès!", "succes")
    }

    fermerModal()
  }

  // Mettre à jour la consommation
  const mettreAJourConsommation = (dispatchId, agenceId, quantite) => {
    const dispatchesUpdated = dispatches.map((dispatch) => {
      if (dispatch.id === dispatchId) {
        const consommationsUpdated = dispatch.consommations.map((c) =>
          c.agenceId === agenceId ? { ...c, quantite: Number.parseInt(quantite) || 0 } : c,
        )
        return { ...dispatch, consommations: consommationsUpdated }
      }
      return dispatch
    })

    setDispatches(dispatchesUpdated)
  }

  // Activer/désactiver le mode édition pour un dispatch
  const toggleEditionDispatch = (id) => {
    setDispatchEnEdition(dispatchEnEdition === id ? null : id)

    if (dispatchEnEdition === id) {
      afficherMessage("Modifications enregistrées avec succès!", "succes")
    }
  }

  // Supprimer un dispatch
  const supprimerDispatch = (id) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer ce dispatch ?</div>
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
      // Supprimer le dispatch
      setDispatches(dispatches.filter((d) => d.id !== id))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        afficherMessage("Dispatch supprimé avec succès!", "succes")
      }, 300)
    })
  }

  // SECTION WESTERN UNION
  // Fonction pour ajouter une agence Western Union
  const ajouterAgenceWU = () => {
    if (!nouvelleAgenceWU.trim()) return

    const nouvelleAgenceObj = {
      id: agencesWU.length > 0 ? Math.max(...agencesWU.map((a) => a.id)) + 1 : 1,
      nom: nouvelleAgenceWU,
    }

    setAgencesWU([...agencesWU, nouvelleAgenceObj])
    setNouvelleAgenceWU("")

    // Mettre à jour les Western Unions existants pour inclure la nouvelle agence
    const westernUnionsUpdated = westernUnions.map((wu) => ({
      ...wu,
      consommations: [...(wu.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setWesternUnions(westernUnionsUpdated)

    // Synchroniser avec la gestion des utilisateurs
    synchroniserAvecGestionUtilisateurs(nouvelleAgenceObj)

    afficherMessage("Agence Western Union ajoutée avec succès!", "succes")
  }

  // Fonction pour supprimer une agence Western Union
  const supprimerAgenceWU = (agenceId) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence Western Union ?</div>
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
        afficherMessage("Western Union supprimé avec succès!", "succes")
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer l'agence
      setAgencesWU(agencesWU.filter((a) => a.id !== agenceId))

      // Mettre à jour les Western Unions pour retirer cette agence
      const westernUnionsUpdated = westernUnions.map((wu) => ({
        ...wu,
        consommations: wu.consommations.filter((c) => c.agenceId !== agenceId),
      }))
      setWesternUnions(westernUnionsUpdated)

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        setListeAgencesWUOuverte(false)
        afficherMessage("Agence Western Union supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Ouvrir le modal pour ajouter un nouveau Western Union
  const ouvrirModalWesternUnion = () => {
    setWesternUnionEnEdition(null)
    setNouveauWesternUnion({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    setModalWesternUnionOuvert(true)
  }

  // Fermer le modal Western Union
  const fermerModalWesternUnion = () => {
    setModalWesternUnionOuvert(false)
  }

  // Mettre à jour les champs du formulaire Western Union
  const handleWesternUnionInputChange = (e) => {
    const { name, value } = e.target
    setNouveauWesternUnion({
      ...nouveauWesternUnion,
      [name]: value,
    })
  }

  // Ajouter ou modifier un Western Union
  const sauvegarderWesternUnion = () => {
    if (westernUnionEnEdition) {
      // Mettre à jour un Western Union existant
      const westernUnionsUpdated = westernUnions.map((wu) =>
        wu.id === westernUnionEnEdition.id
          ? {
              ...wu,
              designation: nouveauWesternUnion.designation,
              quantite: Number.parseInt(nouveauWesternUnion.quantite),
              date: nouveauWesternUnion.date,
            }
          : wu,
      )
      setWesternUnions(westernUnionsUpdated)
      afficherMessage("Western Union modifié avec succès!", "succes")
    } else {
      // Ajouter un nouveau Western Union
      const nouveauId = westernUnions.length > 0 ? Math.max(...westernUnions.map((wu) => wu.id)) + 1 : 1

      const westernUnion = {
        id: nouveauId,
        designation: nouveauWesternUnion.designation,
        quantite: Number.parseInt(nouveauWesternUnion.quantite),
        date: nouveauWesternUnion.date,
        consommations: agencesWU.map((agence) => ({ agenceId: agence.id, quantite: 0 })),
      }

      setWesternUnions([...westernUnions, westernUnion])
      afficherMessage("Western Union ajouté avec succès!", "succes")
    }

    fermerModalWesternUnion()
  }

  // Mettre à jour la consommation Western Union
  const mettreAJourConsommationWU = (westernUnionId, agenceId, quantite) => {
    const westernUnionsUpdated = westernUnions.map((wu) => {
      if (wu.id === westernUnionId) {
        const consommationsUpdated = wu.consommations.map((c) =>
          c.agenceId === agenceId ? { ...c, quantite: Number.parseInt(quantite) || 0 } : c,
        )
        return { ...wu, consommations: consommationsUpdated }
      }
      return wu
    })

    setWesternUnions(westernUnionsUpdated)
  }

  // Activer/désactiver le mode édition pour un Western Union
  const toggleEditionWesternUnion = (id) => {
    setWesternUnionEnEdition(westernUnionEnEdition === id ? null : id)

    if (westernUnionEnEdition === id) {
      afficherMessage("Modifications enregistrées avec succès!", "succes")
    }
  }

  // Supprimer un Western Union
  const supprimerWesternUnion = (id) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer ce Western Union ?</div>
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
        afficherMessage("Western Union supprimé avec succès!", "succes")
      }, 300)
    })
  }

  // SECTION DIRECTIONS
  // Fonction pour ajouter une agence Direction
  const ajouterAgenceDir = () => {
    if (!nouvelleAgenceDir.trim()) return

    const nouvelleAgenceObj = {
      id: agencesDir.length > 0 ? Math.max(...agencesDir.map((a) => a.id)) + 1 : 1,
      nom: nouvelleAgenceDir,
    }

    setAgencesDir([...agencesDir, nouvelleAgenceObj])
    setNouvelleAgenceDir("")

    // Mettre à jour les Directions existantes pour inclure la nouvelle agence
    const directionsUpdated = directions.map((dir) => ({
      ...dir,
      consommations: [...(dir.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setDirections(directionsUpdated)

    // Synchroniser avec la gestion des utilisateurs
    synchroniserAvecGestionUtilisateurs(nouvelleAgenceObj)

    afficherMessage("Agence Direction ajoutée avec succès!", "succes")
  }

  // Fonction pour supprimer une agence Direction
  const supprimerAgenceDir = (agenceId) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence Direction ?</div>
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
      // Supprimer l'agence
      setAgencesDir(agencesDir.filter((a) => a.id !== agenceId))

      // Mettre à jour les Directions pour retirer cette agence
      const directionsUpdated = directions.map((dir) => ({
        ...dir,
        consommations: dir.consommations.filter((c) => c.agenceId !== agenceId),
      }))
      setDirections(directionsUpdated)

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        setListeAgencesDirOuverte(false)
        afficherMessage("Agence Direction supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Ouvrir le modal pour ajouter une nouvelle Direction
  const ouvrirModalDirection = () => {
    setDirectionEnEdition(null)
    setNouvelleDirection({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    setModalDirectionOuvert(true)
  }

  // Fermer le modal Direction
  const fermerModalDirection = () => {
    setModalDirectionOuvert(false)
  }

  // Mettre à jour les champs du formulaire Direction
  const handleDirectionInputChange = (e) => {
    const { name, value } = e.target
    setNouvelleDirection({
      ...nouvelleDirection,
      [name]: value,
    })
  }

  // Ajouter ou modifier une Direction
  const sauvegarderDirection = () => {
    if (directionEnEdition) {
      // Mettre à jour une Direction existante
      const directionsUpdated = directions.map((dir) =>
        dir.id === directionEnEdition.id
          ? {
              ...dir,
              designation: nouvelleDirection.designation,
              quantite: Number.parseInt(nouvelleDirection.quantite),
              date: nouvelleDirection.date,
            }
          : dir,
      )
      setDirections(directionsUpdated)
      afficherMessage("Direction modifiée avec succès!", "succes")
    } else {
      // Ajouter une nouvelle Direction
      const nouveauId = directions.length > 0 ? Math.max(...directions.map((dir) => dir.id)) + 1 : 1

      const direction = {
        id: nouveauId,
        designation: nouvelleDirection.designation,
        quantite: Number.parseInt(nouvelleDirection.quantite),
        date: nouvelleDirection.date,
        consommations: agencesDir.map((agence) => ({ agenceId: agence.id, quantite: 0 })),
      }

      setDirections([...directions, direction])
      afficherMessage("Direction ajoutée avec succès!", "succes")
    }

    fermerModalDirection()
  }

  // Mettre à jour la consommation Direction
  const mettreAJourConsommationDir = (directionId, agenceId, quantite) => {
    const directionsUpdated = directions.map((dir) => {
      if (dir.id === directionId) {
        const consommationsUpdated = dir.consommations.map((c) =>
          c.agenceId === agenceId ? { ...c, quantite: Number.parseInt(quantite) || 0 } : c,
        )
        return { ...dir, consommations: consommationsUpdated }
      }
      return dir
    })

    setDirections(directionsUpdated)
  }

  // Activer/désactiver le mode édition pour une Direction
  const toggleEditionDirection = (id) => {
    setDirectionEnEdition(directionEnEdition === id ? null : id)

    if (directionEnEdition === id) {
      afficherMessage("Modifications enregistrées avec succès!", "succes")
    }
  }

  // Supprimer une Direction
  const supprimerDirection = (id) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette Direction ?</div>
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
      // Supprimer la Direction
      setDirections(directions.filter((dir) => dir.id !== id))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        afficherMessage("Direction supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Filtrer les dispatches par désignation
  const dispatchesFiltres = dispatches.filter((dispatch) =>
    dispatch.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Filtrer les Western Unions par désignation
  const westernUnionsFiltres = westernUnions.filter((wu) =>
    wu.designation.toLowerCase().includes(filtreWesternUnion.toLowerCase()),
  )

  // Filtrer les Directions par désignation
  const directionsFiltrees = directions.filter((dir) =>
    dir.designation.toLowerCase().includes(filtreDirection.toLowerCase()),
  )

  return (
    <div className="page-dispatche animation-dispatche">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <h1 className="titre-page">Gestion des Immobiliers</h1>

      {/* Section Agence */}
      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Agences</h2>
          <div className="actions-entete">
            <div className="champ-recherche-wrapper">
              <Search size={18} className="icone-recherche" />
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreDesignation}
                onChange={(e) => setFiltreDesignation(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <div className="ajout-agence">
              <input
                type="text"
                placeholder="Nom de la nouvelle agence"
                value={nouvelleAgence}
                onChange={(e) => setNouvelleAgence(e.target.value)}
                className="champ-nouvelle-agence"
              />
              <button className="bouton-ajouter-agence" onClick={ajouterAgence} disabled={!nouvelleAgence.trim()}>
                <Plus size={16} /> Ajouter Agence
              </button>
            </div>
            {agences.length > 0 && (
              <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <button className="bouton-supprimer-liste" onClick={toggleListeAgences}>
                  <Trash size={16} /> Supprimer Agence
                </button>
                {listeAgencesOuverte && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Sélectionner une agence</div>
                    {agences.map((agence) => (
                      <div key={agence.id} className="dropdown-item" onClick={() => supprimerAgence(agence.id)}>
                        {agence.nom}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button className="bouton-ajouter" onClick={ouvrirModal}>
              <Plus size={16} /> Ajouter
            </button>
          </div>
        </div>

        <div className="tableau-dispatche-wrapper">
          <div className="tableau-dispatche">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>Quantité</th>
                  {agences.length > 0 && <th colSpan={agences.length}>Consommations des agences</th>}
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {agences.length > 0 && (
                  <tr>
                    <th></th>
                    <th></th>
                    {agences.map((agence) => (
                      <th key={agence.id} className="th-agence">
                        {agence.nom}
                      </th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {dispatchesFiltres.length > 0 ? (
                  dispatchesFiltres.map((dispatch) => (
                    <tr key={dispatch.id}>
                      <td>{dispatch.designation}</td>
                      <td>{dispatch.quantite}</td>
                      {agences.map((agence) => {
                        const consommation = dispatch.consommations?.find((c) => c.agenceId === agence.id)
                        return (
                          <td key={`${dispatch.id}-${agence.id}`}>
                            <input
                              type="number"
                              min="0"
                              max={dispatch.quantite}
                              value={consommation?.quantite || 0}
                              onChange={(e) => mettreAJourConsommation(dispatch.id, agence.id, e.target.value)}
                              className="input-consommation"
                              disabled={dispatchEnEdition !== dispatch.id}
                            />
                          </td>
                        )
                      })}
                      <td>{dispatch.date}</td>
                      <td className="actions-cellule">
                        <button
                          className={`bouton-modifier ${dispatchEnEdition === dispatch.id ? "actif" : ""}`}
                          onClick={() => toggleEditionDispatch(dispatch.id)}
                        >
                          {dispatchEnEdition === dispatch.id ? (
                            <>
                              <Save size={14} /> Enregistrer
                            </>
                          ) : (
                            <>
                              <Edit size={14} /> Modifier
                            </>
                          )}
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerDispatch(dispatch.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agences.length > 0 ? agences.length + 4 : 4} className="no-data">
                      Aucune agence trouvée. Utilisez le bouton "Ajouter" pour en créer une.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section Western Union */}
      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Western Union</h2>
          <div className="actions-entete">
            <div className="champ-recherche-wrapper">
              <Search size={18} className="icone-recherche" />
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreWesternUnion}
                onChange={(e) => setFiltreWesternUnion(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <div className="ajout-agence">
              <input
                type="text"
                placeholder="Nom de la nouvelle agence WU"
                value={nouvelleAgenceWU}
                onChange={(e) => setNouvelleAgenceWU(e.target.value)}
                className="champ-nouvelle-agence"
              />
              <button className="bouton-ajouter-agence" onClick={ajouterAgenceWU} disabled={!nouvelleAgenceWU.trim()}>
                <Plus size={16} /> Ajouter Agence WU
              </button>
            </div>
            {agencesWU.length > 0 && (
              <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <button className="bouton-supprimer-liste" onClick={toggleListeAgencesWU}>
                  <Trash size={16} /> Supprimer Agence WU
                </button>
                {listeAgencesWUOuverte && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Sélectionner une agence WU</div>
                    {agencesWU.map((agence) => (
                      <div key={agence.id} className="dropdown-item" onClick={() => supprimerAgenceWU(agence.id)}>
                        {agence.nom}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button className="bouton-ajouter" onClick={ouvrirModalWesternUnion}>
              <Plus size={16} /> Ajouter
            </button>
          </div>
        </div>

        <div className="tableau-dispatche-wrapper">
          <div className="tableau-dispatche">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>Quantité</th>
                  {agencesWU.length > 0 && <th colSpan={agencesWU.length}>Consommations des agences WU</th>}
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {agencesWU.length > 0 && (
                  <tr>
                    <th></th>
                    <th></th>
                    {agencesWU.map((agence) => (
                      <th key={agence.id} className="th-agence">
                        {agence.nom}
                      </th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {westernUnionsFiltres.length > 0 ? (
                  westernUnionsFiltres.map((wu) => (
                    <tr key={wu.id}>
                      <td>{wu.designation}</td>
                      <td>{wu.quantite}</td>
                      {agencesWU.map((agence) => {
                        const consommation = wu.consommations?.find((c) => c.agenceId === agence.id)
                        return (
                          <td key={`${wu.id}-${agence.id}`}>
                            <input
                              type="number"
                              min="0"
                              max={wu.quantite}
                              value={consommation?.quantite || 0}
                              onChange={(e) => mettreAJourConsommationWU(wu.id, agence.id, e.target.value)}
                              className="input-consommation"
                              disabled={westernUnionEnEdition !== wu.id}
                            />
                          </td>
                        )
                      })}
                      <td>{wu.date}</td>
                      <td className="actions-cellule">
                        <button
                          className={`bouton-modifier ${westernUnionEnEdition === wu.id ? "actif" : ""}`}
                          onClick={() => toggleEditionWesternUnion(wu.id)}
                        >
                          {westernUnionEnEdition === wu.id ? (
                            <>
                              <Save size={14} /> Enregistrer
                            </>
                          ) : (
                            <>
                              <Edit size={14} /> Modifier
                            </>
                          )}
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerWesternUnion(wu.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agencesWU.length > 0 ? agencesWU.length + 4 : 4} className="no-data">
                      Aucun Western Union trouvé. Utilisez le bouton "Ajouter" pour en créer un.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section Direction */}
      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Directions</h2>
          <div className="actions-entete">
            <div className="champ-recherche-wrapper">
              <Search size={18} className="icone-recherche" />
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreDirection}
                onChange={(e) => setFiltreDirection(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <div className="ajout-agence">
              <input
                type="text"
                placeholder="Nom de la nouvelle direction"
                value={nouvelleAgenceDir}
                onChange={(e) => setNouvelleAgenceDir(e.target.value)}
                className="champ-nouvelle-agence"
              />
              <button className="bouton-ajouter-agence" onClick={ajouterAgenceDir} disabled={!nouvelleAgenceDir.trim()}>
                <Plus size={16} /> Ajouter Direction
              </button>
            </div>
            {agencesDir.length > 0 && (
              <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <button className="bouton-supprimer-liste" onClick={toggleListeAgencesDir}>
                  <Trash size={16} /> Supprimer Direction
                </button>
                {listeAgencesDirOuverte && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Sélectionner une direction</div>
                    {agencesDir.map((agence) => (
                      <div key={agence.id} className="dropdown-item" onClick={() => supprimerAgenceDir(agence.id)}>
                        {agence.nom}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button className="bouton-ajouter" onClick={ouvrirModalDirection}>
              <Plus size={16} /> Ajouter
            </button>
          </div>
        </div>

        <div className="tableau-dispatche-wrapper">
          <div className="tableau-dispatche">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>Quantité</th>
                  {agencesDir.length > 0 && <th colSpan={agencesDir.length}>Consommations des directions</th>}
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {agencesDir.length > 0 && (
                  <tr>
                    <th></th>
                    <th></th>
                    {agencesDir.map((agence) => (
                      <th key={agence.id} className="th-agence">
                        {agence.nom}
                      </th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {directionsFiltrees.length > 0 ? (
                  directionsFiltrees.map((dir) => (
                    <tr key={dir.id}>
                      <td>{dir.designation}</td>
                      <td>{dir.quantite}</td>
                      {agencesDir.map((agence) => {
                        const consommation = dir.consommations?.find((c) => c.agenceId === agence.id)
                        return (
                          <td key={`${dir.id}-${agence.id}`}>
                            <input
                              type="number"
                              min="0"
                              max={dir.quantite}
                              value={consommation?.quantite || 0}
                              onChange={(e) => mettreAJourConsommationDir(dir.id, agence.id, e.target.value)}
                              className="input-consommation"
                              disabled={directionEnEdition !== dir.id}
                            />
                          </td>
                        )
                      })}
                      <td>{dir.date}</td>
                      <td className="actions-cellule">
                        <button
                          className={`bouton-modifier ${directionEnEdition === dir.id ? "actif" : ""}`}
                          onClick={() => toggleEditionDirection(dir.id)}
                        >
                          {directionEnEdition === dir.id ? (
                            <>
                              <Save size={14} /> Enregistrer
                            </>
                          ) : (
                            <>
                              <Edit size={14} /> Modifier
                            </>
                          )}
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerDirection(dir.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agencesDir.length > 0 ? agencesDir.length + 4 : 4} className="no-data">
                      Aucune direction trouvée. Utilisez le bouton "Ajouter" pour en créer une.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal pour Agence */}
      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{dispatchEnEdition ? "Modifier" : "Ajouter"} une agence</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="designation">Désignation</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={nouveauDispatch.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="quantite">Quantité</label>
                <input
                  id="quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouveauDispatch.quantite}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={nouveauDispatch.date}
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
                  onClick={sauvegarderDispatch}
                  disabled={!nouveauDispatch.designation || !nouveauDispatch.quantite}
                >
                  {dispatchEnEdition ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour Western Union */}
      {modalWesternUnionOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{westernUnionEnEdition ? "Modifier" : "Ajouter"} un Western Union</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="wu-designation">Désignation</label>
                <input
                  id="wu-designation"
                  name="designation"
                  type="text"
                  value={nouveauWesternUnion.designation}
                  onChange={handleWesternUnionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="wu-quantite">Quantité</label>
                <input
                  id="wu-quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouveauWesternUnion.quantite}
                  onChange={handleWesternUnionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="wu-date">Date</label>
                <input
                  id="wu-date"
                  name="date"
                  type="date"
                  value={nouveauWesternUnion.date}
                  onChange={handleWesternUnionInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModalWesternUnion}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderWesternUnion}
                  disabled={!nouveauWesternUnion.designation || !nouveauWesternUnion.quantite}
                >
                  {westernUnionEnEdition ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour Direction */}
      {modalDirectionOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{directionEnEdition ? "Modifier" : "Ajouter"} une direction</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="dir-designation">Désignation</label>
                <input
                  id="dir-designation"
                  name="designation"
                  type="text"
                  value={nouvelleDirection.designation}
                  onChange={handleDirectionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="dir-quantite">Quantité</label>
                <input
                  id="dir-quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouvelleDirection.quantite}
                  onChange={handleDirectionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="dir-date">Date</label>
                <input
                  id="dir-date"
                  name="date"
                  type="date"
                  value={nouvelleDirection.date}
                  onChange={handleDirectionInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModalDirection}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderDirection}
                  disabled={!nouvelleDirection.designation || !nouvelleDirection.quantite}
                >
                  {directionEnEdition ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImDispatche
