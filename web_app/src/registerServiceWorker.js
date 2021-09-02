/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
      self.addEventListener('fetch',event=> {
        if (event.request.url.includes('/api/v1/configuration/')) {
          console.log('caching: ' + event.request.url )
          event.respondWith(
            caches.open(cacheName).then(function(cache) {
              return fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response;
              });
            })
          );
        } else {
          console.log('fetch request NOT cached: ' + event.request.url)
        }
      });
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New version of app is available - delete old caches')
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            console.log('  - deleting: ' + cacheName)
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
      console.log('New version of app is available - reloading app automatically')
      window.location.reload(true)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

const cacheName = 'roadsafety-digital-forms';
