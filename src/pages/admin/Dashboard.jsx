"use client"

import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Stock from "./consommables/Stock"
import Inventaire from "./consommables/Inventaire"
import Dispatche from "./consommables/Dispatche"
import GestionUtilisateurs from "./GestionUtilisateurs/GestionUtilisateurs"
import ImStock from "./immobiliers/ImStock"
import ImInventaire from "./immobiliers/ImInventaire"
import ImDispatche from "./immobiliers/ImDispatche"
import Amortissements from "./immobiliers/Amortissements"
import SuiviStock from "./SuiviStock/SuiviStock"
import LoadingOverlay from "../../components/LoadingOverlay"
import {
  BarChart3,
  TrendingUp,
  Package,
  Users,
  Building2,
  FileText,
  Truck,
  AlertTriangle,
  Plus,
  CheckCircle,
} from "lucide-react"
import "./Dashboard.css"

function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [activeRoute] = useState("")

  // Simuler un chargement lors du changement de route
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    // Appeler une fois au montage
    handleRouteChange()

    // Surveiller les changements de route
    return () => {
      // Nettoyage si nécessaire
    }
  }, [activeRoute])

  return (
    <div className="dashboard-container">
      {loading && <LoadingOverlay />}
      <div className="dashboard-content">
        <Routes>
          <Route
            index
            element={
              <div className="dashboard-welcome">
                <h1>Tableau de Bord - Gestion des Stocks</h1>
                <p className="dashboard-subtitle">
                  Bienvenue dans le système de gestion des stocks et des immobilisations
                </p>

                <div className="dashboard-stats">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Package size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Total Articles</h3>
                      <p className="stat-value">0</p>
                      <p className="stat-change neutral">Aucune donnée</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <Building2 size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Immobilisations</h3>
                      <p className="stat-value">0</p>
                      <p className="stat-change neutral">Aucune donnée</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <Users size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Utilisateurs</h3>
                      <p className="stat-value">0</p>
                      <p className="stat-change neutral">Aucune donnée</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">
                      <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                      <h3>Valeur Totale</h3>
                      <p className="stat-value">0 Ar</p>
                      <p className="stat-change neutral">Aucune donnée</p>
                    </div>
                  </div>
                </div>

                {/* Ajout d'une section similaire à la gestion des stocks */}
                <div className="dashboard-stock-overview">
                  <h2>Aperçu des Stocks</h2>

                  <div className="stock-overview-tabs">
                    <button className="tab-button active">Consommables</button>
                    <button className="tab-button">Immobiliers</button>
                  </div>

                  <div className="stock-overview-content">
                    <div className="stock-overview-header">
                      <h3>Articles Consommables</h3>
                      <div className="stock-overview-actions">
                        <button className="btn-secondary">
                          <FileText size={16} /> Exporter
                        </button>
                        <button className="btn-primary">
                          <Plus size={16} /> Ajouter
                        </button>
                      </div>
                    </div>

                    <div className="stock-overview-table-container">
                      <table className="stock-overview-table">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Désignation</th>
                            <th>Catégorie</th>
                            <th>Quantité</th>
                            <th>Seuil</th>
                            <th>Statut</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="empty-row">
                            <td colSpan="6">
                              <div className="empty-state">
                                <Package size={32} />
                                <p>Aucun article en stock</p>
                                <button className="btn-primary">Ajouter un article</button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Ajout d'une section d'alertes */}
                <div className="dashboard-alerts">
                  <h2>Alertes et Notifications</h2>

                  <div className="alerts-container">
                    <div className="alert-card">
                      <div className="alert-icon warning">
                        <AlertTriangle size={24} />
                      </div>
                      <div className="alert-content">
                        <h3>Stocks Critiques</h3>
                        <p>0 articles en stock critique</p>
                      </div>
                      <button className="alert-action">Voir</button>
                    </div>

                    <div className="alert-card">
                      <div className="alert-icon info">
                        <Truck size={24} />
                      </div>
                      <div className="alert-content">
                        <h3>Livraisons en Attente</h3>
                        <p>0 livraisons en attente</p>
                      </div>
                      <button className="alert-action">Voir</button>
                    </div>

                    <div className="alert-card">
                      <div className="alert-icon success">
                        <CheckCircle size={24} />
                      </div>
                      <div className="alert-content">
                        <h3>Inventaires à Jour</h3>
                        <p>Tous les inventaires sont à jour</p>
                      </div>
                      <button className="alert-action">Voir</button>
                    </div>
                  </div>
                </div>

                <div className="dashboard-quick-actions">
                  <h2>Actions Rapides</h2>
                  <div className="quick-actions-grid">
                    <a href="/admin/consommables/stock" className="quick-action-card">
                      <div className="quick-action-icon">
                        <Package size={24} />
                      </div>
                      <div className="quick-action-content">
                        <h3>Gérer le Stock</h3>
                        <p>Consulter et gérer les articles en stock</p>
                      </div>
                    </a>

                    <a href="/admin/immobiliers/stock" className="quick-action-card">
                      <div className="quick-action-icon">
                        <Building2 size={24} />
                      </div>
                      <div className="quick-action-content">
                        <h3>Immobilisations</h3>
                        <p>Gérer les biens immobilisés</p>
                      </div>
                    </a>

                    <a href="/admin/consommables/inventaire" className="quick-action-card">
                      <div className="quick-action-icon">
                        <FileText size={24} />
                      </div>
                      <div className="quick-action-content">
                        <h3>Inventaire</h3>
                        <p>Effectuer un inventaire des stocks</p>
                      </div>
                    </a>

                    <a href="/admin/consommables/dispatche" className="quick-action-card">
                      <div className="quick-action-icon">
                        <Truck size={24} />
                      </div>
                      <div className="quick-action-content">
                        <h3>Dispatche</h3>
                        <p>Gérer la distribution des articles</p>
                      </div>
                    </a>

                    <a href="/admin/utilisateurs" className="quick-action-card">
                      <div className="quick-action-icon">
                        <Users size={24} />
                      </div>
                      <div className="quick-action-content">
                        <h3>Utilisateurs</h3>
                        <p>Gérer les utilisateurs du système</p>
                      </div>
                    </a>

                    <a href="/admin/suivi-stock" className="quick-action-card">
                      <div className="quick-action-icon">
                        <BarChart3 size={24} />
                      </div>
                      <div className="quick-action-content">
                        <h3>Suivi des Stocks</h3>
                        <p>Analyser l'évolution des stocks</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="consommables/stock" element={<Stock />} />
          <Route path="consommables/inventaire" element={<Inventaire />} />
          <Route path="consommables/dispatche" element={<Dispatche />} />
          <Route path="immobiliers/stock" element={<ImStock />} />
          <Route path="immobiliers/inventaire" element={<ImInventaire />} />
          <Route path="immobiliers/dispatche" element={<ImDispatche />} />
          <Route path="immobiliers/amortissements" element={<Amortissements />} />
          <Route path="GestionUtilisateurs" element={<GestionUtilisateurs />} />
          <Route path="suivi-stock" element={<SuiviStock />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
