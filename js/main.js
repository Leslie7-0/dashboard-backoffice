document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // 1. LOGIQUE DU MENU PROFIL (INDEX.HTML + USERS.HTML)
    // ============================================================

    const profileTriggers = [
        { trigger: "profile-dropdown-trigger", menu: "profile-dropdown-content" },     // index.html
        { trigger: "profile-dropdown-trigger-2", menu: "profile-dropdown-content-2" }  // users.html
    ];

    profileTriggers.forEach(item => {
        const trigger = document.getElementById(item.trigger);
        const menu = document.getElementById(item.menu);

        if (trigger && menu) {
            trigger.addEventListener("click", function (event) {
                event.stopPropagation();
                menu.style.display = menu.style.display === "block" ? "none" : "block";
            });

            document.addEventListener("click", function (event) {
                if (
                    menu.style.display === "block" &&
                    !menu.contains(event.target) &&
                    event.target !== trigger
                ) {
                    menu.style.display = "none";
                }
            });
        }
    });



    // ============================================================
    // 2. GRAPHIQUE DASHBOARD (INDEX.HTML)
    // ============================================================

    const dashboardChart = document.getElementById("userChart");

    if (dashboardChart) {
        const ctx = dashboardChart.getContext("2d");
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

        new Chart(ctx, {
            type: "line",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1200,
                    easing: "easeInOutQuad",
                },
                plugins: {
                    legend: { display: false },
                    title: { display: false },
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
                    x: { grid: { display: false } },
                },
            },
        });
    }



    // ============================================================
    // 3. PAGE RAPPORTS (rapports.html)
    // ============================================================

    // A. ACTIVITÉ UTILISATEURS
    const activityChart = document.getElementById("userActivityChart");
    if (activityChart) {
        new Chart(activityChart, {
            type: "bar",
            data: {
                labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
                datasets: [{
                    label: "Créations de Compte",
                    data: [120, 190, 130, 150, 220, 180],
                    backgroundColor: "rgba(13, 110, 253, 0.8)",
                    borderColor: "rgba(13, 110, 253, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: {
                    legend: { display: false },
                    title: { text: "Activité des Utilisateurs", display: true }
                }
            }
        });
    }

    // B. ERREURS SYSTÈME
    const errorsChart = document.getElementById("systemErrorsChart");
    if (errorsChart) {
        new Chart(errorsChart, {
            type: "doughnut",
            data: {
                labels: ['Erreurs 404', 'Erreurs de connexion', 'Erreurs DB', 'Autres'],
                datasets: [{
                    data: [35, 25, 10, 30],
                    backgroundColor: ['#ffc107', '#dc3545', '#007bff', '#6c757d'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "bottom" },
                    title: { text: "Répartition des Erreurs", display: true }
                }
            }
        });
    }

    // C. UTILISATION GLOBALE
    const utilizationChart = document.getElementById("globalUtilizationChart");
    if (utilizationChart) {
        new Chart(utilizationChart, {
            type: "line",
            data: {
                labels: ["S-1", "S-2", "S-3", "S-4", "S-5", "S-6"],
                datasets: [{
                    label: "Charge Serveur (%)",
                    data: [40, 45, 30, 55, 60, 50],
                    backgroundColor: "rgba(40,167,69,0.2)",
                    borderColor: "rgba(40,167,69,1)",
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, max: 100 } },
                plugins: {
                    legend: { display: true, position: "top" }
                }
            }
        });
    }



    // ============================================================
    // 4. LOGIQUE USERS (users.html)
    // ============================================================

    const usersPage = document.getElementById("userTableBody");
    if (usersPage) {

        // LISTE STATIQUE
        let users = [
            { id: 1001, fullname: "Alexandre Dubois", role: "Administrateur", status: "green", lastLogin: "Aujourd'hui, 10:45" },
            { id: 1002, fullname: "Marie Martin", role: "Éditeur", status: "orange", lastLogin: "Hier, 14:20" },
            { id: 1003, fullname: "Sophie Bernard", role: "Lecteur", status: "blue", lastLogin: "Jamais" },
            { id: 1004, fullname: "Pierre Durand", role: "Administrateur", status: "red", lastLogin: "2025-09-01" }
        ];

        // Fonction pour traduire le statut
        function statusText(code) {
            return {
                green: "Actif",
                orange: "Inactif",
                blue: "En attente",
                red: "Bloqué"
            }[code] || "";
        }

        // RENDER TABLE
        function renderTable(filter = "") {
            const tbody = document.getElementById("userTableBody");
            const count = document.getElementById("userCount");

            tbody.innerHTML = "";

            const filtered = users.filter(u =>
                u.fullname.toLowerCase().includes(filter.toLowerCase()) ||
                u.role.toLowerCase().includes(filter.toLowerCase())
            );

            filtered.forEach(user => {
                let row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.fullname}</td>
                        <td>${user.role}</td>
                        <td><span class="status-badge ${user.status}">${statusText(user.status)}</span></td>
                        <td>${user.lastLogin}</td>
                        <td>
                            <button class="btn-action edit" onclick="openEdit(${user.id})"><i class="fas fa-pen"></i></button>
                            <button class="btn-action delete" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });

            count.textContent = `(${filtered.length})`;
        }

        renderTable();


        // RECHERCHE
        document.getElementById("searchUser").addEventListener("input", e => {
            renderTable(e.target.value);
        });


        // ============================
        // MODALE AJOUT
        // ============================

        const addModal = document.getElementById("addUserModal");

        document.getElementById("btnOpenAddModal").onclick = () => addModal.style.display = "flex";
        document.getElementById("btnCancelAdd").onclick = () => addModal.style.display = "none";

        document.getElementById("btnSaveAdd").onclick = () => {
            const name = document.getElementById("addFullname").value;
            const role = document.getElementById("addRole").value;
            const status = document.getElementById("addStatus").value;

            if (!name.trim()) return alert("Nom obligatoire");

            const newUser = {
                id: users[users.length - 1].id + 1,
                fullname: name,
                role: role,
                status: status,
                lastLogin: "Jamais"
            };

            users.push(newUser);
            renderTable();
            addModal.style.display = "none";
        };


        // ============================
        // MODALE EDIT
        // ============================

        window.openEdit = function (id) {
            const u = users.find(x => x.id === id);
            document.getElementById("editId").value = u.id;
            document.getElementById("editFullname").value = u.fullname;
            document.getElementById("editRole").value = u.role;
            document.getElementById("editStatus").value = u.status;

            document.getElementById("editUserModal").style.display = "flex";
        };

        document.getElementById("btnCancelEdit").onclick =
            () => document.getElementById("editUserModal").style.display = "none";

        document.getElementById("btnSaveEdit").onclick = () => {
            const id = parseInt(document.getElementById("editId").value);
            const user = users.find(u => u.id === id);

            user.fullname = document.getElementById("editFullname").value;
            user.role = document.getElementById("editRole").value;
            user.status = document.getElementById("editStatus").value;

            renderTable();
            document.getElementById("editUserModal").style.display = "none";
        };


        // ============================
        // SUPPRESSION
        // ============================

        window.deleteUser = function (id) {
            if (!confirm("Supprimer cet utilisateur ?")) return;
            users = users.filter(u => u.id !== id);
            renderTable();
        };
    }
});
