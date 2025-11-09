document.addEventListener("DOMContentLoaded", function () {
    // ----------------------------------------------------------------
    // 1. Logique du Menu Déroulant (PROFIL)
    // ----------------------------------------------------------------
    const profileTrigger = document.getElementById("profile-dropdown-trigger");
    const profileDropdown = document.getElementById("profile-dropdown-content");

    profileTrigger.addEventListener("click", function (event) {
        event.stopPropagation();
        if (profileDropdown.style.display === "block") {
            profileDropdown.style.display = "none";
        } else {
            profileDropdown.style.display = "block";
        }
    });

    document.addEventListener("click", function (event) {
        if (
            profileDropdown.style.display === "block" &&
            !profileDropdown.contains(event.target) &&
            event.target !== profileTrigger
        ) {
            profileDropdown.style.display = "none";
        }
    });

    // ----------------------------------------------------------------
    // 2. INITIALISATION DU GRAPHIQUE CHART.JS (AVEC ANIMATION)
    // ----------------------------------------------------------------
    const ctx = document.getElementById("userChart").getContext("2d");

    const data = {
        labels: ["Sem. 1", "Sem. 2", "Sem. 3", "Sem. 4"],
        datasets: [
            {
                label: "Nouveaux Utilisateurs",
                data: [5, 12, 8, 15],
                backgroundColor: "rgba(40, 167, 69, 0.5)",
                borderColor: "rgba(40, 167, 69, 1)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Configuration et création du graphique avec l'option d'animation
    new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,

            // **CETTE SECTION EST LA CLÉ DE L'ANIMATION**
            animation: {
                duration: 1200, // 1.2 seconde d'animation
                easing: "easeInOutQuad",
            },

            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: "rgba(0, 0, 0, 0.05)",
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });
});