'use client'

export default function CookieNotice() {
  const handleClose = () => {
    const notice = document.getElementById('cookie-notice')
    if (notice) {
      notice.style.display = 'none'
    }
  }

  return (
    <div className="cookie-notice" id="cookie-notice">
      This website uses cookies to enhance your browsing experience. By continuing to use this site, you agree to our use of cookies.
      <button onClick={handleClose}>
        Accept
      </button>
      <button onClick={handleClose}>
        Preferences
      </button>
    </div>
  )
} 