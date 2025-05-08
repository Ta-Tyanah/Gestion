import "./css/Demande.css"

function UserDemande() {
  // Données simulées pour les demandes
  const demandes = [
    {
      id: 1,
      article: "Papier A4",
      quantite: 5,
      unite: "ramettes",
      date: "16/05/2023",
      statut: "approuvé",
    },
    {
      id: 2,
      article: "Cartouches d'encre",
      quantite: 2,
      unite: "pièces",
      date: "14/05/2023",
      statut: "en attente",
    },
  ]

  return (
    <div className="demande-container">
      <div className="demande-header">
        <h2>Mes demandes</h2>
        <button className="btn-add">Nouvelle demande</button>
      </div>
      <div className="demande-table-container">
        <table className="demande-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Article</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.article}</td>
                <td>{item.quantite}</td>
                <td>{item.unite}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`status-badge ${item.statut}`}>
                    {item.statut === "approuvé" ? "Approuvé" : item.statut === "en attente" ? "En attente" : "Refusé"}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-view">👁️</button>
                  {item.statut === "en attente" && <button className="btn-edit">✏️</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserDemande
