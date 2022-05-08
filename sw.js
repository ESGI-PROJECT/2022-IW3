const cacheName = 'product_cache'; // Name of the cache
const resourcesToPrecache = [ // The content cached
    '/',
    'app-home.js',
    'app-product.js',
    'main.js',
    'idbHelper.js',
    'Base.js',
]

// Install event of the PWA
self.addEventListener('install', event => {
    console.log('Install !');
    event.waitUntil( // Wait until the service worker is installed
        caches.open(cacheName) // Open the cache
        .then(cache => {
            return cache.addAll(resourcesToPrecache); // Add all content we need to cache
        })
    )
})

// Activate event of the PWA
self.addEventListener('activate', event => {
    console.log('Activate !');
})

// Fetch event of the PWA
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the catch
        caches.match(event.request).then(function(response) { // If there is cache in the browser
            if (response) { // If there is a response (true or false)
                return response;
            }
            return fetch(event.request).then(function(response) { // Show content from cache
                if (response.status === 404) { // if the cache is not found show the index.php file
                    return caches.match('/main.js');
                }
                return response
            });
        }).catch(function() {
            // If there is an error while trying to show the cache
            // Show a default file
            return caches.match('/main.js');
        })
    );
});
