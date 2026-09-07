document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Phrase-by-Phrase Smooth Sequential Transition & Reflection ---
  const scrambleElem = document.getElementById('hologramScramble');
  if (scrambleElem) {
    const phrases = [
      "Global Innovation",
      "Digital Transformation",
      "Cloud Architecture",
      "Cyber Intelligence",
      "Enterprise Scale"
    ];
    let currentIndex = 0;
    let autoTimer = null;
    let isTransitioning = false;

    function updatePills(activeIdx) {
      const pills = document.querySelectorAll('.tech-pill');
      pills.forEach((p, idx) => {
        if (idx === activeIdx) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }

    function changePhrase(targetIndex) {
      if (isTransitioning || targetIndex === currentIndex) return;
      isTransitioning = true;

      // 1. Fade & slide out current phrase
      scrambleElem.classList.add('text-fade-out');

      setTimeout(() => {
        currentIndex = targetIndex;
        scrambleElem.textContent = phrases[currentIndex];
        updatePills(currentIndex);

        // 2. Prepare position from below
        scrambleElem.classList.remove('text-fade-out');
        scrambleElem.classList.add('text-fade-in-prep');

        // Force browser reflow
        void scrambleElem.offsetWidth;

        // 3. Smoothly animate in to normal position
        scrambleElem.classList.remove('text-fade-in-prep');

        setTimeout(() => {
          isTransitioning = false;
        }, 400);
      }, 350);
    }

    function nextPhrase() {
      const nextIdx = (currentIndex + 1) % phrases.length;
      changePhrase(nextIdx);
    }

    function startAutoCycle() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        nextPhrase();
      }, 3500);
    }

    // Tech pills click/hover handlers
    const techPills = document.querySelectorAll('.tech-pill');
    techPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        changePhrase(idx);
        startAutoCycle();
      });
      pill.addEventListener('mouseenter', () => {
        changePhrase(idx);
        startAutoCycle();
      });
    });

    // Initial setup
    scrambleElem.textContent = phrases[0];
    updatePills(0);
    startAutoCycle();
  }

  // --- 2. Futuristic Digital Particle-Network Background ---
  const canvas = document.getElementById('globalParticlesCanvas') || document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: null, y: null, radius: 160 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Theme-Aware Color Palettes for each unique page
    let colors = ['#00f2fe', '#38bdf8', '#0ea5e9', '#60a5fa', '#3b82f6', '#93c5fd'];
    let lineStrokeColor = '56, 189, 248';
    let mouseLineColor = '0, 242, 254';

    if (document.body.classList.contains('theme-page-cream-crimson')) {
      colors = ['#e11d48', '#be123c', '#f43f5e', '#fb7185', '#9f1239', '#fda4af'];
      lineStrokeColor = '225, 29, 72';
      mouseLineColor = '190, 18, 60';
    } else if (document.body.classList.contains('theme-page-dark-orange')) {
      colors = ['#ea580c', '#f97316', '#fb923c', '#fbbf24', '#f59e0b', '#fdba74'];
      lineStrokeColor = '249, 115, 22';
      mouseLineColor = '251, 191, 36';
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 1.2; // Small, refined glowing dots
        this.speedX = (Math.random() - 0.5) * 0.35; // Slow, smooth & elegant movement
        this.speedY = (Math.random() - 0.5) * 0.35;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = Math.random() * 0.4 + 0.5;
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += 0.02;

        // Wrap around viewport edges smoothly
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;

        // Subtle gentle mouse attraction
        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.1;
            this.y -= (dy / distance) * force * 1.1;
          }
        }
      }
      draw() {
        const currentAlpha = this.baseAlpha + Math.sin(this.pulse) * 0.15;
        ctx.save();
        ctx.globalAlpha = Math.max(0.2, Math.min(1, currentAlpha));
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particleCount = Math.min(width > 768 ? 100 : 35, 120);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Thin subtle digital network connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.save();
            const alpha = 0.25 * (1 - dist / 130);
            ctx.strokeStyle = `rgba(${lineStrokeColor}, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Connect particles subtly to mouse cursor
        if (mouse.x != null && mouse.y != null) {
          const mdx = mouse.x - particles[i].x;
          const mdy = mouse.y - particles[i].y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) {
            ctx.save();
            const mouseAlpha = 0.4 * (1 - mdist / 150);
            ctx.strokeStyle = `rgba(${mouseLineColor}, ${mouseAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- 3. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(elem => revealObserver.observe(elem));

  // --- 3B. Scroll-Driven Character-by-Character Progressive Text Reveal (Supercharging Progress) ---
  const aboutParagraphs = document.querySelectorAll('.about-hero-desc');
  aboutParagraphs.forEach(aboutParagraph => {
    function splitToChars(container) {
      function processNode(node, isStrongParent) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          const words = text.split(/(\s+)/);
          const fragment = document.createDocumentFragment();

          words.forEach(chunk => {
            if (/^\s+$/.test(chunk)) {
              fragment.appendChild(document.createTextNode(chunk));
            } else if (chunk.length > 0) {
              const wordSpan = document.createElement('span');
              wordSpan.className = 'scroll-word';
              for (let i = 0; i < chunk.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.className = isStrongParent ? 'scroll-reveal-char is-strong' : 'scroll-reveal-char';
                charSpan.textContent = chunk[i];
                wordSpan.appendChild(charSpan);
              }
              fragment.appendChild(wordSpan);
            }
          });
          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const isStrong = isStrongParent || node.tagName === 'STRONG' || node.tagName === 'B';
          Array.from(node.childNodes).forEach(child => processNode(child, isStrong));
        }
      }

      Array.from(container.childNodes).forEach(child => processNode(child, false));
    }

    splitToChars(aboutParagraph);

    const charElements = Array.from(aboutParagraph.querySelectorAll('.scroll-reveal-char'));
    const totalChars = charElements.length;
    if (totalChars === 0) return;

    let charTicking = false;

    function updateCharReveal() {
      const rect = aboutParagraph.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when paragraph top enters the bottom 82% of viewport
      // Complete reveal when paragraph top reaches upper 28% of viewport
      const startTrigger = windowHeight * 0.82;
      const endTrigger = windowHeight * 0.28;
      const totalDist = Math.max(startTrigger - endTrigger, 1);

      const currentPos = startTrigger - rect.top;
      const progress = Math.min(Math.max(currentPos / totalDist, 0), 1);
      const activeCharCount = Math.floor(progress * (totalChars + 1));

      charElements.forEach((charSpan, index) => {
        if (index < activeCharCount) {
          charSpan.classList.add('revealed');
        } else {
          charSpan.classList.remove('revealed');
        }
      });
      charTicking = false;
    }

    function onCharScroll() {
      if (!charTicking) {
        requestAnimationFrame(updateCharReveal);
        charTicking = true;
      }
    }

    window.addEventListener('scroll', onCharScroll, { passive: true });
    window.addEventListener('resize', onCharScroll, { passive: true });
    updateCharReveal();
  });

  // --- 4. Counter Animation (Smooth Count-Up on Viewport Entrance) ---
  const countElements = document.querySelectorAll('.counter, [data-target]');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target') || parseInt(counter.innerText.replace(/[^0-9]/g, ''), 10);
        if (isNaN(target) || target <= 0) return;

        const duration = 2000;
        const startTime = performance.now();
        counter.innerText = '0';

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Smooth cubic ease-out curve
          const easeOutProgress = 1 - Math.pow(1 - progress, 3.5);
          const currentVal = Math.floor(easeOutProgress * target);
          counter.innerText = currentVal;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        }
        requestAnimationFrame(updateCounter);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.15 });

  countElements.forEach(elem => countObserver.observe(elem));

  // Also support container-level observer for #about, #stats, etc.
  const statContainers = document.querySelectorAll('#about, .about-grid, #stats, .stats, .pre-footer-stats, .hero-metrics-bar');
  if (statContainers.length > 0) {
    const containerObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const innerCounters = entry.target.querySelectorAll('.counter, [data-target]');
          innerCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText.replace(/[^0-9]/g, ''), 10);
            if (isNaN(target) || target <= 0) return;
            const duration = 2000;
            const startTime = performance.now();
            counter.innerText = '0';

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOutProgress = 1 - Math.pow(1 - progress, 3.5);
              const currentVal = Math.floor(easeOutProgress * target);
              counter.innerText = currentVal;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target;
              }
            }
            requestAnimationFrame(updateCounter);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    statContainers.forEach(container => containerObserver.observe(container));
  }

  // --- 5. Mobile Menu Toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.getElementById('menuOverlay');
  const drawerClose = document.querySelector('.drawer-close');

  function openMenu() {
    if (navLinks) navLinks.classList.add('active');
    if (menuOverlay) menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });

  // --- 6. Futuristic Enterprise Floating Capsule Scroll To Top Component ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    // Inject capsule markup with traveling light beam, glass backdrop, and expandable label
    if (!backToTop.querySelector('.capsule-inner-content')) {
      backToTop.innerHTML = `
        <div class="capsule-border-beam" aria-hidden="true"></div>
        <div class="capsule-glass-bg"></div>
        <div class="capsule-shimmer" aria-hidden="true"></div>
        <div class="capsule-inner-content">
          <div class="capsule-arrow-box">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="capsule-label-box">
            <span class="label-short">TOP</span>
            <span class="label-expanded">BACK TO TOP</span>
          </div>
        </div>
      `;
    }

    function updateCapsuleScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const docHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;

      // Reveal smoothly when scrolled past ~200px
      if (scrollY > 200) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }

      // Dynamic light intensity and near-bottom prominence
      if (docHeight > 0) {
        const scrollPercent = Math.min(Math.max(scrollY / docHeight, 0), 1);
        const glowLevel = (0.2 + (scrollPercent * 0.5)).toFixed(2);
        const borderLevel = (0.3 + (scrollPercent * 0.5)).toFixed(2);
        
        backToTop.style.setProperty('--scroll-glow', glowLevel);
        backToTop.style.setProperty('--border-intensity', borderLevel);

        if (scrollPercent > 0.78) {
          backToTop.classList.add('near-bottom');
        } else {
          backToTop.classList.remove('near-bottom');
        }
      }
    }

    window.addEventListener('scroll', updateCapsuleScroll, { passive: true });
    window.addEventListener('resize', updateCapsuleScroll, { passive: true });
    updateCapsuleScroll();

    // Smooth scroll to top on click
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      backToTop.classList.add('clicked');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        backToTop.classList.remove('clicked');
      }, 450);
    });

    // Keyboard Accessibility (Enter / Space)
    backToTop.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        backToTop.click();
      }
    });
  }

  // --- 7. Capabilities Individual Details Modal Functionality ---
  function openCapabilityModal(targetKey) {
    let key = (targetKey || 'digital-transformation').toLowerCase().trim();
    // Normalize aliases
    if (key === 'enterprise-software') key = 'ai-intelligent-solutions';
    if (key === 'infrastructure-mgmt') key = 'cybersecurity';

    // Close any currently active capability modal
    closeAllCapabilityModals();

    const targetModal = document.getElementById(`modal-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCapabilityModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllCapabilityModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, #consultationModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeAllCapabilityModals() {
    document.querySelectorAll('.capability-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('#consultationModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach card click handlers to open matching capability
  document.querySelectorAll('.service-card[data-modal]').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on a direct link
      if (e.target.closest('a') && !e.target.closest('.card-learn')) return;
      const key = card.getAttribute('data-modal');
      openCapabilityModal(key);
    });
  });

  // Attach all "Explore Capabilities" & "Explore Service" triggers
  document.querySelectorAll('.card-learn, .btn-service-explore, [data-service-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      let key = btn.getAttribute('data-service-trigger') || btn.getAttribute('data-modal');
      if (!key) {
        const parentCard = btn.closest('[data-modal]');
        if (parentCard) key = parentCard.getAttribute('data-modal');
      }
      openCapabilityModal(key || 'digital-transformation');
    });
  });

  // --- 7b. Domain Expertise & Dedicated Industry Page Modal Functionality ---
  function openIndustryDetailModal(targetKey) {
    let key = (targetKey || 'fintech').toLowerCase().trim();
    if (key === 'financial-services' || key === 'banking') key = 'fintech';
    if (key === 'health') key = 'healthcare';
    if (key === 'cpg' || key === 'commerce') key = 'retail';
    if (key === 'finance') key = 'fintech';

    // Close any other open modals
    closeAllCapabilityModals();
    closeAllIndustryModals();

    const targetModal = document.getElementById(`modal-industry-${key}`) || document.getElementById(`modal-domain-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllIndustryModals() {
    document.querySelectorAll('.industry-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeIndustryModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllIndustryModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach all "Explore Industry" triggers on dedicated Industries page
  document.addEventListener('click', (e) => {
    const indBtn = e.target.closest('[data-open-industry-modal], [data-industry-modal], .btn-explore-industry');
    if (indBtn) {
      e.preventDefault();
      e.stopPropagation();
      let key = indBtn.getAttribute('data-open-industry-modal') || indBtn.getAttribute('data-industry-modal');
      if (!key) {
        const parentSec = indBtn.closest('[id]');
        if (parentSec) {
          const id = parentSec.id;
          if (id.includes('fintech') || id.includes('banking')) key = 'fintech';
          else if (id.includes('healthcare')) key = 'healthcare';
          else if (id.includes('manufacturing')) key = 'manufacturing';
          else if (id.includes('retail')) key = 'retail';
        }
      }
      openIndustryDetailModal(key || 'fintech');
    }
  });

  // Attach all legacy "Explore Solutions" triggers in Domain Expertise section
  document.querySelectorAll('.btn-industry-explore').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      let key = btn.getAttribute('data-domain-trigger');
      if (!key) {
        const parentCard = btn.closest('.industry-card[data-industry]');
        if (parentCard) key = parentCard.getAttribute('data-industry');
      }
      openIndustryDetailModal(key || 'fintech');
    });
  });

  // Close buttons and backdrop click for each industry modal
  document.querySelectorAll('.industry-detail-modal').forEach(modal => {
    modal.querySelectorAll('.industry-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeIndustryModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeIndustryModal(modal);
      }
    });
  });

  // Close buttons and backdrop click for each capability / domain modal
  document.querySelectorAll('.capability-detail-modal').forEach(modal => {
    modal.querySelectorAll('.capability-modal-close, .domain-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCapabilityModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCapabilityModal(modal);
      }
    });
  });

  // Global Escape key for industry, insight, and capability modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeCapModal = document.querySelector('.capability-detail-modal.active');
      if (activeCapModal) {
        closeCapabilityModal(activeCapModal);
      }
      const activeIndModal = document.querySelector('.industry-detail-modal.active');
      if (activeIndModal) {
        closeIndustryModal(activeIndModal);
      }
      const activeInsModal = document.querySelector('.insight-detail-modal.active');
      if (activeInsModal) {
        closeInsightModal(activeInsModal);
      }
      const activeJobModal = document.querySelector('.job-detail-modal.active');
      if (activeJobModal) {
        closeJobModal(activeJobModal);
      }
      const activeApplyModal = document.querySelector('.job-apply-modal.active');
      if (activeApplyModal) {
        closeJobApplyModal();
      }
    }
  });

  // --- 7c. Insights Page Modal & Category Filter Functionality ---
  function openInsightDetailModal(targetKey) {
    let key = (targetKey || 'ai').toLowerCase().trim();
    if (key === 'artificial-intelligence' || key === 'machine-learning') key = 'ai';
    if (key === 'cloud-computing') key = 'cloud';
    if (key === 'security' || key === 'sec') key = 'cybersecurity';
    if (key === 'digital-transformation' || key === 'transformation') key = 'modernization';
    if (key === 'industry-40' || key === 'manufacturing') key = 'industry40';
    if (key === 'emerging-tech' || key === 'emerging-technology') key = 'emerging';

    // Close any other open modals
    closeAllCapabilityModals();
    closeAllIndustryModals();
    closeAllInsightModals();

    const targetModal = document.getElementById(`modal-insight-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllInsightModals() {
    document.querySelectorAll('.insight-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeInsightModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllInsightModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach all "Read Insight" / Spotlight triggers
  document.addEventListener('click', (e) => {
    const insBtn = e.target.closest('[data-open-insight-modal], [data-insight-modal], .spotlight-teaser-card');
    if (insBtn) {
      e.preventDefault();
      e.stopPropagation();
      let key = insBtn.getAttribute('data-open-insight-modal') || insBtn.getAttribute('data-insight-modal');
      if (!key) {
        const parentCard = insBtn.closest('[data-category]');
        if (parentCard) key = parentCard.getAttribute('data-category');
      }
      openInsightDetailModal(key || 'ai');
    }
  });

  // Close buttons and backdrop click for each insight modal
  document.querySelectorAll('.insight-detail-modal').forEach(modal => {
    modal.querySelectorAll('.insight-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeInsightModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeInsightModal(modal);
      }
    });
  });

  // Category Filtering on Insights Page
  const filterBar = document.getElementById('insightsFilterBar');
  if (filterBar) {
    const filterPills = filterBar.querySelectorAll('.filter-pill');
    const articles = document.querySelectorAll('.featured-insight-card, .insight-article-card');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-filter');

        articles.forEach(article => {
          const category = article.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            article.style.display = '';
            article.style.opacity = '1';
            article.style.transform = 'translateY(0)';
          } else {
            article.style.display = 'none';
          }
        });
      });
    });
  }

  // --- 7d. Careers Page Position Modals, Apply Form & Department Filtering ---
  function openJobDetailModal(targetKey) {
    let key = (targetKey || 'se').toLowerCase().trim();
    if (key === 'software-engineer' || key === 'engineering') key = 'se';
    if (key === 'ai' || key === 'ml' || key === 'ai-ml' || key === 'ai-data') key = 'aiml';
    if (key === 'cloud-engineer') key = 'cloud';
    if (key === 'cybersecurity' || key === 'security') key = 'cyber';
    if (key === 'ui-ux' || key === 'ux') key = 'design';
    if (key === 'business-analyst' || key === 'business' || key === 'consulting') key = 'ba';

    // Close any other open modals
    closeAllCapabilityModals();
    closeAllIndustryModals();
    closeAllInsightModals();
    closeAllJobModals();
    closeJobApplyModal();

    const targetModal = document.getElementById(`modal-job-${key}`);
    if (targetModal) {
      targetModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllJobModals() {
    document.querySelectorAll('.job-detail-modal.active').forEach(m => {
      m.classList.remove('active');
    });
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, .job-apply-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  function closeJobModal(modal) {
    if (modal) {
      modal.classList.remove('active');
    } else {
      closeAllJobModals();
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, .job-detail-modal.active, .job-apply-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Application Form Modal Handlers
  function openJobApplyModal(jobTitle, deptName) {
    closeAllJobModals();
    const applyModal = document.getElementById('modal-career-apply');
    if (applyModal) {
      const titleSpan = document.getElementById('applyJobTitleDisplay');
      const deptSpan = document.getElementById('applyDeptDisplay');
      const hiddenInput = document.getElementById('appliedJobRole');
      const formContainer = document.getElementById('applyFormContainer');
      const successContainer = document.getElementById('applySuccessContainer');
      const form = document.getElementById('careerApplicationForm');

      if (titleSpan) titleSpan.textContent = jobTitle || 'Software Engineer';
      if (deptSpan) deptSpan.textContent = deptName || 'Engineering';
      if (hiddenInput) hiddenInput.value = jobTitle || 'Software Engineer';

      if (formContainer) formContainer.style.display = 'block';
      if (successContainer) successContainer.style.display = 'none';
      if (form) {
        form.reset();
        form.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
      }

      applyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeJobApplyModal() {
    const applyModal = document.getElementById('modal-career-apply');
    if (applyModal) {
      applyModal.classList.remove('active');
    }
    const anyModalOpen = document.querySelector('.capability-detail-modal.active, .industry-detail-modal.active, .insight-detail-modal.active, .job-detail-modal.active, #consultationModal.active, #contactUsModal.active');
    if (!anyModalOpen) {
      document.body.style.overflow = '';
    }
  }

  // Attach all "View Position" triggers
  document.addEventListener('click', (e) => {
    const jobBtn = e.target.closest('[data-open-job-modal], [data-job-modal], .btn-view-job');
    if (jobBtn) {
      e.preventDefault();
      e.stopPropagation();
      let key = jobBtn.getAttribute('data-open-job-modal') || jobBtn.getAttribute('data-job-modal');
      if (!key) {
        const parentCard = jobBtn.closest('[data-job-category]');
        if (parentCard) key = parentCard.getAttribute('data-job-category');
      }
      openJobDetailModal(key || 'se');
    }

    // "Apply Now" trigger inside job modals
    const applyBtn = e.target.closest('.btn-apply-trigger');
    if (applyBtn) {
      e.preventDefault();
      e.stopPropagation();
      const title = applyBtn.getAttribute('data-apply-title') || 'Software Engineer';
      const dept = applyBtn.getAttribute('data-apply-dept') || 'Engineering';
      openJobApplyModal(title, dept);
    }
  });

  // Close buttons and backdrop click for each job modal
  document.querySelectorAll('.job-detail-modal').forEach(modal => {
    modal.querySelectorAll('.job-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeJobModal(modal);
      });
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeJobModal(modal);
      }
    });
  });

  // Close buttons and backdrop click for application modal
  const applyModalEl = document.getElementById('modal-career-apply');
  if (applyModalEl) {
    applyModalEl.querySelectorAll('.apply-modal-close, .modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeJobApplyModal();
      });
    });

    applyModalEl.addEventListener('click', (e) => {
      if (e.target === applyModalEl) {
        closeJobApplyModal();
      }
    });
  }

  // Application Form Submit Handler
  const careerForm = document.getElementById('careerApplicationForm');
  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fullNameInput = careerForm.querySelector('#applyFullName');
      const emailInput = careerForm.querySelector('#applyEmail');
      const phoneInput = careerForm.querySelector('#applyPhone');
      const resumeInput = careerForm.querySelector('#applyResume');

      // Validate Full Name
      if (!fullNameInput || !fullNameInput.value.trim()) {
        fullNameInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        fullNameInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        emailInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate Phone
      if (!phoneInput || !phoneInput.value.trim()) {
        phoneInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        phoneInput.closest('.form-group')?.classList.remove('has-error');
      }

      // Validate Resume
      if (!resumeInput || !resumeInput.files || resumeInput.files.length === 0) {
        resumeInput?.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      } else {
        resumeInput.closest('.form-group')?.classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = careerForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Processing Application...</span> <i class="fas fa-spinner fa-spin"></i>';
        }

        setTimeout(() => {
          const formContainer = document.getElementById('applyFormContainer');
          const successContainer = document.getElementById('applySuccessContainer');
          if (formContainer) formContainer.style.display = 'none';
          if (successContainer) successContainer.style.display = 'block';

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Submit Application</span> <i class="fas fa-paper-plane"></i>';
          }
        }, 600);
      }
    });

    // Clear error on input
    careerForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group')?.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        input.closest('.form-group')?.classList.remove('has-error');
      });
    });
  }

  // Department Category Filter on Careers Page
  const careerFilterBar = document.getElementById('careersFilterBar');
  if (careerFilterBar) {
    const filterPills = careerFilterBar.querySelectorAll('.career-pill');
    const jobItems = document.querySelectorAll('.job-card-item');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-job-filter');

        jobItems.forEach(job => {
          const category = job.getAttribute('data-job-category');
          if (filterValue === 'all' || category === filterValue) {
            job.classList.remove('is-hidden');
            job.style.display = 'flex';
            job.style.opacity = '1';
            job.style.transform = 'translateY(0)';
          } else {
            job.classList.add('is-hidden');
            job.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Sticky QuickBar Scrollspy & Smooth Scrolling ---
  const quickbar = document.getElementById('industryQuickbar');
  if (quickbar) {
    const quickLinks = quickbar.querySelectorAll('.quickbar-link');
    const sections = document.querySelectorAll('.industry-section-item');

    // Smooth scroll on click
    quickLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 75;
            const quickbarHeight = quickbar.offsetHeight || 55;
            const targetPos = targetSection.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + quickbarHeight + 15);
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }
      });
    });

    // ScrollSpy Observer
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          quickLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}` || link.getAttribute('data-target') === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: "-100px 0px -40% 0px" });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // --- Free Consultation Popup Modal Handler ---
  function getOrCreateConsultationModal() {
    let consultModal = document.getElementById('consultationModal');
    if (!consultModal) {
      consultModal = document.createElement('div');
      consultModal.id = 'consultationModal';
      consultModal.setAttribute('role', 'dialog');
      consultModal.setAttribute('aria-modal', 'true');
      consultModal.innerHTML = `
        <div class="modal-box consultation-modal-box">
          <button class="modal-close consultation-modal-close" aria-label="Close modal"><i class="fas fa-times"></i></button>
          <div class="consultation-header">
            <div class="modal-badge"><i class="fas fa-calendar-check"></i> Free Consultation</div>
            <h2>Request Your Free Consultation</h2>
            <p class="modal-subtitle">Connect with our enterprise technology experts for a personalized strategy session.</p>
          </div>
          
          <form id="consultationForm" class="consultation-form">
            <div class="form-row">
              <div class="form-group">
                <label for="consultName">Full Name *</label>
                <input type="text" id="consultName" placeholder="Arshith Infotech" required />
              </div>
              <div class="form-group">
                <label for="consultEmail">Work Email *</label>
                <input type="email" id="consultEmail" placeholder="support@arshith-infotech.com" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="consultPhone">Phone Number</label>
                <input type="tel" id="consultPhone" placeholder="+91 8618471424" />
              </div>
              <div class="form-group">
                <label for="consultService">Service of Interest</label>
                <select id="consultService">
                  <option value="Digital Transformation">Digital Transformation</option>
                  <option value="Cloud Computing & Migration">Cloud Computing & Migration</option>
                  <option value="Engineering & R&D">Engineering & R&D</option>
                  <option value="Enterprise Software Solutions">Enterprise Software Solutions</option>
                  <option value="Infrastructure Management & SecOps">Infrastructure Management & SecOps</option>
                  <option value="Other Technology Inquiry">Other Technology Inquiry</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="consultMessage">Project Details / Goals</label>
              <textarea id="consultMessage" rows="3" placeholder="Tell us about your technical goals or challenge..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary consultation-submit-btn">
              Submit Consultation Request <i class="fas fa-paper-plane"></i>
            </button>
            <p class="form-note"><i class="fas fa-shield-alt"></i> 100% Confidential. Zero obligation.</p>
          </form>
          
          <div id="consultationSuccess" class="consultation-success" style="display: none;">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Consultation Request Received!</h3>
            <p>Thank you for reaching out. One of our lead solution architects will contact you within 24 business hours.</p>
            <button type="button" class="btn btn-primary consultation-done-btn">Done</button>
          </div>
        </div>
      `;
      document.body.appendChild(consultModal);
    }
    return consultModal;
  }

  function openConsultationModal(serviceTitle = '') {
    closeAllCapabilityModals();

    const consultModal = getOrCreateConsultationModal();
    const consultForm = consultModal.querySelector('#consultationForm');
    const consultSuccess = consultModal.querySelector('#consultationSuccess');
    const serviceSelect = consultModal.querySelector('#consultService');

    if (consultForm) consultForm.style.display = 'flex';
    if (consultSuccess) consultSuccess.style.display = 'none';

    if (serviceSelect && serviceTitle) {
      let matchFound = false;
      Array.from(serviceSelect.options).forEach(opt => {
        if (opt.value.toLowerCase().includes(serviceTitle.toLowerCase()) || serviceTitle.toLowerCase().includes(opt.value.toLowerCase())) {
          opt.selected = true;
          matchFound = true;
        }
      });
      if (!matchFound) {
        const newOpt = new Option(serviceTitle, serviceTitle, true, true);
        serviceSelect.add(newOpt, 0);
      }
    }

    consultModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeConsultationModal() {
    const consultModal = document.getElementById('consultationModal');
    if (consultModal) {
      consultModal.classList.remove('active');
      const anyModalOpen = document.querySelector('.capability-detail-modal.active');
      if (!anyModalOpen) {
        document.body.style.overflow = '';
      }
    }
  }

  // Intercept all "Get a Free Consultation" modal-cta clicks
  document.addEventListener('click', (e) => {
    const ctaBtn = e.target.closest('.modal-cta, .cap-modal-cta-btn');
    if (ctaBtn) {
      e.preventDefault();
      e.stopPropagation();
      let activeServiceTitle = '';
      const parentModal = ctaBtn.closest('.capability-detail-modal');
      if (parentModal) {
        const titleEl = parentModal.querySelector('.capability-detail-title, h2, h3');
        if (titleEl) activeServiceTitle = titleEl.textContent.trim();
      }
      openConsultationModal(activeServiceTitle);
    }
  });

  // Bind close and submit handlers for consultation modal
  document.addEventListener('click', (e) => {
    if (e.target.closest('.consultation-modal-close') || e.target.closest('.consultation-done-btn')) {
      closeConsultationModal();
    }
    const consultModal = document.getElementById('consultationModal');
    if (consultModal && e.target === consultModal) {
      closeConsultationModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const consultModal = document.getElementById('consultationModal');
      if (consultModal && consultModal.classList.contains('active')) {
        closeConsultationModal();
      }
    }
  });

  // --- 7c. Global Navbar "Contact Us" Popup Modal Functionality ---
  let isContactModalTransitioning = false;

  function getOrCreateContactUsModal() {
    let modalBackdrop = document.getElementById('contactUsModal');
    if (!modalBackdrop) {
      modalBackdrop = document.createElement('div');
      modalBackdrop.id = 'contactUsModal';
      modalBackdrop.className = 'contact-us-modal-backdrop';
      modalBackdrop.setAttribute('role', 'dialog');
      modalBackdrop.setAttribute('aria-modal', 'true');
      modalBackdrop.setAttribute('aria-labelledby', 'contactModalHeading');
      modalBackdrop.innerHTML = `
        <div class="contact-modal-container">
          <button type="button" class="contact-modal-close-btn" id="contactModalClose" aria-label="Close Contact Us Popup">
            <i class="fas fa-times"></i>
          </button>

          <div class="contact-modal-header">
            <div class="contact-modal-badge">
              <i class="fas fa-paper-plane"></i> Connect With Our Team
            </div>
            <h2 id="contactModalHeading" class="contact-modal-heading">Let's Build Something Great Together</h2>
            <p class="contact-modal-subtitle">Have a project, idea, or business challenge in mind? Tell us what you need and our team will get back to you.</p>
          </div>

          <div class="contact-modal-body-grid">
            <!-- LEFT SIDE — CONTACT INFORMATION -->
            <div class="contact-info-col">
              <h3 class="contact-info-title"><i class="fas fa-headset"></i> Connect With Us</h3>
              <p class="contact-info-desc">Reach out directly through any of our channels or send us a message with your requirements.</p>

              <div class="contact-info-list">
                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact-info-content">
                    <span class="contact-info-label">Email</span>
                    <a href="mailto:info@arshithinfotech.com" class="contact-info-value">info@arshithinfotech.com</a>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div class="contact-info-content">
                    <span class="contact-info-label">Phone</span>
                    <a href="tel:+91XXXXXXXXXX" class="contact-info-value">+91 XXXXX XXXXX</a>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div class="contact-info-content">
                    <span class="contact-info-label">Location</span>
                    <span class="contact-info-value">India</span>
                  </div>
                </div>
              </div>

              <div class="contact-trust-box">
                <i class="fas fa-shield-alt"></i>
                <span>Enterprise confidentiality guaranteed. We strictly safeguard your business discussions and information.</span>
              </div>
            </div>

            <!-- RIGHT SIDE — CONTACT FORM -->
            <div class="contact-form-col">
              <h3 class="contact-form-title">Send Us a Message</h3>

              <form id="contactUsNavbarForm" class="contact-modal-form" novalidate>
                <div class="contact-form-group" id="groupFullName">
                  <label for="contactFullName">Full Name <span class="req">*</span></label>
                  <div class="contact-input-wrap">
                    <input type="text" id="contactFullName" name="fullName" placeholder="Enter your name" required autocomplete="name" />
                    <i class="fas fa-user input-icon"></i>
                  </div>
                  <span class="field-error-text" id="nameError">Please enter your full name.</span>
                </div>

                <div class="contact-form-group" id="groupEmail">
                  <label for="contactEmail">Email Address <span class="req">*</span></label>
                  <div class="contact-input-wrap">
                    <input type="email" id="contactEmail" name="email" placeholder="Enter your email" required autocomplete="email" />
                    <i class="fas fa-envelope input-icon"></i>
                  </div>
                  <span class="field-error-text" id="emailError">Please enter a valid email address.</span>
                </div>

                <div class="contact-form-row">
                  <div class="contact-form-group" id="groupPhone">
                    <label for="contactPhone">Phone Number</label>
                    <div class="contact-input-wrap">
                      <input type="tel" id="contactPhone" name="phone" placeholder="Enter your phone number" autocomplete="tel" />
                      <i class="fas fa-phone-alt input-icon"></i>
                    </div>
                  </div>

                  <div class="contact-form-group" id="groupCompany">
                    <label for="contactCompany">Company</label>
                    <div class="contact-input-wrap">
                      <input type="text" id="contactCompany" name="company" placeholder="Enter your company name" autocomplete="organization" />
                      <i class="fas fa-building input-icon"></i>
                    </div>
                  </div>
                </div>

                <div class="contact-form-group" id="groupMessage">
                  <label for="contactMessage">Message <span class="req">*</span></label>
                  <textarea id="contactMessage" name="message" class="contact-textarea" rows="4" placeholder="Tell us about your project or requirement..." required></textarea>
                  <span class="field-error-text" id="messageError">Please enter your message.</span>
                </div>

                <button type="submit" class="btn btn-primary contact-submit-btn" id="contactSubmitBtn">
                  <span>Send Message</span>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>

              <!-- SUCCESS STATE -->
              <div id="contactSuccessState" class="contact-success-state">
                <div class="contact-success-icon">
                  <i class="fas fa-check-circle"></i>
                </div>
                <h4 class="contact-success-title">Message Sent Successfully!</h4>
                <p class="contact-success-desc">Thank you for reaching out. Our team will review your message and get back to you shortly.</p>
                <button type="button" class="btn btn-primary contact-success-close-btn" id="contactSuccessCloseBtn">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalBackdrop);
      bindContactModalEvents(modalBackdrop);
    }
    return modalBackdrop;
  }

  function openContactUsModal() {
    if (isContactModalTransitioning) return;

    // Close any other open capability / consultation modals
    closeAllCapabilityModals();
    if (typeof closeConsultationModal === 'function') {
      closeConsultationModal();
    }

    const modal = getOrCreateContactUsModal();
    const form = modal.querySelector('#contactUsNavbarForm');
    const success = modal.querySelector('#contactSuccessState');

    // Reset form to active view and clear errors
    if (form) {
      form.style.display = 'flex';
      modal.querySelectorAll('.contact-form-group').forEach(grp => grp.classList.remove('has-error'));
    }
    if (success) {
      success.style.display = 'none';
    }

    modal.classList.remove('closing');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const nameInput = modal.querySelector('#contactFullName');
      if (nameInput) nameInput.focus();
    }, 150);
  }

  function closeContactUsModal() {
    const modal = document.getElementById('contactUsModal');
    if (!modal || !modal.classList.contains('active') || isContactModalTransitioning) return;

    isContactModalTransitioning = true;
    modal.classList.add('closing');

    setTimeout(() => {
      modal.classList.remove('active');
      modal.classList.remove('closing');
      isContactModalTransitioning = false;

      // Restore scrolling if no other modals are open
      const anyOtherActive = document.querySelector('.capability-detail-modal.active, #consultationModal.active');
      if (!anyOtherActive) {
        document.body.style.overflow = '';
      }
    }, 300);
  }

  function bindContactModalEvents(modal) {
    const form = modal.querySelector('#contactUsNavbarForm');
    const success = modal.querySelector('#contactSuccessState');
    const closeBtn = modal.querySelector('#contactModalClose');
    const successCloseBtn = modal.querySelector('#contactSuccessCloseBtn');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeContactUsModal();
      });
    }

    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeContactUsModal();
      });
    }

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeContactUsModal();
      }
    });

    // Real-time error dismissal on input
    const nameInput = modal.querySelector('#contactFullName');
    const emailInput = modal.querySelector('#contactEmail');
    const messageInput = modal.querySelector('#contactMessage');

    [nameInput, emailInput, messageInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          const group = inp.closest('.contact-form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });

    // Form Submission & Validation
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        let firstInvalid = null;

        const nameVal = nameInput ? nameInput.value.trim() : '';
        const emailVal = emailInput ? emailInput.value.trim() : '';
        const messageVal = messageInput ? messageInput.value.trim() : '';

        // Validate Full Name
        const nameGroup = modal.querySelector('#groupFullName');
        if (!nameVal) {
          isValid = false;
          if (nameGroup) nameGroup.classList.add('has-error');
          if (!firstInvalid) firstInvalid = nameInput;
        } else {
          if (nameGroup) nameGroup.classList.remove('has-error');
        }

        // Validate Email (Format & Required)
        const emailGroup = modal.querySelector('#groupEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          isValid = false;
          if (emailGroup) emailGroup.classList.add('has-error');
          if (!firstInvalid) firstInvalid = emailInput;
        } else {
          if (emailGroup) emailGroup.classList.remove('has-error');
        }

        // Validate Message
        const messageGroup = modal.querySelector('#groupMessage');
        if (!messageVal) {
          isValid = false;
          if (messageGroup) messageGroup.classList.add('has-error');
          if (!firstInvalid) firstInvalid = messageInput;
        } else {
          if (messageGroup) messageGroup.classList.remove('has-error');
        }

        if (!isValid) {
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // Success State
        form.reset();
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
        }
      });
    }
  }

  // Global Escape key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const contactModal = document.getElementById('contactUsModal');
      if (contactModal && contactModal.classList.contains('active')) {
        closeContactUsModal();
      }
    }
  });

  // Intercept Navbar "Contact Us" clicks on EVERY page
  document.addEventListener('click', (e) => {
    const contactTrigger = e.target.closest('.nav-cta, .drawer-cta-btn, [data-open-contact-modal], .navbar a[href*="#contact"], .nav-links a[href*="#contact"]');
    if (contactTrigger) {
      e.preventDefault();
      e.stopPropagation();

      // Close mobile navigation drawer if open
      if (typeof closeMenu === 'function') {
        closeMenu();
      }

      openContactUsModal();
    }
  });

  // Pre-initialize Contact Modal DOM
  getOrCreateContactUsModal();

  // --- 8. Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'block';
      }
    });
  }

  // --- 9. Newsletter Form Handling ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        btn.style.background = '#10b981';
      }
      if (input) {
        input.value = '';
        input.placeholder = 'Thank you for subscribing!';
        input.disabled = true;
      }
    });
  });

  // --- 10. Cookie Consent Banner ---
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');

  if (cookieBanner) {
    if (!localStorage.getItem('cookieConsent')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1200);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieBanner.classList.remove('show');
      });
    }
  }

  // --- 11. Interactive Industry Cards (Hover Matter & Click Specular Reflection) ---
  const industryCards = document.querySelectorAll('.industry-card');
  industryCards.forEach(card => {
    // Inject light sweep reflection element if not present
    if (!card.querySelector('.card-reflection-sweep')) {
      const sweep = document.createElement('div');
      sweep.className = 'card-reflection-sweep';
      card.appendChild(sweep);
    }

    card.addEventListener('click', (e) => {
      // If clicking the explore button/link, allow smooth navigation
      if (e.target.closest('.btn-industry-explore')) {
        return;
      }

      const isAlreadyActive = card.classList.contains('active-reflect');

      // Create interactive click ripple pulse
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'click-reflection-ripple';
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);

      // Trigger specular diagonal reflection sweep
      const sweep = card.querySelector('.card-reflection-sweep');
      if (sweep) {
        sweep.classList.remove('sweep-animate');
        void sweep.offsetWidth; // Trigger reflow to restart animation
        sweep.classList.add('sweep-animate');
      }

      // Remove active-reflect from all other cards
      industryCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active-reflect');
        }
      });

      // Toggle active reflection on clicked card
      if (isAlreadyActive) {
        card.classList.remove('active-reflect');
      } else {
        card.classList.add('active-reflect');
      }
    });
  });

  // --- 12. Interactive Service Cards on Mobile Touch ---
  const serviceCardsList = document.querySelectorAll('.service-card');
  serviceCardsList.forEach(card => {
    card.addEventListener('click', (e) => {
      // If clicking card learn/button, let modal handle it
      if (e.target.closest('.card-learn') || e.target.closest('.service-slide-cue')) {
        return;
      }
      if (window.innerWidth <= 768) {
        const isTouchActive = card.classList.contains('active-touch');
        serviceCardsList.forEach(c => c.classList.remove('active-touch'));
        if (!isTouchActive) {
          card.classList.add('active-touch');
        }
      }
    });
  });
});


