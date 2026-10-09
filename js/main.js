/* =========================================
   TOPCODES PORTFOLIO
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".site-header");

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    updateHeader
);

updateHeader();


/* =========================================
   SCROLL PROGRESS
========================================= */

const scrollProgress =
    document.getElementById("scrollProgress");

function updateScrollProgress() {

    if (!scrollProgress) return;

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${progress}%`;

}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

updateScrollProgress();


/* =========================================
   REVEAL ON SCROLL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");

if (revealElements.length) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navAnchors =
    document.querySelectorAll(
        '.nav-link[href^="#"]'
    );

if (
    sections.length &&
    navAnchors.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        navAnchors.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                            }
                        );


                        const activeLink =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );


                        if (activeLink) {

                            activeLink.classList.add(
                                "active"
                            );

                        }

                    }

                });

            },
            {
                threshold: 0.45
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");

if (
    cursorGlow &&
    window.matchMedia("(pointer:fine)").matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.transform =
                `translate(${event.clientX}px, ${event.clientY}px)`;

        }
    );

}