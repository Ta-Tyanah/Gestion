import "./css/Stock.css"

function UserStock() {
  // Données simulées pour le stock
  const stockItems = [
    { id: 1, nom: "Papier A4", quantite: 150, unite: "ramettes", disponible: true },
    { id: 2, nom: "Cartouches d'encre", quantite: 15, unite: "pièces", disponible: true },
    { id: 3, nom: "Stylos", quantite: 0, unite: "pièces", disponible: false },
  ]

  return (
    <div className="user-stock-container">
      <div className="user-stock-header">
        <h2>Stock des consommables disponibles</h2>
        <div className="user-stock-actions">
          <div className="search-bar">
            <input type="text" placeholder="Rechercher un article..." />
            <button className="btn-search">🔍</button>
          </div>
        </div>
      </div>
      <div className="user-stock-table-container">
        <table className="user-stock-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Disponibilité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.quantite}</td>
                <td>{item.unite}</td>
                <td>
                  <span className={`status-badge ${item.disponible ? "disponible" : "indisponible"}`}>
                    {item.disponible ? "Disponible" : "Indisponible"}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-demande" disabled={!item.disponible}>
                    Demander
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserStock
