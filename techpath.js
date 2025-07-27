// --- Enhanced Mobile Navigation ---
let isNavOpen = false;

// Enhanced toggle function
function toggleNav() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;
  
  if (!navToggle || !mobileNavOverlay || !mobileNav) {
    console.error('Mobile navigation elements not found:', {
      navToggle: !!navToggle,
      mobileNavOverlay: !!mobileNavOverlay,
      mobileNav: !!mobileNav
    });
    return;
  }
  
  isNavOpen = !isNavOpen;
  
  console.log('Toggle nav called, isNavOpen:', isNavOpen);
  
  navToggle.classList.toggle('active');
  mobileNavOverlay.classList.toggle('active');
  mobileNav.classList.toggle('active');
  
  console.log('Classes after toggle:', {
    navToggle: navToggle.classList.contains('active'),
    overlay: mobileNavOverlay.classList.contains('active'),
    nav: mobileNav.classList.contains('active')
  });
  
  if (isNavOpen) {
    body.style.overflow = 'hidden';
    // Focus management for accessibility
    const firstNavLink = mobileNav.querySelector('a');
    if (firstNavLink) {
      setTimeout(() => firstNavLink.focus(), 100);
    }
    // Add ARIA attributes
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
  } else {
    body.style.overflow = '';
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
  }
}

// Make toggleNav globally accessible
window.toggleNav = toggleNav;

(function() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;
  
  if (!navToggle || !mobileNavOverlay || !mobileNav) {
    console.error('Mobile navigation elements not found:', {
      navToggle: !!navToggle,
      mobileNavOverlay: !!mobileNavOverlay,
      mobileNav: !!mobileNav
    });
    return;
  }
  
  // Event listeners
  navToggle.addEventListener('click', toggleNav);
  
  // Close button functionality
  const closeButton = mobileNav.querySelector('.mobile-nav-close');
  if (closeButton) {
    console.log('Close button found, adding event listener');
    closeButton.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Close button clicked');
      toggleNav();
    };
  } else {
    console.log('Close button not found');
  }
  
  // Close on overlay click
  mobileNavOverlay.onclick = function(e) {
    console.log('Overlay clicked, target:', e.target);
    if (e.target === mobileNavOverlay) {
      console.log('Closing nav via overlay click');
      toggleNav();
    }
  };
  

  
  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isNavOpen) {
      toggleNav();
    }
  });
  
  // Close on window resize (if screen becomes large enough)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900 && isNavOpen) {
      toggleNav();
    }
  });
  
  // Touch gesture support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  mobileNavOverlay.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  mobileNavOverlay.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right to close (if nav is open)
    if (swipeDistance > swipeThreshold && isNavOpen) {
      toggleNav();
    }
  }
  
  // Initialize ARIA attributes
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation menu');
  navToggle.setAttribute('aria-controls', 'mobile-nav-overlay');
})();

// --- Hero Typing Animation (safe) ---
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const tpHighlight = document.getElementById('tp-highlight');
const big2 = document.getElementById('big2');
if (line1 && line2 && tpHighlight && big2) {
  let l1 = 'TechPath, now';
  let l2a = 'redesigned as ';
  let l2b = 'TechPath';
  let l3 = '2';
  let i = 0, j = 0, k = 0;
  line1.textContent = '';
  line2.innerHTML = '';
  tpHighlight.textContent = '';
  big2.textContent = '';
  function typeLines() {
    if (i < l1.length) {
      line1.textContent += l1[i++];
      setTimeout(typeLines, 45);
    } else if (j < l2a.length) {
      line2.innerHTML += l2a[j++];
      setTimeout(typeLines, 45);
    } else if (k < l2b.length) {
      tpHighlight.textContent += l2b[k++];
      setTimeout(typeLines, 45);
    } else if (big2.textContent.length < 1) {
      big2.textContent = l3;
      setTimeout(() => {
        big2.style.borderRight = '8px solid #fff';
        setTimeout(() => {
          big2.style.borderRight = '8px solid transparent';
          setTimeout(() => {
            big2.style.borderRight = '8px solid #fff';
            setTimeout(() => {
              big2.style.borderRight = 'none';
            }, 500);
          }, 500);
        }, 500);
      }, 400);
    }
  }
  typeLines();
}

// Typing animation for hero title (TechPath 2.0 style)
(function() {
  const techpathSpan = document.getElementById('hero-typed-techpath');
  const twoSpan = document.getElementById('hero-typed-2');
  if (!techpathSpan || !twoSpan) return;
  const mainText = 'TechPath';
  const subText = ' 2.0';
  let i = 0, j = 0;
  techpathSpan.textContent = '';
  twoSpan.textContent = '';
  function typeMain() {
    if (i < mainText.length) {
      techpathSpan.textContent += mainText[i++];
      setTimeout(typeMain, 90);
    } else if (j < subText.length) {
      twoSpan.textContent += subText[j++];
      setTimeout(typeMain, 120);
    } else {
      techpathSpan.style.opacity = '1';
      twoSpan.style.opacity = '1';
      techpathSpan.style.display = 'inline-block';
      twoSpan.style.display = 'inline-block';
    }
  }
  typeMain();
})();

// --- Enhanced Scroll-triggered animations with Intersection Observer ---
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.section-animate, .card-animate, .scroll-section');
    animatedElements.forEach(el => observer.observe(el));
  });
  
  // Fallback for older browsers
  function revealOnScroll() {
    document.querySelectorAll('.section-animate, .card-animate, .scroll-section').forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) section.classList.add('visible');
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
})();

// --- Enhanced Card Scrolling with Touch Support ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pro-cards-row').forEach(function(row) {
      const section = row.closest('.pro-section');
      if (!section) return;
      
      // Remove old arrows if any
      section.querySelectorAll('.scroll-arrow').forEach(btn => btn.remove());
      
      // Create left/right arrow buttons
      const leftBtn = document.createElement('button');
      leftBtn.className = 'scroll-arrow scroll-arrow-left';
      leftBtn.innerHTML = '◀';
      leftBtn.setAttribute('aria-label', 'Scroll left');
      
      const rightBtn = document.createElement('button');
      rightBtn.className = 'scroll-arrow scroll-arrow-right';
      rightBtn.innerHTML = '▶';
      rightBtn.setAttribute('aria-label', 'Scroll right');
      
      section.appendChild(leftBtn);
      section.appendChild(rightBtn);

      function updateArrows() {
        const isScrollable = row.scrollWidth > row.clientWidth;
        const isAtStart = row.scrollLeft <= 10;
        const isAtEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 10;
        
        leftBtn.style.display = (isScrollable && !isAtStart) ? 'block' : 'none';
        rightBtn.style.display = (isScrollable && !isAtEnd) ? 'block' : 'none';
      }
      
      leftBtn.addEventListener('click', function() {
        row.scrollBy({ left: -row.clientWidth * 0.8, behavior: 'smooth' });
      });
      
      rightBtn.addEventListener('click', function() {
        row.scrollBy({ left: row.clientWidth * 0.8, behavior: 'smooth' });
      });
      
      // Touch scrolling support
      let isScrolling = false;
      let startX = 0;
      let scrollLeft = 0;
      
      row.addEventListener('touchstart', function(e) {
        isScrolling = true;
        startX = e.touches[0].pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft;
      });
      
      row.addEventListener('touchmove', function(e) {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - row.offsetLeft;
        const walk = (x - startX) * 2;
        row.scrollLeft = scrollLeft - walk;
      });
      
      row.addEventListener('touchend', function() {
        isScrolling = false;
      });
      
      row.addEventListener('scroll', updateArrows);
      window.addEventListener('resize', updateArrows);
      updateArrows();
    });
  });
})();

// --- Enhanced Registration Form with Better UX ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reg-multistep');
    const successBlock = document.getElementById('reg-success-block');
    if (!form || !successBlock) return;
    
    const steps = Array.from(form.querySelectorAll('.reg-step-block'));
    let currentStep = 0;
    
    // Stepper elements
    const stepDots = document.querySelectorAll('.reg-step-dot');
    const stepLabels = document.querySelectorAll('.reg-step-labels .reg-step-label');
    const stepNum = document.querySelector('.reg-step-num');
    const stepTotal = document.querySelector('.reg-step-total');

    function showStep(idx, direction = 1) {
      steps.forEach((step, i) => {
        step.classList.remove('step-in', 'step-out', 'step-hidden');
        if (i === idx) {
          step.style.display = '';
          step.classList.add('step-in');
        } else if (i < idx) {
          step.style.display = '';
          step.classList.add('step-out');
        } else {
          step.style.display = '';
          step.classList.add('step-hidden');
        }
      });
      
      setTimeout(() => {
        steps.forEach((step, i) => {
          if (i !== idx) step.style.display = 'none';
        });
      }, 500);
      
      // Update dots and labels
      if (stepDots.length) {
        stepDots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
      }
      if (stepLabels.length) {
        stepLabels.forEach((label, i) => label.classList.toggle('active', i === idx));
      }
      if (stepNum) stepNum.textContent = (idx + 1);
      if (stepTotal) stepTotal.textContent = `/ ${steps.length}`;
    }

    showStep(currentStep);

    form.addEventListener('click', function(e) {
      // Helper to find the closest button with the class
      function closestBtn(el, cls) {
        while (el && el !== form) {
          if (el.classList && el.classList.contains(cls)) return el;
          el = el.parentElement;
        }
        return null;
      }
      
      if (closestBtn(e.target, 'reg-next-btn')) {
        e.preventDefault();
        if (currentStep < steps.length - 1) {
          showStep(++currentStep, 1);
        } else {
          // Final step: show success
          form.style.display = 'none';
          successBlock.style.display = 'flex';
          setTimeout(() => {
            successBlock.style.opacity = 1;
          }, 10);
        }
      } else if (closestBtn(e.target, 'reg-prev-btn')) {
        e.preventDefault();
        if (currentStep > 0) {
          showStep(--currentStep, -1);
        }
      }
    });
    
    // Keyboard navigation
    form.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && e.target.classList.contains('reg-input')) {
        e.preventDefault();
        const nextBtn = form.querySelector('.reg-next-btn');
        if (nextBtn) nextBtn.click();
      }
    });
  });
})();

// --- Enhanced File Input Handling ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.reg-field input[type="file"]').forEach(function(input) {
      input.addEventListener('change', function() {
        const regField = input.closest('.reg-field');
        if (!regField) return;
        
        let fileNameSpan = regField.querySelector('.reg-file-name');
        if (input.files && input.files.length > 0) {
          if (fileNameSpan) {
            fileNameSpan.textContent = input.files[0].name;
          } else {
            const span = document.createElement('span');
            span.className = 'reg-file-name';
            span.textContent = input.files[0].name;
            regField.appendChild(span);
          }
        } else if (fileNameSpan) {
          fileNameSpan.textContent = '';
        }
      });
    });
  });
})();

// --- Enhanced Video Responsiveness ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('hero-video');
    if (!heroVideo) return;
    
    // Enhanced video handling with background image fallback
    function handleVideoPlayback() {
      const bgImage = document.getElementById('hero-bg-image');
      
      if (window.innerWidth <= 768) {
        // On mobile, show background image and reduce video opacity
        heroVideo.style.opacity = '0.2';
        if (bgImage) {
          bgImage.style.opacity = '0.6';
        }
        heroVideo.pause();
      } else {
        // On desktop, show video normally
        heroVideo.style.opacity = '0.5';
        if (bgImage) {
          bgImage.style.opacity = '0';
        }
        heroVideo.play().catch(e => {
          console.log('Video autoplay prevented, showing background image');
          if (bgImage) {
            bgImage.style.opacity = '0.6';
          }
        });
      }
    }
    
    // Add video error handling
    heroVideo.addEventListener('error', function() {
      console.log('Video failed to load, showing background image');
      const bgImage = document.getElementById('hero-bg-image');
      if (bgImage) {
        heroVideo.style.opacity = '0';
        bgImage.style.opacity = '0.6';
      }
    });
    
    // Add video pause handling for mobile restrictions
    heroVideo.addEventListener('pause', function() {
      if (heroVideo.paused && !heroVideo.ended && window.innerWidth <= 768) {
        console.log('Video paused on mobile, showing background image');
        const bgImage = document.getElementById('hero-bg-image');
        if (bgImage) {
          bgImage.style.opacity = '0.6';
        }
      }
    });
    
    window.addEventListener('resize', handleVideoPlayback);
    handleVideoPlayback();
  });
})();

// --- Performance Optimizations ---
(function() {
  // Debounce function for performance
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
  
  // Optimized scroll handler
  const optimizedScrollHandler = debounce(function() {
    // Any scroll-based animations can go here
  }, 16); // ~60fps
  
  window.addEventListener('scroll', optimizedScrollHandler);
  
  // Preload critical resources
  function preloadResources() {
    const criticalImages = [
      'Login-cuate.png',
      'Happy student-amico.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadResources);
  } else {
    preloadResources();
  }
})();

// --- Accessibility Enhancements ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #b983ff;
      color: #18122b;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
      this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
      this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main-content';
    }
    
    // Enhance focus management
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
      el.addEventListener('focus', function() {
        this.style.outline = '2px solid #b983ff';
        this.style.outlineOffset = '2px';
      });
      
      el.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
      });
    });
  });
})(); 

// --- Registration Illustration Interactive Hover Effect ---
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const regIllustration = document.querySelector('.reg-illustration');
    const regAnim = document.querySelector('.reg-anim');
    
    if (!regIllustration || !regAnim) return;
    
    let isHovering = false;
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Desktop hover effect
    if (!isMobile) {
      regIllustration.addEventListener('mouseenter', function() {
        isHovering = true;
        this.style.cursor = 'none';
      });
      
      regIllustration.addEventListener('mouseleave', function() {
        isHovering = false;
        this.style.cursor = 'default';
        regAnim.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        this.style.setProperty('--mouse-x', '50%');
        this.style.setProperty('--mouse-y', '50%');
      });
      
      regIllustration.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -15;
        const rotateY = (x - centerX) / centerX * 15;
        
        const scale = 1.05;
        
        regAnim.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        
        // Update custom cursor position
        const mouseX = ((x / rect.width) * 100);
        const mouseY = ((y / rect.height) * 100);
        this.style.setProperty('--mouse-x', mouseX + '%');
        this.style.setProperty('--mouse-y', mouseY + '%');
      });
    }
    
    // Mobile touch effect
    if (isMobile) {
      regIllustration.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        regAnim.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      regIllustration.addEventListener('touchend', function() {
        regAnim.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      });
      
      regIllustration.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        regAnim.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
    }
  });
})();