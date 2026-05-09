importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCWyf1QckHFRMiSGrgNtVGtezM15SRR4hY",
  authDomain: "arca-d0fc9.firebaseapp.com",
  projectId: "arca-d0fc9",
  storageBucket: "arca-d0fc9.firebasestorage.app",
  messagingSenderId: "248934802491",
  appId: "1:248934802491:web:362b2782fe56c33a94281e"
});

const messaging = firebase.messaging();

// Notificación cuando la app está en SEGUNDO PLANO o CERRADA
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data
  });
});

// Al tocar la notificación abre Arca
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('arca') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
