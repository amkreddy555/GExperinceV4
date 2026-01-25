let currentRoom = 'demo';
const deviceStates = {};
let isDrawerOpen = false;

// Hardcoded layers for the original Demo Room
const demoLayers = [
    { id: "vis-light1", src: "assets/images/layer-light1.png" },
    { id: "vis-light2", src: "assets/images/layer-light2.png" },
    { id: "vis-fan", src: "assets/images/layer-fan.png" },
    { id: "vis-ceiling", src: "assets/images/layer-ceiling.png" },
    { id: "vis-lamp", src: "assets/images/layer-lamp.png" },
    { id: "vis-tv", src: "assets/images/layer-tv.png" },
    { id: "vis-ac", src: "assets/images/layer-ac.png" },
    { id: "vis-purifier", src: "assets/images/layer-purifier.png" }
];

function initExperience() {
    // FIX: Clear loader and render UI components
    const roomContainer = document.querySelector('.room-container');
    if (roomContainer) roomContainer.innerHTML = '<div class="loader">Loading Dashboard...</div>';

    renderRoomSelector();
    renderSideDrawer();

    // Ensure roomData is loaded (from rooms.js) before loading initial room
    setTimeout(() => {
        loadRoom('demo');
    }, 100);
}

function renderRoomSelector() {
    const navHeader = document.querySelector('.top-left-logo'); // Adjusted for new nav
    let tabsContainer = document.querySelector('.selector-tabs');

    if (!tabsContainer) {
        tabsContainer = document.createElement('div');
        tabsContainer.className = 'selector-tabs scrollable';
        // Insert after logo or prepend to main wrapper if logo not found contextually convenient
        if (navHeader && navHeader.parentNode) {
            navHeader.insertAdjacentElement('afterend', tabsContainer);
        } else {
            document.querySelector('.main-wrapper').insertAdjacentElement('beforebegin', tabsContainer);
        }
    }

    tabsContainer.innerHTML = '';

    Object.keys(roomData).forEach(key => {
        const room = roomData[key];
        const btn = document.createElement('button');
        btn.className = `tab-btn ${key === currentRoom ? 'active' : ''}`;
        btn.onclick = () => loadRoom(key);

        btn.innerHTML = `<i class="${getRoomIcon(key)}"></i> <span>${room.name}</span>`;
        tabsContainer.appendChild(btn);
    });
}

function renderSideDrawer() {
    // Create drawer if not exists
    let drawer = document.querySelector('.side-drawer');
    if (!drawer) {
        drawer = document.createElement('div');
        drawer.className = 'side-drawer';
        drawer.innerHTML = `
            <div class="drawer-trigger" onclick="toggleDrawer()">
                <i class="fas fa-chevron-right"></i>
            </div>
            <h3 style="color: white; margin-bottom: 2rem; padding: 0 1rem;">Select Room</h3>
            <div class="drawer-list"></div>
        `;
        document.body.appendChild(drawer);
    }

    const drawerList = drawer.querySelector('.drawer-list');
    drawerList.innerHTML = '';

    Object.keys(roomData).forEach(key => {
        const room = roomData[key];
        const btn = document.createElement('button');
        btn.className = `drawer-btn ${key === currentRoom ? 'active' : ''}`;
        btn.onclick = () => {
            loadRoom(key);
            toggleDrawer(false); // Close drawer after selection
        };

        btn.innerHTML = `<i class="${getRoomIcon(key)}"></i> <span>${room.name}</span>`;
        drawerList.appendChild(btn);
    });
}

function toggleDrawer(force) {
    const drawer = document.querySelector('.side-drawer');
    const trigger = document.querySelector('.drawer-trigger i');

    isDrawerOpen = force !== undefined ? force : !isDrawerOpen;
    drawer.classList.toggle('open', isDrawerOpen);

    if (trigger) {
        trigger.className = isDrawerOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right';
    }
}

function getRoomIcon(key) {
    if (key === 'demo') return 'fas fa-vial';
    if (key === 'living') return 'fas fa-couch';
    if (key === 'bedroom' || key === 'bedroom2') return 'fas fa-bed';
    if (key === 'kitchen') return 'fas fa-utensils';
    if (key === 'theater') return 'fas fa-film';
    if (key === 'exterior') return 'fas fa-tree';
    if (key === 'layout') return 'fas fa-map';
    return 'fas fa-door-open';
}

function loadRoom(roomId) {
    currentRoom = roomId;
    const room = roomData[roomId];

    // Update active states in both UI components
    document.querySelectorAll('.tab-btn, .drawer-btn').forEach(btn => {
        const name = btn.querySelector('span').textContent.trim();
        btn.classList.toggle('active', name === room.name);
        if (btn.classList.contains('active') && btn.classList.contains('tab-btn')) {
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    });

    const roomContainer = document.querySelector('.room-container');
    roomContainer.style.opacity = '0';

    setTimeout(() => {
        roomContainer.innerHTML = '';

        // 1. Base Image
        const baseImg = document.createElement('img');
        baseImg.src = room.baseImage;
        baseImg.className = 'room-layer layer-base active';
        baseImg.alt = room.name;
        roomContainer.appendChild(baseImg);

        // 2. Demo Overlays (Only for Demo Room)
        if (room.isDemo) {
            demoLayers.forEach(layer => {
                const img = document.createElement('img');
                img.id = layer.id;
                img.src = layer.src;
                img.className = 'room-layer layer-overlay';
                img.style.mixBlendMode = 'screen';
                if (deviceStates[layer.id.replace('vis-', '')]) {
                    img.classList.add('active');
                    img.style.opacity = '1';
                }
                roomContainer.appendChild(img);
            });
        }

        // Handle Layout view
        if (room.isLayout) {
            baseImg.style.objectFit = 'contain';
            baseImg.style.background = '#fff';
        } else {
            baseImg.style.objectFit = 'cover';
        }

        updatePanels(room);
        roomContainer.style.opacity = '1';
        updateRoomFilters();
    }, 300);
}

function updatePanels(room) {
    const wallGrid = document.querySelector('.wall-grid');
    const appList = document.querySelector('.app-list');

    if (!wallGrid || !appList) return;

    wallGrid.innerHTML = '';
    appList.innerHTML = '';

    if (room.devices.length === 0) {
        wallGrid.innerHTML = '<p style="color: grey; grid-column: span 4; padding: 1rem; text-align: center;">No interactive devices in this view.</p>';
        appList.innerHTML = '<p style="color: grey; padding: 1rem;">View only.</p>';
        return;
    }

    room.devices.forEach(dev => {
        const isActive = deviceStates[dev.id];

        // Wall Panel
        const wallBtn = document.createElement('div');
        wallBtn.className = `wall-btn ${isActive ? 'active' : ''}`;
        wallBtn.id = `wall-${dev.id}`;
        wallBtn.onclick = () => toggleDevice(dev.id);
        wallBtn.innerHTML = `<i class="${dev.icon}"></i><span>${dev.name.split(' ').pop()}</span>`;
        wallGrid.appendChild(wallBtn);

        // App Item
        const appItem = document.createElement('div');
        appItem.className = `app-item ${isActive ? 'active' : ''}`;
        appItem.id = `app-${dev.id}`;
        appItem.onclick = () => toggleDevice(dev.id);
        appItem.innerHTML = `
            <span>${dev.name}</span>
            <div class="toggle"></div>
        `;
        appList.appendChild(appItem);
    });
}

function toggleDevice(deviceId) {
    deviceStates[deviceId] = !deviceStates[deviceId];

    const wallBtn = document.getElementById(`wall-${deviceId}`);
    const appBtn = document.getElementById(`app-${deviceId}`);
    if (wallBtn) wallBtn.classList.toggle('active', deviceStates[deviceId]);
    if (appBtn) appBtn.classList.toggle('active', deviceStates[deviceId]);

    const layer = document.getElementById(`vis-${deviceId}`);
    if (layer) {
        layer.classList.toggle('active', deviceStates[deviceId]);
        layer.style.opacity = deviceStates[deviceId] ? '1' : '0';
    }

    updateRoomFilters();
}

function updateRoomFilters() {
    const baseImg = document.querySelector('.layer-base');
    if (!baseImg) return;

    const room = roomData[currentRoom];
    if (room.isDemo || room.isLayout) {
        baseImg.style.filter = 'none';
        return;
    }

    const activeCount = Object.keys(deviceStates).filter(k => k.startsWith(currentRoom.charAt(0)) && deviceStates[k]).length;

    if (activeCount === 0) {
        baseImg.style.filter = 'brightness(0.3) contrast(1.1)';
    } else {
        const brightness = 0.3 + (activeCount * 0.2);
        baseImg.style.filter = `brightness(${Math.min(1.2, brightness)}) contrast(1)`;
    }
}

// Global scope expose
window.loadRoom = loadRoom;
window.toggleDevice = toggleDevice;
window.toggleDrawer = toggleDrawer;

document.addEventListener('DOMContentLoaded', initExperience);
