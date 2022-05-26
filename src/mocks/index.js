if (window?.location?.hostname === 'localhost') {
  const { worker } = await import('./browser')

  worker.start()
}
