// Retires the offline copy from the old address (lumbeeheritageapp.github.io):
// deletes its caches, removes itself, and reloads open pages so they hit the
// forwarding page. Browsers fetch this automatically the next time the old
// address is opened.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: "window" })) client.navigate(client.url);
  })());
});
