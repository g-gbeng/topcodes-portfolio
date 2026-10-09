
/* =========================================
   PROJECT FILTERING & SEARCH
========================================= */

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const searchInput = document.getElementById("projectSearch");
const noProjects = document.getElementById("noProjects");

let currentFilter = "all";


/* =========================================
   GET SEARCHABLE PROJECT INFORMATION
========================================= */

function getSearchableContent(card) {
    const projectName = card.dataset.name || "";
    const projectType = card.dataset.type || "";
    const description = card.dataset.description || "";
    const technologies = card.dataset.technologies || "";
    const cardText = card.textContent || "";

    return `
        ${projectName}
        ${projectType}
        ${description}
        ${technologies}
        ${cardText}
    `.toLowerCase();
}


/* =========================================
   FILTER AND SEARCH PROJECTS
========================================= */

function filterProjects() {
    const searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const searchWords = searchTerm
        .split(/\s+/)
        .filter(Boolean);

    let visibleProjects = 0;

    projectCards.forEach(card => {
        const type = (card.dataset.type || "").toLowerCase();

        const searchableContent = getSearchableContent(card);

        const matchesFilter =
            currentFilter === "all" ||
            type === currentFilter.toLowerCase();

        const matchesSearch = searchWords.every(word =>
            searchableContent.includes(word)
        );

        const shouldShow = matchesFilter && matchesSearch;

        card.classList.toggle("hidden", !shouldShow);

        if (shouldShow) {
            visibleProjects++;
        }
    });

    /* NO RESULTS MESSAGE */
    if (noProjects) {
        noProjects.classList.toggle(
            "visible",
            visibleProjects === 0
        );
    }
}


/* =========================================
   FILTER BUTTONS
========================================= */

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter || "all";

        filterProjects();
    });
});


/* =========================================
   LIVE SEARCH
========================================= */

if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
}


/* =========================================
   INITIAL FILTER
========================================= */

filterProjects();