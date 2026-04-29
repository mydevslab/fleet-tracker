const state = {
    allDrivers: [],
    currentFilter: 'all',
    searchTerm: '',
    map: null,
    markers: [],
    followedDriverId: null
};

async function init() {
    initMap();
    await fetchDrivers();
    setupEventListeners();
    startRealTimeSimulation();
}

function initMap() {
    state.map = L.map('map').setView([-22.9068, -43.1729], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(state.map);

    state.map.on('dragstart', () => {
        if (state.followedDriverId) {
            console.log("🛑 Câmera livre. Parando de seguir o motorista.");
            state.followedDriverId = null;
            render(); // Atualiza os botões para voltarem ao normal
        }
    });
}

async function fetchDrivers() {
    try {
        const response = await fetch('data/drivers.json');
        state.allDrivers = await response.json();
    } catch {
        console.warn("Usando dados locais (fallback)");
        state.allDrivers = [
            { id: 1, name: "Ricardo Silva", status: "available", last_trip: "10 min", lat: -22.9068, lng: -43.1729 },
            { id: 2, name: "Ana Oliveira", status: "busy", last_trip: "1 min", lat: -22.9035, lng: -43.1820 },
            { id: 3, name: "Marcos Souza", status: "offline", last_trip: "2h", lat: -22.9100, lng: -43.1650 },
            { id: 4, name: "Julia Costa", status: "available", last_trip: "5 min", lat: -22.9000, lng: -43.1790 }
        ];
    }
    render();
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    
    // Escuta CADA letra digitada no campo de busca
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchTerm = e.target.value.toLowerCase();
            console.log("Buscando por:", state.searchTerm); 
            state.followedDriverId = null; // Para de seguir ao buscar
            render();
        });
    }

    // Filtros de Botões (Status)
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn').forEach(b => {
                b.classList.remove('active');
            });
            e.target.classList.add('active');
            state.currentFilter = e.target.dataset.filter;
            state.followedDriverId = null; // Para de seguir ao trocar de aba
            render();
        });
    });
}

function render() {
    // 1. Filtra os dados com base no status E na busca de texto
    const filtered = state.allDrivers.filter(d => {
        const matchesFilter = state.currentFilter === 'all' || d.status === state.currentFilter;
        
        const driverName = d.name ? d.name.toLowerCase() : ""; 
        const matchesSearch = driverName.includes(state.searchTerm);

        return matchesFilter && matchesSearch;
    });

    updateStats();
    renderList(filtered);
    updateMap(filtered);
}

function updateStats() {
    const totalElement = document.getElementById('total-drivers');
    const activeElement = document.getElementById('active-drivers');
    
    if(totalElement) totalElement.innerText = state.allDrivers.length;
    if(activeElement) activeElement.innerText = state.allDrivers.filter(d => d.status !== 'offline').length;
}

function renderList(drivers) {
    const list = document.getElementById('driver-list');
    const emptyMessage = document.getElementById('no-results');

    if (drivers.length === 0) {
        list.innerHTML = '';
        if (emptyMessage) emptyMessage.style.display = 'block';
        return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    
    list.innerHTML = drivers.map(d => {
        // Verifica se este motorista é o que estamos seguindo
        const isFollowing = state.followedDriverId === d.id;
        
        return `
        <li class="driver-card driver-card--${d.status}">
            <div class="driver-card__info">
                <strong>${d.name}</strong>
                <span>Visto há ${d.last_trip}</span>
            </div>
            <button 
                class="driver-card__action-btn" 
                style="${isFollowing ? 'background: #2c3e50; opacity: 1;' : ''}"
                onclick="focusMap(${d.id})">
                ${isFollowing ? '📍 Seguindo...' : 'Localizar'}
            </button>
        </li>
    `}).join('');
}

function updateMap(drivers) {
    if (!state.map) return;

    state.markers.forEach(m => {
        state.map.removeLayer(m);
    });
    state.markers = [];

    drivers.forEach(d => {
        if(d.lat && d.lng) {
            const marker = L.marker([d.lat, d.lng]).addTo(state.map)
                .bindPopup(`<b>${d.name}</b><br>Status: ${d.status}`);
            state.markers.push(marker);

            // Se estivermos seguindo esse motorista, mantém o balão de informação dele aberto
            if (state.followedDriverId === d.id) {
                marker.openPopup();
            }
        }
    });

    // Só reajusta o zoom automático se NÃO estivermos buscando e NÃO estivermos seguindo ninguém
    if (state.markers.length > 0 && !state.searchTerm && !state.followedDriverId) {
        const group = new L.featureGroup(state.markers);
        state.map.fitBounds(group.getBounds().pad(0.2));
    }
}

window.focusMap = (id) => {
    state.followedDriverId = id;
    const driver = state.allDrivers.find(d => d.id === id);
    
    if (driver && state.map) {
        // flyTo cria uma animação cinematográfica de voo até o ponto
        state.map.flyTo([driver.lat, driver.lng], 16, { animate: true, duration: 1.5 });
        render(); // Re-renderiza para mudar o texto do botão
    }
};

function startRealTimeSimulation() {
    setInterval(() => {
        state.allDrivers = state.allDrivers.map(driver => {
            if (driver.status !== 'offline') {
                const latMovement = (Math.random() - 0.5) * 0.001;
                const lngMovement = (Math.random() - 0.5) * 0.001;
                driver.lat += latMovement;
                driver.lng += lngMovement;

                if (Math.random() > 0.95) {
                    driver.status = driver.status === 'available' ? 'busy' : 'available';
                }
            }
            return driver;
        });

        if (state.followedDriverId && state.map) {
            const followed = state.allDrivers.find(d => d.id === state.followedDriverId);
            if (followed) {
                state.map.panTo([followed.lat, followed.lng], { animate: true });
            }
        }

        render();
    }, 3000);
}

window.onload = init;