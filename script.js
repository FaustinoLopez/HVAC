// Cache key elements used by interactive features.
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
const currentYear = document.getElementById("current-year");
const serviceForm = document.getElementById("service-form");
const feedback = document.getElementById("form-feedback");

// Keep footer year current automatically.
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Mobile navigation toggle with close handlers.
if (navToggle && siteNav) {
  const closeNav = () => {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.classList.contains("open")) {
      return;
    }

    const clickedInsideNav = siteNav.contains(event.target) || navToggle.contains(event.target);
    if (!clickedInsideNav) {
      closeNav();
    }
  });
}

// Add depth to the header after the user starts scrolling.
// Use separate enter/exit thresholds to avoid jitter while the header resizes.
if (header) {
  const SCROLL_ENTER = 28;
  const SCROLL_EXIT = 8;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const isScrolled = header.classList.contains("scrolled");

    if (!isScrolled && y > SCROLL_ENTER) {
      header.classList.add("scrolled");
    } else if (isScrolled && y < SCROLL_EXIT) {
      header.classList.remove("scrolled");
    }
  });
}

// Demo form behavior for a static portfolio project.
if (serviceForm && feedback) {
  serviceForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!serviceForm.checkValidity()) {
      feedback.textContent = "Please complete all required fields before submitting.";
      feedback.className = "form-feedback error";
      serviceForm.reportValidity();
      return;
    }

    feedback.textContent = "Thanks. Your request has been received. A Gulf Coast Climate team member will contact you shortly.";
    feedback.className = "form-feedback success";
    serviceForm.reset();
  });
}
