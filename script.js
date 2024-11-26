// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Add Cloudinary configuration
const cloudinaryConfig = {
    cloudName: 'your_cloud_name',
    uploadPreset: 'your_preset'
};

// Sample gallery images
const galleryImages = [
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1/gallery/image1.jpg',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1/gallery/image2.jpg',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1/gallery/image3.jpg',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1/gallery/image4.jpg',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1/gallery/image5.jpg',
    'https://res.cloudinary.com/your_cloud_name/image/upload/v1/gallery/image6.jpg'
];

// Populate gallery
const gallery = document.querySelector('.gallery');
galleryImages.forEach(image => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${image}" alt="Gallery Image">`;
    gallery.appendChild(item);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handler
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('https://formspree.io/f/your_form_id', {
            method: 'POST',
            body: new FormData(e.target),
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            alert('Message sent successfully!');
            e.target.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
let currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icons based on theme
const updateThemeIcons = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.innerHTML = isDark ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
};

// Initialize theme
updateThemeIcons();

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons();
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    const isActive = navLinks.classList.contains('active');
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = isActive ? 
        '<i class="fas fa-bars"></i>' : 
        '<i class="fas fa-times"></i>';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? '' : 'hidden';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && 
        !mobileMenuBtn.contains(e.target) && 
        navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
});

// Enhanced Gallery Loading Animation
const loadGallery = () => {
    gallery.innerHTML = ''; // Clear existing items
    galleryImages.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        item.innerHTML = `
            <div class="gallery-item-inner">
                <div class="gallery-item-placeholder"></div>
            </div>
        `;
        gallery.appendChild(item);
    });
};

loadGallery();

// Add Cloudinary upload widget
const uploadWidget = cloudinary.createUploadWidget({
    cloudName: 'your_cloud_name',
    uploadPreset: 'your_preset',
    sources: ['local', 'url', 'camera'],
    multiple: true
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Image uploaded successfully:', result.info.secure_url);
    }
});
