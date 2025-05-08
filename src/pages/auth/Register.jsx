"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Building, UserCog, Lock, KeyRound } from "lucide-react"
import "./Register.css"

function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    agence: "",
    fonction: "utilisateur",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.nom || !formData.email || !formData.agence || !formData.password || !formData.confirmPassword) {
      setError("Veuillez remplir tous les champs")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    // Simuler un chargement
    setLoading(true)

    // Afficher un message de succès et rediriger
    setTimeout(() => {
      setSuccess("Utilisateur créé avec succès!")
      setTimeout(() => {
        // Rediriger vers la page de login appropriée
        if (formData.fonction === "admin") {
          navigate("/auth/login-admin")
        } else {
          navigate("/auth/login-user")
        }
      }, 1000)
    }, 1500)
  }

  return (
    <div className="auth-container register-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Création du compte en cours...</p>
        </div>
      )}
      <div className="auth-content">
        <div className="auth-logo">
          <img src="/src/assets/cem-logo.png" alt="CEM Logo" className="logo" />
        </div>
        <div className="auth-header">
          <h1>
            Bienvenue sur <span className="app-name">StockManager</span>
          </h1>
          <p className="auth-description">Système de gestion de stock et d'inventaire</p>
        </div>
        <div className="auth-form-container register-form-container">
          <h2>Inscription Utilisateur</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <form onSubmit={handleSubmit} className="auth-form register-form">
            <div className="form-columns">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <div className="input-with-icon">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Nom complet"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-with-icon">
                    <Mail className="input-icon" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="agence">Agence</label>
                  <div className="input-with-icon">
                    <Building className="input-icon" size={18} />
                    <input
                      type="text"
                      id="agence"
                      name="agence"
                      value={formData.agence}
                      onChange={handleChange}
                      placeholder="Agence"
                    />
                  </div>
                </div>
              </div>
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="fonction">Fonction</label>
                  <div className="input-with-icon">
                    <UserCog className="input-icon" size={18} />
                    <select id="fonction" name="fonction" value={formData.fonction} onChange={handleChange}>
                      <option value="utilisateur">Utilisateur</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <div className="input-with-icon">
                    <Lock className="input-icon" size={18} />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Mot de passe"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                  <div className="input-with-icon">
                    <KeyRound className="input-icon" size={18} />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmer le mot de passe"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn-register">
              Inscrire
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Déjà inscrit? <Link to="/auth/login-admin">Connexion</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
