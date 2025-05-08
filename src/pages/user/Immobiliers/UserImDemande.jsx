import "./css/Demande.css"

function UserImDemande() {
  // Données simul��es pour les demandes d'immobiliers
  const demandes = [
    {
      id: 1,
      article: "Ordinateur portable",
      reference: "ORD-002",
      date: "16/05/2023",
      statut: "approuvé",
    },
    {
      id: 2,
      article: "Écran 27 pouces",
      reference: "ECR-007",
      date: "14/05/2023",
      statut: "en attente",
    },
    {
      id: 3,
      article: "Chaise ergonomique",
      reference: "MOB-010",
      date: "12/05/2023",
      statut: "refusé",
    },
  ]

  return (
    <div className="im-demande-container">
      <div className="im-demande-header">
        <h2>Mes demandes d'immobiliers</h2>
        <button className="btn-add">Nouvelle demande</button>
      </div>
      <div className="im-demande-table-container">
        <table className="im-demande-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Article</th>
              <th>Référence</th>
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
                <td>{item.reference}</td>
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

export default UserImDemande
