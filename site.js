const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const siteNavLinks = siteNav.querySelectorAll("a");
const mobileMenuQuery = window.matchMedia("(max-width: 1050px)");

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  siteNav.dataset.open = String(open);
  syncMenuAccessibility();
}

function syncMenuAccessibility() {
  const isMobile = mobileMenuQuery.matches;
  const isOpen = siteNav.dataset.open === "true";

  if (isMobile && !isOpen) {
    siteNav.setAttribute("aria-hidden", "true");
    siteNav.inert = true;
    siteNavLinks.forEach((link) => {
      link.tabIndex = -1;
    });
  } else {
    siteNav.removeAttribute("aria-hidden");
    siteNav.inert = false;
    siteNavLinks.forEach((link) => {
      link.removeAttribute("tabindex");
    });
  }
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    menuToggle.focus();
  }
});

function handleViewportChange() {
  if (!mobileMenuQuery.matches) {
    setMenu(false);
  }
  syncMenuAccessibility();
}

if (mobileMenuQuery.addEventListener) {
  mobileMenuQuery.addEventListener("change", handleViewportChange);
} else {
  mobileMenuQuery.addListener(handleViewportChange);
}

syncMenuAccessibility();
