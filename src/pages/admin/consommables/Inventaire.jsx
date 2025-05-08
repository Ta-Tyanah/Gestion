"use client"

import { useState } from "react"
import { Calendar, Search, FileDown } from "lucide-react"
import "./css/Inventaire.css"

function Inventaire() {
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [filtreMois, setFiltreMois] = useState("")
  const [filtreAnnee, setFiltreAnnee] = useState("")
  const [showHistorique, setShowHistorique] = useState(false)

  // Simuler l'historique des inventaires
  const historiqueInventaires = [
    { id: 1, date: "15/01/2023", precision: "97%", ecarts: 3 },
    { id: 2, date: "15/04/2023", precision: "98%", ecarts: 5 },
    { id: 3, date: "15/07/2023", precision: "99%", ecarts: 2 },
  ]

  // Générer les options pour les années
  const genererOptionsAnnees = () => {
    const anneeActuelle = new Date().getFullYear()
    const annees = []
    for (let i = anneeActuelle - 5; i <= anneeActuelle; i++) {
      annees.push(i)
    }
    return annees.reverse()
  }

  // Fonction pour créer un nouvel inventaire
  const creerNouvelInventaire = () => {
    alert("Création d'un nouvel inventaire initiée. Cette fonctionnalité sera connectée à la base de données.")
  }

  // Fonction pour exporter en Excel
  const exporterEnExcel = () => {
    alert("Exportation en Excel initiée. Cette fonctionnalité sera implémentée ultérieurement.")
  }

  return (
    <div className="inventaire-container">
      <h2>Inventaire des consommables</h2>
      <div className="inventaire-content">
        <div className="inventaire-actions">
          <button className="btn-primary" onClick={creerNouvelInventaire}>
            Nouvel inventaire
          </button>
          <button className="btn-secondary" onClick={() => setShowHistorique(!showHistorique)}>
            {showHistorique ? "Masquer l'historique" : "Historique"}
          </button>
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
                {historiqueInventaires.map((inventaire) => (
                  <tr key={inventaire.id}>
                    <td>{inventaire.date}</td>
                    <td>{inventaire.precision}</td>
                    <td>{inventaire.ecarts}</td>
                    <td>
                      <button className="btn-view">Consulter</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="inventaire-info">
              <p>
                Dernier inventaire effectué le: <strong>15/04/2023</strong>
              </p>
              <p>
                Prochain inventaire prévu le: <strong>15/07/2023</strong>
              </p>
            </div>
            <div className="inventaire-stats">
              <div className="stat-card">
                <h3>3</h3>
                <p>Inventaires cette année</p>
              </div>
              <div className="stat-card">
                <h3>98%</h3>
                <p>Précision moyenne</p>
              </div>
              <div className="stat-card">
                <h3>5</h3>
                <p>Écarts détectés</p>
              </div>
            </div>
          </>
        )}

        {/* Tableau d'inventaire */}
        <div className="section-inventaire">
          <div className="entete-excel">

            <div className="filtres-et-export">
              <div className="filtres-inventaire">
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

                <div className="filtres-date">
                  <div className="groupe-filtre">
                    <label htmlFor="filtreMois">
                      <Calendar size={16} /> Mois:
                    </label>
                    <select
                      id="filtreMois"
                      value={filtreMois}
                      onChange={(e) => setFiltreMois(e.target.value)}
                      className="select-filtre"
                    >
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
                      <Calendar size={16} /> Année:
                    </label>
                    <select
                      id="filtreAnnee"
                      value={filtreAnnee}
                      onChange={(e) => setFiltreAnnee(e.target.value)}
                      className="select-filtre"
                    >
                      <option value="">Toutes les années</option>
                      {genererOptionsAnnees().map((annee) => (
                        <option key={annee} value={annee.toString()}>
                          {annee}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button className="bouton-exporter" onClick={exporterEnExcel}>
                <FileDown size={16} /> Exporter en Excel
              </button>
            </div>
          </div>

          <div className="tableau-inventaire-wrapper">
            <div className="tableau-inventaire-scroll">
              <table className="tableau-inventaire-excel">
                <thead>
                  <tr>
                    <th rowSpan="2" className="th-designation">
                      DESIGNATIONS
                    </th>
                    <th colSpan="3" className="th-group">
                      STOCKS AU 31/12/2022
                    </th>
                    <th colSpan="3" className="th-group">
                      ENTREE JANV 2023
                    </th>
                    <th rowSpan="2" className="th-quantite">
                      QUANTITE
                      <br />
                      DISPONIBLE
                    </th>
                    <th colSpan="5" className="th-group consommation-agence">
                      CONSOMMATION AGENCE
                    </th>
                    <th colSpan="5" className="th-group consommation-wu">
                      CONSOMMATION WU
                    </th>
                    <th colSpan="5" className="th-group consommation-dir">
                      CONSOMMATION DIRECTIONS
                    </th>
                    <th colSpan="3" className="th-group total-consommation">
                      TOTAL CONSOMMATION JANV 2023
                    </th>
                    <th colSpan="3" className="th-group stock-final">
                      STOCKS AU 31/01/2023
                    </th>
                  </tr>
                  <tr>
                    <th className="th-subgroup">Quantité</th>
                    <th className="th-subgroup">CMUP</th>
                    <th className="th-subgroup">Montant</th>
                    <th className="th-subgroup">Quantité</th>
                    <th className="th-subgroup">PU</th>
                    <th className="th-subgroup">Montant</th>

                    {/* Consommation Agence */}
                    <th className="th-subgroup">AGENCE 001</th>
                    <th className="th-subgroup">AGENCE 002</th>
                    <th className="th-subgroup">AGENCE 003</th>
                    <th className="th-subgroup">AGENCE 004</th>
                    <th className="th-subgroup">TOTAL AGENCE</th>

                    {/* Consommation WU */}
                    <th className="th-subgroup">WU 001</th>
                    <th className="th-subgroup">WU 004</th>
                    <th className="th-subgroup">WU 006 I</th>
                    <th className="th-subgroup">WU 006 II</th>
                    <th className="th-subgroup">TOTAL WU</th>

                    {/* Consommation Directions */}
                    <th className="th-subgroup">DG</th>
                    <th className="th-subgroup">DRH</th>
                    <th className="th-subgroup">PRM</th>
                    <th className="th-subgroup">DAJ</th>
                    <th className="th-subgroup">TOTAL DIR</th>

                    {/* Total Consommation */}
                    <th className="th-subgroup">Quantité</th>
                    <th className="th-subgroup">CMUP</th>
                    <th className="th-subgroup">Montant</th>

                    {/* Stock Final */}
                    <th className="th-subgroup">Quantité</th>
                    <th className="th-subgroup">CMUP</th>
                    <th className="th-subgroup">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="td-designation">AGRAFE 23/13</td>
                    <td>50</td>
                    <td>5.00</td>
                    <td>250.00</td>
                    <td>100</td>
                    <td>5.50</td>
                    <td>550.00</td>
                    <td>150</td>
                    <td>20</td>
                    <td>15</td>
                    <td>10</td>
                    <td>5</td>
                    <td>50</td>
                    <td>10</td>
                    <td>5</td>
                    <td>10</td>
                    <td>5</td>
                    <td>30</td>
                    <td>5</td>
                    <td>10</td>
                    <td>5</td>
                    <td>0</td>
                    <td>20</td>
                    <td>100</td>
                    <td>5.25</td>
                    <td>525.00</td>
                    <td>50</td>
                    <td>5.50</td>
                    <td>275.00</td>
                  </tr>
                  <tr>
                    <td className="td-designation">AGRAFE 24/6</td>
                    <td>100</td>
                    <td>3.00</td>
                    <td>300.00</td>
                    <td>200</td>
                    <td>3.25</td>
                    <td>650.00</td>
                    <td>300</td>
                    <td>30</td>
                    <td>20</td>
                    <td>15</td>
                    <td>10</td>
                    <td>75</td>
                    <td>15</td>
                    <td>10</td>
                    <td>15</td>
                    <td>10</td>
                    <td>50</td>
                    <td>10</td>
                    <td>15</td>
                    <td>10</td>
                    <td>5</td>
                    <td>40</td>
                    <td>165</td>
                    <td>3.15</td>
                    <td>519.75</td>
                    <td>135</td>
                    <td>3.19</td>
                    <td>430.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventaire
