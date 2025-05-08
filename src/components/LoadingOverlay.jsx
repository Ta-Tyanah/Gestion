import "./LoadingOverlay.css"

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Chargement en cours...</p>
    </div>
  )
}

export default LoadingOverlay
