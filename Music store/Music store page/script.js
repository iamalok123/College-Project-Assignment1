// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.innerHTML = body.classList.contains('dark-mode') ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Updated sample music data with real images
const musicData = [
    {
        id: 1,
        title: "Midnight Memories",
        artist: "The Night Owls",
        genre: "rock",
        price: 12.99,
        cover: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400",
        rating: 4.5
    },
    {
        id: 2,
        title: "Summer Breeze",
        artist: "Coastal Dreams",
        genre: "pop",
        price: 9.99,
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
        rating: 4.0
    },
    {
        id: 3,
        title: "Jazz Nights",
        artist: "The Blue Note",
        genre: "jazz",
        price: 14.99,
        cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400",
        rating: 5.0
    },
    {
        id: 4,
        title: "Urban Beat",
        artist: "Street Rhythm",
        genre: "hip-hop",
        price: 11.99,
        cover: "https://images.unsplash.com/photo-1461784121038-f088ca1e7714?w=400",
        rating: 4.7
    },
    {
        id: 5,
        title: "Electronic Dreams",
        artist: "Digital Wave",
        genre: "electronic",
        price: 10.99,
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
        rating: 4.3
    },
    {
        id: 6,
        title: "Classical Journey",
        artist: "Symphony Orchestra",
        genre: "classical",
        price: 16.99,
        cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400",
        rating: 4.8
    },
    {
        id: 7,
        title: "Sunset Vibes",
        artist: "Chill Wave",
        genre: "electronic",
        price: 13.99,
        cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
        rating: 4.6
    },
    {
        id: 8,
        title: "Desert Rose",
        artist: "Eastern Beats",
        genre: "world",
        price: 15.99,
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
        rating: 4.9
    },
    {
        id: 9,
        title: "City Lights",
        artist: "Urban Sound",
        genre: "pop",
        price: 11.99,
        cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",
        rating: 4.4
    },
    {
        id: 10,
        title: "Mountain Echo",
        artist: "Nature's Voice",
        genre: "ambient",
        price: 12.99,
        cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
        rating: 4.7
    }
];

// Cart functionality
let cart = [];
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');

function toggleCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.classList.toggle('active');
}

function updateCart() {
    cartCount.textContent = cart.length;
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.cover}" alt="${item.title}">
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <p>${item.artist}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    const cartTotal = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}

function addToCart(product) {
    const btn = event.currentTarget;
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    
    // Show notification
    showNotification(`${product.title} added to cart!`);
    
    // Add to cart
    cart.push(product);
    updateCart();
    
    // Reset button after delay
    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    }, 2000);
}

// Enhanced Music Player Functionality
let currentTrack = null;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let queue = [];
let currentVolume = 1;
let audioPlayer = new Audio();

// Initialize music player controls
function initMusicPlayer() {
    const progressBar = document.querySelector('.progress-bar');
    const volumeSlider = document.querySelector('.volume-slider');
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const shuffleBtn = document.querySelector('.shuffle-btn');
    const repeatBtn = document.querySelector('.repeat-btn');
    const volumeBtn = document.querySelector('.volume-btn');
    const likeBtn = document.querySelector('.like-btn');
    const queueBtn = document.querySelector('.queue-btn');

    // Progress bar click handling
    progressBar.addEventListener('click', (e) => {
        const percent = (e.offsetX / progressBar.offsetWidth);
        audioPlayer.currentTime = percent * audioPlayer.duration;
        updateProgress();
    });

    // Volume control
    volumeSlider.addEventListener('click', (e) => {
        const percent = (e.offsetX / volumeSlider.offsetWidth);
        setVolume(percent);
    });

    // Play/Pause
    playBtn.addEventListener('click', togglePlay);
    
    // Previous/Next
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);
    
    // Shuffle
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active');
    });
    
    // Repeat
    repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active');
    });
    
    // Volume Mute/Unmute
    volumeBtn.addEventListener('click', toggleMute);
    
    // Like Track
    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('active');
        if (likeBtn.classList.contains('active')) {
            likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            likeBtn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
    
    // Queue
    queueBtn.addEventListener('click', toggleQueue);

    // Audio player events
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', handleTrackEnd);
}

function updateProgress() {
    const progress = document.querySelector('.progress');
    const currentTime = document.querySelector('.time-current');
    const totalTime = document.querySelector('.time-total');
    
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = percent + '%';
    
    currentTime.textContent = formatTime(audioPlayer.currentTime);
    totalTime.textContent = formatTime(audioPlayer.duration);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function setVolume(value) {
    currentVolume = Math.max(0, Math.min(1, value));
    audioPlayer.volume = currentVolume;
    document.querySelector('.volume-progress').style.width = (currentVolume * 100) + '%';
    updateVolumeIcon();
}

function updateVolumeIcon() {
    const volumeBtn = document.querySelector('.volume-btn');
    if (currentVolume === 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (currentVolume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function toggleMute() {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
    } else {
        audioPlayer.volume = currentVolume;
    }
    updateVolumeIcon();
}

function toggleQueue() {
    const queuePopup = document.querySelector('.queue-popup');
    queuePopup.classList.toggle('active');
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', initMusicPlayer);

// Enhanced product card rendering
function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.innerHTML = `
            <img src="${product.cover}" alt="${product.title}" loading="lazy">
            <div class="product-info">
                <div class="title-section">
                    <h3>${product.title}</h3>
                    <p class="artist">${product.artist}</p>
                    <div class="rating">
                        ${generateStarRating(product.rating)}
                        <span class="rating-number">(${product.rating})</span>
                    </div>
                </div>
                <div class="price-section">
                    <p class="price">$${product.price.toFixed(2)}</p>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${JSON.stringify(product)})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}

// Filter functionality
const genreFilter = document.getElementById('genre-filter');
const priceFilter = document.getElementById('price-filter');

function applyFilters() {
    let filteredProducts = [...musicData];
    
    if (genreFilter.value) {
        filteredProducts = filteredProducts.filter(product => 
            product.genre === genreFilter.value
        );
    }

    if (priceFilter.value === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (priceFilter.value === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

genreFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);

// Add mobile menu toggle
const mobileMenu = document.createElement('button');
mobileMenu.className = 'mobile-menu-toggle';
mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').insertBefore(mobileMenu, document.querySelector('.nav-links'));

mobileMenu.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && document.querySelector('.nav-links').classList.contains('active')) {
        document.querySelector('.nav-links').classList.remove('active');
    }
});

// Handle touch events for music player
const progressBar = document.querySelector('.progress-bar');
progressBar.addEventListener('touchstart', handleProgressTouch);
progressBar.addEventListener('touchmove', handleProgressTouch);

function handleProgressTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const bounds = progressBar.getBoundingClientRect();
    const percent = (touch.clientX - bounds.left) / bounds.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
    updateProgress();
}

// Add loading state for images
function addLoadingState(element) {
    element.classList.add('loading-skeleton');
    element.addEventListener('load', () => {
        element.classList.remove('loading-skeleton');
    });
}

// Apply loading state to all album covers
document.querySelectorAll('.product-card img, .featured-card img').forEach(addLoadingState);

// Handle offline state
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    if (!navigator.onLine) {
        showNotification('You are offline. Some features may be limited.');
    }
}

// Optimize performance for mobile
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events
const debouncedScroll = debounce(() => {
    // Handle scroll-based animations or loading
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Add remove from cart functionality
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Add featured albums data
const featuredAlbums = [
    {
        id: 'f1',
        title: "Neon Nights",
        artist: "Synthwave Masters",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400"
    },
    {
        id: 'f2',
        title: "Ocean Waves",
        artist: "Ambient Collective",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400"
    },
    {
        id: 'f3',
        title: "Urban Stories",
        artist: "City Beats",
        cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400"
    }
];

// Add function to render featured albums
function renderFeaturedAlbums() {
    const featuredGrid = document.querySelector('.featured-grid');
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = '';
    
    featuredAlbums.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.className = 'featured-card';
        albumCard.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <div class="featured-info">
                <h3>${album.title}</h3>
                <p>${album.artist}</p>
                <button class="play-featured" onclick="playFeaturedAlbum('${album.id}')">
                    <i class="fas fa-play"></i> Play Now
                </button>
            </div>
        `;
        featuredGrid.appendChild(albumCard);
    });
}

// Play featured album
function playFeaturedAlbum(albumId) {
    const album = featuredAlbums.find(a => a.id === albumId);
    if (!album) return;
    
    // Update music player
    const playerAlbumArt = document.getElementById('player-album-art');
    const trackName = document.querySelector('.track-name');
    const artistName = document.querySelector('.artist-name');
    
    playerAlbumArt.src = album.cover;
    trackName.textContent = album.title;
    artistName.textContent = album.artist;
    
    // Auto-play
    const playBtn = document.querySelector('.play-btn');
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    
    // Show notification
    showNotification(`Now playing: ${album.title}`);
}

// Update cart counter animation
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    cartCount.classList.add('pulse');
    setTimeout(() => cartCount.classList.remove('pulse'), 300);
}

// Add this CSS for cart count animation
const style = document.createElement('style');
style.textContent = `
    .cart-count {
        transition: transform 0.3s ease;
    }
    .cart-count.pulse {
        animation: cartPulse 0.3s ease;
    }
    @keyframes cartPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
`;
document.head.appendChild(style);

// Add page-specific initialization
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize page-specific content
    if (currentPage.includes('shop.html')) {
        renderProducts(musicData);
    } else if (currentPage.includes('genres.html')) {
        renderGenres();
    } else {
        // Home page
        renderFeaturedAlbums();
        renderProducts(musicData.slice(0, 6)); // Show fewer items on home page
    }
});

// Update the HTML for the cart modal
document.querySelector('.cart-modal').innerHTML = `
    <div class="cart-header">
        <h2>Your Cart</h2>
        <button class="cart-close" onclick="toggleCart()">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <div class="cart-items">
        <!-- Cart items will be dynamically added here -->
    </div>
    <div class="cart-total">
        <p>Total: $<span id="cart-total">0.00</span></p>
        <button class="checkout-btn">
            <i class="fas fa-shopping-cart"></i> Checkout
        </button>
    </div>
`;

// Add click event to cart icon
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

// Add genre data
const genreData = [
    {
        name: "Rock",
        image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400",
        count: 125
    },
    {
        name: "Jazz",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400",
        count: 89
    },
    // Add more genres...
];

// Function to render genres
function renderGenres() {
    const genresGrid = document.querySelector('.genres-grid');
    if (!genresGrid) return;

    genresGrid.innerHTML = '';
    genreData.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.className = 'genre-card';
        genreCard.innerHTML = `
            <img src="${genre.image}" alt="${genre.name}">
            <div class="genre-info">
                <h3>${genre.name}</h3>
                <p>${genre.count} albums</p>
            </div>
        `;
        genresGrid.appendChild(genreCard);
    });
}

// Cart notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add a sample song with audio URL
const sampleSong = {
    id: 'song1',
    title: "Summer Vibes",
    artist: "Chill Wave",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Sample free music
};

// Update music player functionality
function togglePlay() {
    if (!currentTrack) {
        // If no track is loaded, load the sample song
        loadTrack(sampleSong);
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

function loadTrack(track) {
    currentTrack = track;
    audioPlayer.src = track.audioUrl;
    
    // Update player UI
    const playerAlbumArt = document.getElementById('player-album-art');
    const trackName = document.querySelector('.track-name');
    const artistName = document.querySelector('.artist-name');
    
    playerAlbumArt.src = track.cover;
    trackName.textContent = track.title;
    artistName.textContent = track.artist;
    
    // Add to queue if not already present
    if (!queue.find(t => t.id === track.id)) {
        queue.push(track);
        updateQueueUI();
    }
}

function handleTrackEnd() {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else if (isShuffle) {
        playRandomTrack();
    } else {
        playNext();
    }
}

function playNext() {
    if (!currentTrack || queue.length <= 1) return;
    
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    loadTrack(queue[nextIndex]);
    if (isPlaying) audioPlayer.play();
}

function playPrevious() {
    if (!currentTrack || queue.length <= 1) return;
    
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    loadTrack(queue[prevIndex]);
    if (isPlaying) audioPlayer.play();
}

function playRandomTrack() {
    if (queue.length <= 1) return;
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * queue.length);
    } while (queue[randomIndex].id === currentTrack.id);
    
    loadTrack(queue[randomIndex]);
    if (isPlaying) audioPlayer.play();
}

function updateQueueUI() {
    const queueList = document.querySelector('.queue-list');
    if (!queueList) return;
    
    queueList.innerHTML = '';
    queue.forEach(track => {
        const queueItem = document.createElement('div');
        queueItem.className = `queue-item${currentTrack && track.id === currentTrack.id ? ' playing' : ''}`;
        queueItem.innerHTML = `
            <img src="${track.cover}" alt="${track.title}">
            <div class="queue-item-info">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
            </div>
            <button class="queue-item-play" onclick="loadTrack(${JSON.stringify(track)})">
                <i class="fas fa-play"></i>
            </button>
        `;
        queueList.appendChild(queueItem);
    });
}

