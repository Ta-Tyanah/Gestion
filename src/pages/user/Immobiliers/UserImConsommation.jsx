import "./css/Consommation.css"

function UserImConsommation() {
  // Données simulées pour les consommations d'immobiliers
  const consommations = [
    {
      id: 1,
      article: "Ordinateur portable",
      reference: "ORD-001",
      date: "15/05/2023",
      statut: "validé",
    },
    {
      id: 2,
      article: "Écran 24 pouces",
      reference: "ECR-005",
      date: "10/05/2023",
      statut: "en attente",
    },
  ]

  return (
    <div className="im-consommation-container">
      <div className="im-consommation-header">
        <h2>Mes consommations d'immobiliers</h2>
        <button className="btn-add">Nouvelle consommation</button>
      </div>
      <div className="im-consommation-table-container">
        <table className="im-consommation-table">
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
            {consommations.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.article}</td>
                <td>{item.reference}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`status-badge ${item.statut}`}>
                    {item.statut === "validé" ? "Validé" : "En attente"}
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

export default UserImConsommation
