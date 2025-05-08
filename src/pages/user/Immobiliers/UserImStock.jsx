import "./css/Stock.css"

function UserImStock() {
  // Données simulées pour les immobiliers
  const immobilierItems = [
    {
      id: 1,
      nom: "Ordinateur portable",
      reference: "ORD-001",
      categorie: "Informatique",
      disponible: true,
    },
    {
      id: 2,
      nom: "Imprimante",
      reference: "IMP-002",
      categorie: "Informatique",
      disponible: false,
    },
    {
      id: 3,
      nom: "Bureau",
      reference: "MOB-003",
      categorie: "Mobilier",
      disponible: true,
    },
  ]

  return (
    <div className="user-imstock-container">
      <div className="user-imstock-header">
        <h2>Stock des immobiliers disponibles</h2>
        <div className="user-imstock-actions">
          <div className="search-bar">
            <input type="text" placeholder="Rechercher un bien..." />
            <button className="btn-search">🔍</button>
          </div>
        </div>
      </div>
      <div className="user-imstock-table-container">
        <table className="user-imstock-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Référence</th>
              <th>Catégorie</th>
              <th>Disponibilité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {immobilierItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.reference}</td>
                <td>{item.categorie}</td>
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

export default UserImStock
