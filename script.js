/**
 * IDEO STYLE - Traditional Ladies Clothing
 * JavaScript for Categories Page & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Handling
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenuBtn && navMenu) {
        closeMenuBtn.addEventListener('click', () => {
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // 2. Search Drawer Toggle & Live Filter
    const searchBtn = document.getElementById('searchBtn');
    const searchDrawer = document.getElementById('searchDrawer');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const categorySearchInput = document.getElementById('categorySearchInput');
    const allCategoryCards = document.querySelectorAll('.cat-card');

    if (searchBtn && searchDrawer) {
        searchBtn.addEventListener('click', () => {
            searchDrawer.classList.toggle('open');
            if (searchDrawer.classList.contains('open')) {
                categorySearchInput.focus();
            }
        });
    }

    if (closeSearchBtn && searchDrawer) {
        closeSearchBtn.addEventListener('click', () => {
            searchDrawer.classList.remove('open');
            categorySearchInput.value = '';
            resetCardFilter();
        });
    }

    if (categorySearchInput) {
        categorySearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                resetCardFilter();
                return;
            }

            allCategoryCards.forEach(card => {
                const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
                const catType = card.querySelector('.cat-type')?.textContent.toLowerCase() || '';
                const dataCat = card.getAttribute('data-category') || '';

                if (title.includes(query) || desc.includes(query) || catType.includes(query) || dataCat.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    function resetCardFilter() {
        allCategoryCards.forEach(card => {
            card.style.display = 'flex';
        });
    }

    // 3. Scroll Header Effect & Active Link Observer
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
        }

        // Active nav highlighting
        let current = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Close Modals on clicking outside or ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQuickView();
            closeSizeGuide();
        }
    });

    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeQuickView();
                closeSizeGuide();
            }
        });
    });
});

// Quick View Modal
function openQuickView(title, desc, price, sizes, imgSrc) {
    const modal = document.getElementById('quickViewModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalPrice').textContent = price;
    document.getElementById('modalSizesBadge').textContent = sizes;
    document.getElementById('modalImg').src = imgSrc;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Size Guide Modal
function showSizeGuide() {
    const modal = document.getElementById('sizeGuideModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSizeGuide() {
    const modal = document.getElementById('sizeGuideModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Newsletter Handler
function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const feedback = document.getElementById('newsletterFeedback');
    
    if (emailInput && emailInput.value) {
        const email = emailInput.value.trim();
        feedback.style.color = '#e7ce8b';
        feedback.textContent = `Thank you! 10% discount code "IDEO10" sent to ${email}.`;
        showToast('✨ Subscribed successfully! Welcome to Ideo Circle.');
        emailInput.value = '';
        setTimeout(() => {
            feedback.textContent = '';
        }, 5000);
    }
}

// Toast Notification Helper
function showToast(message) {
    const toast = document.getElementById('toastMessage');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
}
