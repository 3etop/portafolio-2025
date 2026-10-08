document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.site-nav');
    const navigationLinks = navigation.querySelectorAll('a');

    const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menú');
        navigation.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isExpanded));
        menuButton.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
        navigation.classList.toggle('is-open', !isExpanded);
        document.body.classList.toggle('menu-open', !isExpanded);
    });

    navigationLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 680) {
            closeMenu();
        }
    });

    document.getElementById('current-year').textContent = new Date().getFullYear();

    const certificateDialog = document.getElementById('certificate-dialog');
    const certificateDialogTitle = document.getElementById('certificate-dialog-title');
    const certificateImage = document.getElementById('certificate-dialog-image');
    const certificateCaption = document.getElementById('certificate-dialog-caption');

    document.querySelectorAll('.certificate-grid a').forEach(link => {
        link.addEventListener('click', event => {
            if (typeof certificateDialog.showModal !== 'function') {
                return;
            }

            event.preventDefault();
            const thumbnail = link.querySelector('img');
            certificateDialogTitle.textContent = 'Certificado';
            certificateImage.src = link.href;
            certificateImage.alt = thumbnail.alt;
            certificateCaption.textContent = link.querySelector('span').textContent;
            certificateDialog.showModal();
        });
    });

    document.querySelectorAll('.phone-preview-frame').forEach(button => {
        button.addEventListener('click', () => {
            if (typeof certificateDialog.showModal !== 'function') {
                return;
            }

            const projectTitle = button.closest('.project-card').querySelector('h3').textContent;
            certificateDialogTitle.textContent = 'Vista móvil del proyecto';
            certificateImage.src = button.dataset.mobileImage;
            certificateImage.alt = `Vista móvil de ${projectTitle}`;
            certificateCaption.textContent = `${projectTitle} · Vista móvil`;
            certificateDialog.showModal();
        });
    });

    document.querySelector('.certificate-dialog-close').addEventListener('click', () => {
        certificateDialog.close();
    });

    certificateDialog.addEventListener('click', event => {
        if (event.target === certificateDialog) {
            certificateDialog.close();
        }
    });

    const revealTargets = document.querySelectorAll(
        '.section-heading, .service-item, .process-grid li, .profile-copy, .profile-side, .contact-copy, .contact-details'
    );
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -48px 0px', threshold: 0.12 });

        revealTargets.forEach(target => {
            target.classList.add('will-reveal');
            revealObserver.observe(target);
        });
    }
});