// Service Worker for handling push notifications
const CACHE_NAME = 'chatterbox-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/logo192.png',
  '/sounds/notification.mp3'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Push event - handle incoming push notifications
self.addEventListener('push', function(event) {
  console.log('Push message received:', event);

  let notificationData = {};

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = {
        title: 'New Message',
        body: event.data.text() || 'You have a new message',
      };
    }
  } else {
    notificationData = {
      title: 'ChatterBox',
      body: 'You have a new message',
    };
  }

  const title = notificationData.title || 'ChatterBox';
  const options = {
    body: notificationData.body || 'You have a new message',
    icon: notificationData.icon || '/logo192.png',
    badge: notificationData.badge || '/logo192.png',
    tag: notificationData.tag || 'chat-message',
    data: notificationData.data || {},
    requireInteraction: false,
    silent: false,
    actions: [
      {
        action: 'open',
        title: 'Open Chat',
      },
      {
        action: 'close',
        title: 'Dismiss',
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);

  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Handle notification click
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      const data = event.notification.data;
      const url = data.url || '/';

      // If a window is already open, focus it
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // Otherwise, open a new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Background sync for offline message handling (optional)
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync logic here
      console.log('Background sync triggered')
    );
  }
});

// Handle service worker updates
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});