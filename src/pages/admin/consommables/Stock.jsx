"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash,
  Save,
  Computer,
  Package,
  FileText,
  Brush,
  Calendar,
  Filter,
  Book,
  HardDrive,
} from "lucide-react"
import "./css/Stock.css"

function Stock() {
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [modalOuvert, setModalOuvert] = useState(false)
  const [modalDetailOuvert, setModalDetailOuvert] = useState(false)
  const [categorieSelectionnee, setCategorieSelectionnee] = useState(null)
  const [filtreMois, setFiltreMois] = useState("")
  const [filtreAnnee, setFiltreAnnee] = useState("")
  const [loading, setLoading] = useState(false)
  const [articleEnEdition, setArticleEnEdition] = useState(null)
  const [nouvelArticle, setNouvelArticle] = useState({
    designation: "",
    categorie: "",
    quantite: "",
    prixUnitaire: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Données simulées pour les catégories
  const categoriesStock = [
    { id: 1, nom: "Fournitures de Bureau", icone: "FileText", quantite: 2 },
    { id: 2, nom: "Matériel Informatique", icone: "Computer", quantite: 1 },
    { id: 3, nom: "Fournitures d'Entretien", icone: "Package", quantite: 3 },
    { id: 4, nom: "Matériels Informatiques", icone: "HardDrive", quantite: 5 },
    { id: 5, nom: "Livret", icone: "Book", quantite: 4 },
  ]

  // Données simulées pour les articles
  const [articles, setArticles] = useState([
    {
      id: 1,
      designation: "Papier A4",
      categorie: "Fournitures de Bureau",
      stockAvant: { quantite: 100, montant: 500, cmup: 5 },
      stockActuel: { date: "2023-05-15", quantite: 200, prixUnitaire: 5, montant: 1000 },
      dateEntree: "2023-05-15",
      dateSortie: "",
    },
    {
      id: 2,
      designation: "Ordinateur portable",
      categorie: "Matériel Informatique",
      stockAvant: { quantite: 10, montant: 10000, cmup: 1000 },
      stockActuel: { date: "2023-05-10", quantite: 15, prixUnitaire: 1000, montant: 15000 },
      dateEntree: "2023-05-10",
      dateSortie: "",
    },
    {
      id: 3,
      designation: "Écran 24 pouces",
      categorie: "Matériels Informatiques",
      stockAvant: { quantite: 5, montant: 2500, cmup: 500 },
      stockActuel: { date: "2023-06-15", quantite: 10, prixUnitaire: 500, montant: 5000 },
      dateEntree: "2023-06-15",
      dateSortie: "",
    },
    {
      id: 4,
      designation: "Clavier sans fil",
      categorie: "Matériels Informatiques",
      stockAvant: { quantite: 8, montant: 800, cmup: 100 },
      stockActuel: { date: "2023-06-20", quantite: 15, prixUnitaire: 100, montant: 1500 },
      dateEntree: "2023-06-20",
      dateSortie: "",
    },
    {
      id: 5,
      designation: "Souris optique",
      categorie: "Matériels Informatiques",
      stockAvant: { quantite: 12, montant: 600, cmup: 50 },
      stockActuel: { date: "2023-07-05", quantite: 20, prixUnitaire: 50, montant: 1000 },
      dateEntree: "2023-07-05",
      dateSortie: "",
    },
    {
      id: 6,
      designation: "Livret d'épargne",
      categorie: "Livret",
      stockAvant: { quantite: 50, montant: 250, cmup: 5 },
      stockActuel: { date: "2023-07-10", quantite: 100, prixUnitaire: 5, montant: 500 },
      dateEntree: "2023-07-10",
      dateSortie: "",
    },
    {
      id: 7,
      designation: "Livret A",
      categorie: "Livret",
      stockAvant: { quantite: 30, montant: 150, cmup: 5 },
      stockActuel: { date: "2023-07-15", quantite: 80, prixUnitaire: 5, montant: 400 },
      dateEntree: "2023-07-15",
      dateSortie: "",
    },
    {
      id: 8,
      designation: "Livret jeune",
      categorie: "Livret",
      stockAvant: { quantite: 20, montant: 100, cmup: 5 },
      stockActuel: { date: "2023-08-01", quantite: 50, prixUnitaire: 5, montant: 250 },
      dateEntree: "2023-08-01",
      dateSortie: "",
    },
  ])

  // Simuler un chargement lors du montage du composant
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Obtenir l'icône correspondant à la catégorie
  const getIconeCategorie = (nomCategorie) => {
    const categorie = categoriesStock.find((cat) => cat.nom === nomCategorie)
    if (!categorie) return <Package size={24} />

    switch (categorie.icone) {
      case "Computer":
        return <Computer size={24} />
      case "Brush":
        return <Brush size={24} />
      case "Package":
        return <Package size={24} />
      case "FileText":
        return <FileText size={24} />
      case "HardDrive":
        return <HardDrive size={24} />
      case "Book":
        return <Book size={24} />
      default:
        return <Package size={24} />
    }
  }

  // Ouvrir le modal pour ajouter une nouvelle ligne
  const ouvrirModalAjout = () => {
    setArticleEnEdition(null)
    setNouvelArticle({
      designation: "",
      categorie: categoriesStock.length > 0 ? categoriesStock[0].nom : "",
      quantite: "",
      prixUnitaire: "",
      date: new Date().toISOString().split("T")[0],
    })
    setModalOuvert(true)
  }

  // Ouvrir le modal pour éditer une ligne existante
  const ouvrirModalEdition = (article) => {
    setArticleEnEdition(article)
    setNouvelArticle({
      designation: article.designation,
      categorie: article.categorie,
      quantite: article.stockActuel.quantite.toString(),
      prixUnitaire: article.stockActuel.prixUnitaire.toString(),
      date: article.stockActuel.date,
    })
    setModalOuvert(true)
  }

  // Fermer le modal
  const fermerModal = () => {
    setModalOuvert(false)
  }

  // Ouvrir le modal de détail de catégorie
  const ouvrirModalDetail = (categorie) => {
    setCategorieSelectionnee(categorie)
    setModalDetailOuvert(true)
  }

  // Fermer le modal de détail
  const fermerModalDetail = () => {
    setModalDetailOuvert(false)
    setCategorieSelectionnee(null)
    setFiltreMois("")
    setFiltreAnnee("")
  }

  // Sauvegarder les modifications
  const sauvegarderArticle = () => {
    const quantite = Number.parseInt(nouvelArticle.quantite, 10)
    const prixUnitaire = Number.parseFloat(nouvelArticle.prixUnitaire)
    const montant = quantite * prixUnitaire

    if (articleEnEdition) {
      // Mise à jour d'un article existant
      const articlesModifies = articles.map((article) => {
        if (article.id === articleEnEdition.id) {
          return {
            ...article,
            designation: nouvelArticle.designation,
            categorie: nouvelArticle.categorie,
            stockActuel: {
              date: nouvelArticle.date,
              quantite,
              prixUnitaire,
              montant,
            },
            dateEntree: nouvelArticle.date,
          }
        }
        return article
      })

      setArticles(articlesModifies)
      afficherMessage("Article modifié avec succès!", "succes")
    } else {
      // Ajout d'un nouvel article
      const nouvelArticleComplet = {
        id: Date.now(),
        designation: nouvelArticle.designation,
        categorie: nouvelArticle.categorie,
        stockAvant: { quantite: 0, montant: 0, cmup: 0 },
        stockActuel: {
          date: nouvelArticle.date,
          quantite,
          prixUnitaire,
          montant,
        },
        dateEntree: nouvelArticle.date,
        dateSortie: "",
      }

      setArticles([...articles, nouvelArticleComplet])
      afficherMessage("Article ajouté avec succès!", "succes")
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

  // Supprimer un article
  const supprimerArticle = (id) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
      <div class="alerte-contenu">
        <div class="alerte-titre">Confirmer la suppression</div>
        <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cet article ?</div>
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
      // Supprimer l'article
      setArticles(articles.filter((article) => article.id !== id))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
        afficherMessage("Article supprimé avec succès!", "succes")
      }, 300)
    })
  }

  // Filtrer les articles
  const articlesFiltres = articles.filter((article) =>
    article.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Filtrer les articles par catégorie
  const getArticlesParCategorie = (nomCategorie) => {
    return articles.filter((article) => article.categorie === nomCategorie)
  }

  // Filtrer les articles par mois et année
  const filtrerArticlesParDate = (articles) => {
    if (!filtreMois && !filtreAnnee) return articles

    return articles.filter((article) => {
      const dateEntree = new Date(article.dateEntree)
      const moisMatch = !filtreMois || (dateEntree.getMonth() + 1).toString() === filtreMois
      const anneeMatch = !filtreAnnee || dateEntree.getFullYear().toString() === filtreAnnee
      return moisMatch && anneeMatch
    })
  }

  return (
    <div className="page-stock animation-stock">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      )}

      <h1 className="titre-page">Gestion de Stock</h1>

      <div className="categories-stock">
        {categoriesStock.length > 0 ? (
          categoriesStock.map((categorie) => (
            <div key={categorie.id} className="boite-categorie" onClick={() => ouvrirModalDetail(categorie)}>
              <div className="icone-categorie">{getIconeCategorie(categorie.nom)}</div>
              <h3>{categorie.nom}</h3>
              <p className="quantite-categorie">{categorie.quantite} articles</p>
              <div className="voir-details">Voir détails</div>
            </div>
          ))
        ) : (
          <div className="no-categories">
            Aucune catégorie disponible. Ajoutez des articles pour créer des catégories.
          </div>
        )}
      </div>

      <div className="section-gestion-stock">
        <div className="entete-section">
          <h2>Gestion du Stock</h2>
          <div className="actions-stock">
            <div className="filtre-stock">
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreDesignation}
                onChange={(e) => setFiltreDesignation(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <button className="bouton-ajouter" onClick={ouvrirModalAjout}>
              <Plus size={16} /> Créer
            </button>
          </div>
        </div>

        <div className="tableau-stock-wrapper">
          <div className="tableau-stock">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>Catégorie</th>
                  <th colSpan="3">Stock Restant</th>
                  <th colSpan="4">Stock Actuel</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Quantité</th>
                  <th>Montant</th>
                  <th>CMUP</th>
                  <th>Date</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Montant</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {articlesFiltres.length > 0 ? (
                  articlesFiltres.map((article) => (
                    <tr key={article.id}>
                      <td>{article.designation}</td>
                      <td>
                        <div className="categorie-cell">
                          <span className="categorie-icon">{getIconeCategorie(article.categorie)}</span>
                          <span>{article.categorie}</span>
                        </div>
                      </td>
                      <td>{article.stockAvant.quantite}</td>
                      <td>{article.stockAvant.montant}</td>
                      <td>{article.stockAvant.cmup || 0}</td>
                      <td>{article.stockActuel.date}</td>
                      <td>{article.stockActuel.quantite}</td>
                      <td>{article.stockActuel.prixUnitaire}</td>
                      <td>{article.stockActuel.montant}</td>
                      <td className="actions-cellule">
                        <button className="bouton-modifier" onClick={() => ouvrirModalEdition(article)}>
                          <Edit size={14} /> Modifier
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerArticle(article.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">
                      Aucun article en stock. Utilisez le bouton "Créer" pour ajouter des articles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="actions-bas-tableau">
          <button className="bouton-enregistrer" disabled={articles.length === 0}>
            <Save size={16} /> Enregistrer l'inventaire
          </button>
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{articleEnEdition ? "Modifier" : "Ajouter"} un article</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="designation">Désignation</label>
                <input
                  id="designation"
                  type="text"
                  value={nouvelArticle.designation}
                  onChange={(e) => setNouvelArticle({ ...nouvelArticle, designation: e.target.value })}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="categorie">Catégorie</label>
                <select
                  id="categorie"
                  value={nouvelArticle.categorie}
                  onChange={(e) => setNouvelArticle({ ...nouvelArticle, categorie: e.target.value })}
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categoriesStock.map((cat) => (
                    <option key={cat.id} value={cat.nom}>
                      {cat.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="groupe-champ">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={nouvelArticle.date}
                  onChange={(e) => setNouvelArticle({ ...nouvelArticle, date: e.target.value })}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="quantite">Quantité</label>
                <input
                  id="quantite"
                  type="number"
                  value={nouvelArticle.quantite}
                  onChange={(e) => setNouvelArticle({ ...nouvelArticle, quantite: e.target.value })}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="prixUnitaire">Prix Unitaire</label>
                <input
                  id="prixUnitaire"
                  type="number"
                  step="0.01"
                  value={nouvelArticle.prixUnitaire}
                  onChange={(e) => setNouvelArticle({ ...nouvelArticle, prixUnitaire: e.target.value })}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModal}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderArticle}
                  disabled={
                    !nouvelArticle.designation ||
                    !nouvelArticle.categorie ||
                    !nouvelArticle.quantite ||
                    !nouvelArticle.prixUnitaire ||
                    !nouvelArticle.date
                  }
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de détail de catégorie */}
      {modalDetailOuvert && categorieSelectionnee && (
        <div className="modal-overlay">
          <div className="modal-contenu modal-large">
            <div className="entete-modal-detail">
              <h2>Détails de la catégorie: {categorieSelectionnee.nom}</h2>
              <div className="filtres-date">
                <div className="groupe-filtre">
                  <label htmlFor="filtreMois">
                    <Calendar size={16} /> Mois:
                  </label>
                  <select id="filtreMois" value={filtreMois} onChange={(e) => setFiltreMois(e.target.value)}>
                    <option value="">Tous les mois</option>
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
                <div className="groupe-filtre">
                  <label htmlFor="filtreAnnee">
                    <Filter size={16} /> Année:
                  </label>
                  <select id="filtreAnnee" value={filtreAnnee} onChange={(e) => setFiltreAnnee(e.target.value)}>
                    <option value="">Toutes les années</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="tableau-detail-wrapper">
              <div className="tableau-detail">
                <table>
                  <thead>
                    <tr>
                      <th>Article</th>
                      <th>Quantité disponible</th>
                      <th>Date d'entrée</th>
                      <th>Date de sortie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrerArticlesParDate(getArticlesParCategorie(categorieSelectionnee.nom)).length > 0 ? (
                      filtrerArticlesParDate(getArticlesParCategorie(categorieSelectionnee.nom)).map((article) => (
                        <tr key={article.id} className="article-row">
                          <td>{article.designation}</td>
                          <td>{article.stockActuel.quantite}</td>
                          <td>{article.dateEntree || "N/A"}</td>
                          <td>{article.dateSortie || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="no-data">
                          Aucun article trouvé pour cette catégorie avec les filtres sélectionnés.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="actions-modal">
              <button className="bouton-fermer" onClick={fermerModalDetail}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stock
