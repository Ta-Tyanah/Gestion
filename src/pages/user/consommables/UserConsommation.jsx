import "./css/Consommation.css"

function UserConsommation() {
  // Données simulées pour les consommations
  const consommations = [
    {
      id: 1,
      article: "Papier A4",
      quantite: 2,
      unite: "ramettes",
      date: "15/05/2023",
      statut: "validé",
    },
    {
      id: 2,
      article: "Stylos",
      quantite: 5,
      unite: "pièces",
      date: "10/05/2023",
      statut: "en attente",
    },
  ]

  return (
    <div className="consommation-container">
      <div className="consommation-header">
        <h2>Mes consommations</h2>
        <button className="btn-add">Nouvelle consommation</button>
      </div>
      <div className="consommation-table-container">
        <table className="consommation-table">
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
            {consommations.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.article}</td>
                <td>{item.quantite}</td>
                <td>{item.unite}</td>
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

export default UserConsommation
