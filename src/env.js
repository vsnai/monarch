let origin

if (window.location.hostname === 'localhost') {
  origin = 'http://localhost:5001'
}

export { origin }
