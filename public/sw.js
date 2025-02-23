//install event
self.addEventListener("install", e => {
  console.log("Service worker: Installed")
})

//activate event
self.addEventListener("activate", e => {
  console.log("Service worker: Activated")
})