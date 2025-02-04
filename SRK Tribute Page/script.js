// Quotes Array
const quotes = [
    {
        text: "Success is not a good teacher, failure makes you humble.",
        source: "Shah Rukh Khan",
        year: "2008"
    },
    {
        text: "Don't become a philosopher before you become rich.",
        source: "Shah Rukh Khan",
        year: "2010"
    },
    {
        text: "I truly believe that God has given me the ability that when anyone meets me for the first time, they feel as if they have known me for years.",
        source: "Shah Rukh Khan",
        year: "2015"
    },
    {
        text: "I'm like a handyman, I can fix everything except broken hearts.",
        source: "Shah Rukh Khan",
        year: "2012"
    },
    {
        text: "Sometimes the path you're on is not as important as the direction you're heading.",
        source: "Shah Rukh Khan",
        year: "2016"
    }
];

// Quote Rotation
function rotateQuotes() {
    const quoteText = document.getElementById('quote-text');
    const quoteSource = document.getElementById('quote-source');
    let currentQuote = 0;

    setInterval(() => {
        quoteText.style.opacity = 0;
        quoteSource.style.opacity = 0;

        setTimeout(() => {
            quoteText.textContent = quotes[currentQuote].text;
            quoteSource.textContent = "- " + quotes[currentQuote].source;
            quoteText.style.opacity = 1;
            quoteSource.style.opacity = 1;
            currentQuote = (currentQuote + 1) % quotes.length;
        }, 500);
    }, 5000);
}

// Awards Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Fan Messages
const messageForm = document.getElementById('message-form');
const messagesContainer = document.getElementById('messages-container');

// Scroll Progress Bar
const createScrollProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Enhanced Movie Cards Interaction
const initializeMovieCards = () => {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const info = card.querySelector('.movie-info');
            info.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            const info = card.querySelector('.movie-info');
            info.style.transform = 'translateY(100%)';
        });
    });
};

// Enhanced Fan Messages with Local Storage
const initializeFanMessages = () => {
    const messages = JSON.parse(localStorage.getItem('fanMessages')) || [];
    
    messages.forEach(msg => {
        const messageElement = createMessageElement(msg.name, msg.message);
        messagesContainer.prepend(messageElement);
    });
    
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fan-name').value;
        const message = document.getElementById('fan-message').value;
        
        const newMessage = { name, message, date: new Date().toISOString() };
        messages.unshift(newMessage);
        localStorage.setItem('fanMessages', JSON.stringify(messages));
        
        const messageElement = createMessageElement(name, message);
        messagesContainer.prepend(messageElement);
        messageForm.reset();
    });
};

function createMessageElement(name, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('fan-message');
    messageElement.innerHTML = `
        <h4>${name}</h4>
        <p>${message}</p>
        <small>${new Date().toLocaleDateString()}</small>
    `;
    return messageElement;
}

// Film Category Filter
const initializeFilmFilter = () => {
    const filters = document.querySelectorAll('.film-filter');
    const movieCards = document.querySelectorAll('.movie-card');

    // Show all cards initially
    movieCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const category = filter.dataset.category;

            // Enhanced filter animation
            movieCards.forEach(card => {
                card.style.display = 'block'; // Show all cards first
                card.style.transition = 'all 0.5s ease-in-out';

                if (category === 'all' || card.dataset.category === category) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 500); // Match the transition duration
                }
            });
        });
    });

    // Helper function to show/hide cards with animation
    const toggleCard = (card, show) => {
        if (show) {
            card.style.display = 'block';
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 500);
        }
    };
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    const body = document.body;
    
    // Ensure all content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            body.classList.add('loaded');
            // Enable scrolling after preloader is gone
            document.body.style.overflow = 'auto';
            
            // Remove preloader from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 1000);
        }, 2000); // Show preloader for 2 seconds
    });

    // Disable scrolling while preloader is visible
    document.body.style.overflow = 'hidden';

    createScrollProgressBar();
    rotateQuotes();
    initializeMovieCards();
    initializeFanMessages();
    initializeFilmFilter();
    
    // Update counter targets
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'filmfare-count') {
                    animateCounter(entry.target, 14);
                } else if (entry.target.id === 'national-count') {
                    animateCounter(entry.target, 28);
                } else if (entry.target.id === 'box-office-count') {
                    animateCounter(entry.target, 42);
                }
            }
        });
    });

    observer.observe(document.getElementById('filmfare-count'));
    observer.observe(document.getElementById('national-count'));
    observer.observe(document.getElementById('box-office-count'));
}); 