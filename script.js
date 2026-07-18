document.addEventListener('DOMContentLoaded', function() {
  
  // ----- preloader -----
  window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('preloader').classList.add('hidden');
    }, 500);
  });

  // ----- product data -----
  const products = [
    { 
      name: 'Embroidered Anarkali', 
      price: '₹28,500', 
      img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop&crop=center' 
    },
    { 
      name: 'Silk Saree with Blouse', 
      price: '₹32,000', 
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop&crop=center' 
    },
    { 
      name: 'Bridal Lehenga Set', 
      price: '₹65,000', 
      img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop&crop=center' 
    },
    { 
      name: 'Contemporary Kurti', 
      price: '₹12,800', 
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=500&fit=crop&crop=center' 
    },
    { 
      name: 'Gold Tissue Saree', 
      price: '₹41,000', 
      img: 'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=400&h=500&fit=crop&crop=center' 
    },
    { 
      name: 'Festival Lehenga', 
      price: '₹39,900', 
      img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop&crop=center' 
    }
  ];

  const grid = document.getElementById('productGrid');
  if (grid) {
    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <div class="product-overlay">
            <button class="btn-quick" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}"><i class="fas fa-eye"></i> Quick View</button>
          </div>
        </div>
        <div class="info">
          <h4>${p.name}</h4>
          <div class="stars">★★★★☆</div>
          <div class="price">${p.price}</div>
        </div>
        <button class="btn-add" data-name="${p.name}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
      </div>
    `).join('');
  }

  // ----- cart counter -----
  let cartCount = 0;
  function addToCart(productName) {
    cartCount++;
    const countElement = document.getElementById('cartCount');
    countElement.textContent = cartCount;
    countElement.style.animation = 'none';
    void countElement.offsetWidth; 
    countElement.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    showToast(`✨ ${productName} added!`);
  }

  // ----- toast -----
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg || '✨ Item added to cart!';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // ----- subscribe -----
  document.getElementById('subscribeBtn').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value.trim();
    if (email) {
      showToast('✅ Subscribed! Welcome to Taj Fashion.');
      document.getElementById('emailInput').value = '';
    } else {
      showToast('📧 Please enter a valid email.');
    }
  });

  // ----- smooth scroll helper -----
  function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  // ----- event delegation for dynamically added items -----
  document.body.addEventListener('click', function(e) {
    // Quick View button
    if (e.target.closest('.btn-quick')) {
      const btn = e.target.closest('.btn-quick');
      openModal(btn.dataset.name, btn.dataset.price, btn.dataset.img);
    }
    // Add to cart button
    if (e.target.closest('.btn-add')) {
      const btn = e.target.closest('.btn-add');
      addToCart(btn.dataset.name);
    }
    // Footer info links
    if (e.target.closest('.footer-info')) {
      const link = e.target.closest('.footer-info');
      showToast(link.dataset.msg);
    }
    // Footer scroll links
    if (e.target.closest('.links a[data-scroll]')) {
      e.preventDefault();
      const link = e.target.closest('.links a[data-scroll]');
      scrollToSection(link.dataset.scroll);
    }
    // Social media links
    if (e.target.closest('.social i')) {
      const icon = e.target.closest('.social i');
      window.open(icon.dataset.url, '_blank');
    }
    // Category card click
    if (e.target.closest('.category-card')) {
      e.preventDefault();
      scrollToSection('arrivals');
    }
  });

  // ----- mobile menu toggle -----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && e.target !== hamburger && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  // ----- cart icon click -----
  document.getElementById('cartIcon').addEventListener('click', function() {
    showToast(`🛒 ${cartCount} item${cartCount!==1?'s':''} in cart`);
  });

  // ----- search overlay -----
  const searchOverlay = document.getElementById('searchOverlay');
  const searchIcon = document.getElementById('searchIcon');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  
  searchIcon.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 300);
  });
  searchClose.addEventListener('click', () => searchOverlay.classList.remove('active'));
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('active');
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
      showToast(`🔍 Searching for "${searchInput.value}"...`);
      searchOverlay.classList.remove('active');
      searchInput.value = '';
    }
  });

  // ----- quick view modal -----
  const modalOverlay = document.getElementById('modalOverlay');
  function openModal(name, price, img) {
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalImg').src = img;
    modalOverlay.classList.add('active');
  }
  function closeModal() {
    modalOverlay.classList.remove('active');
  }
  
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.getElementById('featuredQuickView').addEventListener('click', function() {
    openModal('Sky Blue Lehenga', '₹45,000', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=750&fit=crop&crop=center');
  });

  document.getElementById('modalAddToCartBtn').addEventListener('click', function() {
    const name = document.getElementById('modalTitle').innerText;
    addToCart(name);
    closeModal();
  });

  // ----- scroll reveal animation -----
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // ----- navbar scroll effect & active link -----
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  console.log('Taj Fashion · luxury women’s wear');
});
