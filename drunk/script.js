// ==========================================================================
// เกมเศรษฐีวงเหล้า - MAIN SCRIPT
// ==========================================================================

// Color Palette for Players
const PLAYER_COLORS = [
    "#ef4444", // Red
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f59e0b", // Yellow/Amber
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#06b6d4", // Cyan
    "#f97316"  // Orange
];

// 36 Board Tiles data matching the uploaded reference image 100%
const boardData = [
    // 0: Bottom-Left Corner
    { type: "start", icon: "🚩", text: "จุดเริ่มต้น / สุ่มคนมาโดน", class: "tile-corner" },
    // 1-8: Left Column (bottom to top)
    { type: "snack", icon: "🍢", text: "กับแกล้ม 1 คำ", class: "tile-blue" },
    { type: "drink", icon: "🍺", text: "เหล้า + โซดา + มะนาว ครึ่งแก้ว", class: "tile-green" },
    { type: "luck", icon: "🎴", text: "เสี่ยงดวง", class: "tile-pink" },
    { type: "drink", icon: "🍻", text: "เหล้า + น้ำ ครึ่งแก้ว", class: "tile-cyan" },
    { type: "pay", icon: "💸", text: "จ่ายค่ามิกซ์ 10 บาท", class: "tile-purple" },
    { type: "mini", icon: "🎮", text: "MINI GAME", class: "tile-orange" },
    { type: "random", icon: "🎯", text: "สุ่มคนมาโดน", class: "tile-tan" },
    { type: "drink", icon: "🥃", text: "เพียว 1 แก้ว", class: "tile-grey" },

    // 9: Top-Left Corner
    { type: "rest1", icon: "😴", text: "พัก 1 ตา", class: "tile-corner" },
    // 10-17: Top Row (left to right)
    { type: "drink", icon: "🍋", text: "มะนาว + โซดา 1 แก้ว", class: "tile-green" },
    { type: "random", icon: "🎯", text: "สุ่มคนมาโดน", class: "tile-tan" },
    { type: "luck", icon: "🎴", text: "เสี่ยงดวง", class: "tile-pink" },
    { type: "battle", icon: "⚔️", text: "BATTLE", class: "tile-pink" },
    { type: "water", icon: "💧", text: "น้ำเปล่า ครึ่งแก้ว", class: "tile-cyan" },
    { type: "drink", icon: "🍋", text: "เหล้า + มะนาว 1 ช็อต", class: "tile-green" },
    { type: "mini", icon: "🎮", text: "MINI GAME", class: "tile-orange" },
    { type: "drink", icon: "🥤", text: "โค้ก + เหล้า ครึ่งแก้ว", class: "tile-brown" },

    // 18: Top-Right Corner
    { type: "back_start", icon: "🔄", text: "กลับไปจุดเริ่มต้น", class: "tile-corner" },
    // 19-26: Right Column (top to bottom)
    { type: "drink", icon: "🍾", text: "เพียว 1 ฝา", class: "tile-grey" },
    { type: "random", icon: "🎯", text: "สุ่มคนมาโดน", class: "tile-tan" },
    { type: "luck", icon: "🎴", text: "เสี่ยงดวง", class: "tile-pink" },
    { type: "pay", icon: "💸", text: "จ่ายค่าเหล้า 20 บาท", class: "tile-purple" },
    { type: "drink", icon: "🍹", text: "เหล้า + โซดา + มะนาว 1 แก้ว", class: "tile-green" },
    { type: "drink", icon: "💧", text: "เหล้า + น้ำ 1 แก้ว", class: "tile-cyan" },
    { type: "mini", icon: "🎮", text: "MINI GAME", class: "tile-orange" },
    { type: "drink", icon: "🥤", text: "โค้ก 1 แก้ว", class: "tile-brown" },

    // 27: Bottom-Right Corner
    { type: "rest2", icon: "💤", text: "พัก 2 ตา", class: "tile-corner" },
    // 28-35: Bottom Row (right to left)
    { type: "water", icon: "💧", text: "น้ำเปล่า 1 แก้ว", class: "tile-cyan" },
    { type: "random", icon: "🎯", text: "สุ่มคนมาโดน", class: "tile-tan" },
    { type: "battle", icon: "⚔️", text: "BATTLE", class: "tile-pink" },
    { type: "snack", icon: "🍿", text: "กับแกล้ม 20", class: "tile-purple" },
    { type: "drink", icon: "🍋", text: "น้ำมะนาว ครึ่งแก้ว", class: "tile-green" },
    { type: "drink", icon: "🍺", text: "เหล้า + โซดา 1 แก้ว", class: "tile-cyan" },
    { type: "mini", icon: "🎮", text: "MINI GAME", class: "tile-orange" },
    { type: "drink", icon: "🥤", text: "เหล้า + โค้ก 1 แก้ว", class: "tile-brown" }
];

// Grid Path Array for 10x10 layout (36 perimeter tiles)
const boardPath = [
    [9, 0], // 0: Bottom-Left
    [8, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], // 1-8: Left
    [0, 0], // 9: Top-Left
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], // 10-17: Top
    [0, 9], // 18: Top-Right
    [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], // 19-26: Right
    [9, 9], // 27: Bottom-Right
    [9, 8], [9, 7], [9, 6], [9, 5], [9, 4], [9, 3], [9, 2], [9, 1]  // 28-35: Bottom
];

// Cards Deck for เสี่ยงดวง
const luckCards = [
    { title: "🍻 ชนแก้วทั้งวง!", desc: "ให้ทุกคนในวงดื่มพร้อมกัน 1 จิบ" },
    { title: "👑 คิงออฟมิกซ์!", desc: "สั่งเพื่อน 1 คนดื่มเหล้าเข้มๆ 1 ช็อต" },
    { title: "🎁 รอดตัว!", desc: "ได้รับสิทธิ์รอดโดนดื่ม 1 ครั้ง (ใช้เมื่อไหร่ก็ได้)" },
    { title: "🔄 สลับแก้ว!", desc: "สลับแก้วกับเพื่อนข้างขวาแล้วดื่ม 1 จิบ" },
    { title: "🎭 โชว์การแสดง!", desc: "ร้องเพลงหรือเต้น 10 วินาที ถ้าไม่ทำ ดื่ม 2 จิบ" },
    { title: "🤐 ห้ามพูดชื่อเพื่อน!", desc: "ห้ามพูดชื่อใครจนกว่าจะถึงตาถัดไป หลุดดื่ม 1 จิบ" },
    { title: "💸 มหาเศรษฐี!", desc: "ออกค่ามิกซ์ให้เพื่อน 1 รอบ หรือดื่มแทนเพื่อน 1 แก้ว" },
    { title: "🔥 สายแข็ง!", desc: "ดื่มเพียว 1 ช็อตเพื่อแสดงความเก๋า" }
];

// State Variables
let players = [];
let currentPlayerIndex = 0;
let isLocked = false;
let soundEnabled = true;
let logs = [];

// Web Audio API Synthesizer (No external sound files required)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === 'roll') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'step') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
    } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    } else if (type === 'penalty') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.25);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    }
}

// DOM Elements
const setupScreen = document.getElementById("setup");
const gameScreen = document.getElementById("game");
const playersInputContainer = document.getElementById("players-input");
const addPlayerBtn = document.getElementById("add-player");
const startGameBtn = document.getElementById("start-game");
const boardGrid = document.getElementById("board");
const rollBtn = document.getElementById("roll");
const diceElement = document.getElementById("dice");
const statusElement = document.getElementById("status");
const bannerPlayerName = document.getElementById("banner-player-name");
const currentHeadName = document.getElementById("current-player-name-head");
const playerListElement = document.getElementById("player-list");
const logsElement = document.getElementById("logs");
const modal = document.getElementById("modal");
const modalTitleText = document.getElementById("modal-title-text");
const modalContent = document.getElementById("modal-content");
const modalButtons = document.getElementById("modal-buttons");

// Initialization
window.addEventListener("DOMContentLoaded", () => {
    // Add default 3 players
    addPlayerInput("นาเดีย");
    addPlayerInput("สายเมา 1");
    addPlayerInput("สายเมา 2");

    addPlayerBtn.addEventListener("click", () => addPlayerInput());
    startGameBtn.addEventListener("click", startGame);
    rollBtn.addEventListener("click", rollDice);

    // Center direct triggers
    document.getElementById("btn-luck-trigger").addEventListener("click", triggerLuckCard);
    document.getElementById("btn-mini-trigger").addEventListener("click", triggerMiniGame);
    document.getElementById("btn-battle-trigger").addEventListener("click", triggerBattle);
    document.getElementById("btn-feedback").addEventListener("click", showFeedbackModal);
    document.getElementById("btn-support").addEventListener("click", showSupportModal);
    document.getElementById("btn-menu")?.addEventListener("click", showMenuModal);
    document.getElementById("btn-menu-top")?.addEventListener("click", showMenuModal);
    document.getElementById("restart")?.addEventListener("click", resetGame);

    const soundToggleBtn = document.getElementById("btn-sound-toggle");
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener("click", (e) => {
            soundEnabled = !soundEnabled;
            e.target.textContent = soundEnabled ? "🔊" : "🔇";
            addLog(soundEnabled ? "🔊 เปิดเสียงแล้ว" : "🔇 ปิดเสียงแล้ว");
        });
    }
});

// Setup Functions
function addPlayerInput(defaultName = "") {
    if (playersInputContainer.children.length >= 8) {
        alert("เพิ่มผู้เล่นได้สูงสุด 8 คน");
        return;
    }
    const index = playersInputContainer.children.length;
    const color = PLAYER_COLORS[index % PLAYER_COLORS.length];

    const row = document.createElement("div");
    row.className = "player-input-row";
    row.innerHTML = `
        <div class="player-color-picker" style="background:${color}"></div>
        <input type="text" maxlength="15" placeholder="ชื่อผู้เล่น ${index + 1}" value="${defaultName}">
        <button class="btn-remove-player" type="button">×</button>
    `;

    row.querySelector(".btn-remove-player").onclick = () => {
        if (playersInputContainer.children.length <= 2) {
            alert("ต้องมีผู้เล่นอย่างน้อย 2 คน");
            return;
        }
        row.remove();
        updateColorPickers();
    };

    playersInputContainer.appendChild(row);
}

function updateColorPickers() {
    [...playersInputContainer.children].forEach((row, i) => {
        const picker = row.querySelector(".player-color-picker");
        picker.style.background = PLAYER_COLORS[i % PLAYER_COLORS.length];
    });
}

function startGame() {
    const inputElements = [...playersInputContainer.querySelectorAll("input")];
    if (inputElements.length < 2) {
        alert("ต้องมีผู้เล่นอย่างน้อย 2 คน");
        return;
    }

    players = inputElements.map((input, i) => {
        const name = input.value.trim() || `ผู้เล่น ${i + 1}`;
        return {
            id: i,
            name: name,
            color: PLAYER_COLORS[i % PLAYER_COLORS.length],
            position: 0,
            skipCount: 0
        };
    });

    currentPlayerIndex = 0;
    logs = [];
    isLocked = false;

    setupScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    renderBoardGrid();
    addLog(`🔥 เริ่มเกมเศรษฐีวงเหล้า! ตาของ ${players[0].name} เริ่มทอย`);
    updateUI();
}

// Render 10x10 Board Grid (36 Perimeter Tiles + Center Board)
function renderBoardGrid() {
    // Preserve center board element
    const centerBoard = document.getElementById("center-board");
    boardGrid.innerHTML = "";
    boardGrid.appendChild(centerBoard);

    // Create 36 perimeter tiles
    boardData.forEach((tile, index) => {
        const [row, col] = boardPath[index];
        const cell = document.createElement("div");
        cell.className = `tile-cell ${tile.class}`;
        cell.style.gridRow = row + 1;
        cell.style.gridColumn = col + 1;
        cell.dataset.index = index;

        cell.innerHTML = `
            <span class="tile-number">${index + 1}</span>
            <span class="tile-icon">${tile.icon}</span>
            <span class="tile-text">${tile.text}</span>
            <div class="tile-tokens"></div>
        `;

        boardGrid.appendChild(cell);
    });

    renderTokens();
}

function renderTokens() {
    document.querySelectorAll(".tile-tokens").forEach(el => el.innerHTML = "");

    players.forEach(player => {
        const cell = boardGrid.querySelector(`.tile-cell[data-index="${player.position}"]`);
        if (cell) {
            const token = document.createElement("div");
            token.className = "player-token";
            token.style.backgroundColor = player.color;
            token.title = player.name;
            cell.querySelector(".tile-tokens").appendChild(token);
        }
    });
}

function updateUI() {
    const player = players[currentPlayerIndex];
    bannerPlayerName.textContent = player.name;
    if (currentHeadName) {
        currentHeadName.textContent = player.name;
        currentHeadName.style.color = player.color;
    }

    // Player List Sidebar
    playerListElement.innerHTML = players.map((p, idx) => `
        <div class="player-item ${idx === currentPlayerIndex ? 'active-turn' : ''}">
            <div class="player-info">
                <span class="player-dot" style="background:${p.color}"></span>
                <span class="player-name">${escapeHTML(p.name)} ${p.skipCount > 0 ? `(พัก ${p.skipCount} ตา)` : ''}</span>
            </div>
            <span class="player-pos">ช่อง ${p.position + 1}</span>
        </div>
    `).join("");

    renderTokens();
}

// Roll Dice & Move Logic
async function rollDice() {
    if (isLocked) return;

    const player = players[currentPlayerIndex];

    if (player.skipCount > 0) {
        player.skipCount--;
        playSound('penalty');
        addLog(`😴 ${player.name} ถูกพักตา (เหลือพักอีก ${player.skipCount} ตา)`);
        statusElement.textContent = `${player.name} ถูกข้ามในตานี้`;
        nextTurn();
        return;
    }

    isLocked = true;
    rollBtn.disabled = true;
    playSound('roll');
    diceElement.classList.add("rolling");

    let diceValue = 1;
    for (let i = 0; i < 10; i++) {
        diceValue = Math.floor(Math.random() * 6) + 1;
        diceElement.textContent = diceFace(diceValue);
        await wait(70);
    }

    diceElement.classList.remove("rolling");
    addLog(`🎲 ${player.name} ทอยได้ ${diceValue}`);
    statusElement.textContent = `เดิน ${diceValue} ช่อง...`;

    // Animate movement step-by-step
    for (let i = 0; i < diceValue; i++) {
        player.position = (player.position + 1) % 36;
        playSound('step');
        renderTokens();
        await wait(180);
    }

    const landedTile = boardData[player.position];
    statusElement.textContent = `ตกช่อง: ${landedTile.text}`;
    handleTileLanding(player, landedTile);
}

function handleTileLanding(player, tile) {
    switch (tile.type) {
        case "start":
            triggerRandomPlayer(player, "🚩 จุดเริ่มต้น / สุ่มคนมาโดน");
            break;
        case "drink":
            playSound('penalty');
            showModal(
                `${tile.icon} ${tile.text}`,
                `<strong>${player.name}</strong> ตกช่องบทลงโทษ!<br><br><span style="font-size:24px; color:#dc2626;">"${tile.text}"</span>`,
                [{ text: "จัดไป! (ดื่มแล้ว)", primary: true, action: nextTurn }]
            );
            break;
        case "water":
            playSound('win');
            showModal(
                `💧 พักดื่มน้ำ`,
                `<strong>${player.name}</strong> ได้พักดื่มน้ำเปล่า!<br><br>${tile.text}`,
                [{ text: "ไปต่อ", primary: true, action: nextTurn }]
            );
            break;
        case "snack":
            playSound('win');
            showModal(
                `🍿 กับแกล้ม!`,
                `<strong>${player.name}</strong> ตกช่องกับแกล้ม!<br><br><span style="font-size:22px; color:#059669;">"${tile.text}"</span>`,
                [{ text: "กินกับแกล้มแล้วไปต่อ", primary: true, action: nextTurn }]
            );
            break;
        case "pay":
            playSound('penalty');
            showModal(
                `💸 จ่ายค่าปรับ`,
                `<strong>${player.name}</strong> ต้องจ่าย!<br><br><span style="font-size:24px; color:#dc2626;">"${tile.text}"</span>`,
                [{ text: "จ่ายเรียบร้อย", primary: true, action: nextTurn }]
            );
            break;
        case "luck":
            triggerLuckCard();
            break;
        case "mini":
            triggerMiniGame();
            break;
        case "battle":
            triggerBattle();
            break;
        case "random":
            triggerRandomPlayer(player);
            break;
        case "rest1":
            player.skipCount = 1;
            playSound('penalty');
            showModal(
                `😴 พัก 1 ตา`,
                `<strong>${player.name}</strong> ตกช่องพักผ่อน!<br><br>จะโดนข้ามการทอยลูกเต๋า 1 ตา`,
                [{ text: "รับทราบ", primary: true, action: nextTurn }]
            );
            break;
        case "rest2":
            player.skipCount = 2;
            playSound('penalty');
            showModal(
                `💤 พัก 2 ตา`,
                `<strong>${player.name}</strong> เมาหนัก พัก 2 ตา!<br><br>จะโดนข้ามการทอย 2 ตาติด`,
                [{ text: "นอนพัก", primary: true, action: nextTurn }]
            );
            break;
        case "back_start":
            player.position = 0;
            renderTokens();
            playSound('penalty');
            showModal(
                `🔄 กลับไปจุดเริ่มต้น`,
                `<strong>${player.name}</strong> ถูกวาร์ปกลับไปที่ช่องจุดเริ่มต้น!`,
                [{ text: "ตกลง", primary: true, action: nextTurn }]
            );
            break;
        default:
            nextTurn();
    }
}

// Special Event Triggers
function triggerLuckCard() {
    playSound('win');
    const card = luckCards[Math.floor(Math.random() * luckCards.length)];
    const player = players[currentPlayerIndex];

    showModal(
        `🎴 เปิดการ์ดเสี่ยงดวง`,
        `<div style="font-size:24px; font-weight:bold; color:#dc2626; margin-bottom:10px;">${card.title}</div><div>${card.desc}</div>`,
        [{ text: "ทำตามการ์ด", primary: true, action: nextTurn }]
    );
    addLog(`🎴 ${player.name} เปิดการ์ดเสี่ยงดวง: ${card.title}`);
}

function triggerMiniGame() {
    playSound('win');
    const miniGames = [
        { name: "✌️ เป่ายิ้งฉุบวงเหล้า", desc: "หันไปเป่ายิ้งฉุบกับเพื่อนซ้ายมือ ใครแพ้ดื่ม 1 จิบ!" },
        { name: "🔢 ทายเลข 1-3", desc: "นับ 1 2 3 ในใจ แล้วชูนิ้วพร้อมกัน ใครชูเลขตรงกับเจ้าของตา รอด! ที่เหลือดื่ม 1 จิบ" },
        { name: "😳 ห้ามหัวเราะ 10 วิ", desc: "จ้องหน้าเพื่อนข้างๆ 10 วินาที ใครยิ้มหรือหัวเราะก่อน ดื่ม 1 จิบ!" },
        { name: "⏱️ ตอบเร็ว 3 วินาที", desc: "บอกชื่อยี่ห้อเบียร์/เหล้ามา 3 ยี่ห้อภายใน 3 วินาที ตอบไม่ทัน ดื่ม 1 ช็อต!" }
    ];
    const game = miniGames[Math.floor(Math.random() * miniGames.length)];
    const player = players[currentPlayerIndex];

    showModal(
        `🎮 MINI GAME: ${game.name}`,
        `<div style="font-size:18px; margin-bottom:15px;">${game.desc}</div>`,
        [{ text: "เริ่มเล่นมินิเกม", primary: true, action: nextTurn }]
    );
    addLog(`🎮 ${player.name} เปิดมินิเกม: ${game.name}`);
}

function triggerBattle() {
    playSound('win');
    const player = players[currentPlayerIndex];
    const opponents = players.filter(p => p.id !== player.id);
    const opponent = opponents[Math.floor(Math.random() * opponents.length)];

    showModal(
        `⚔️ BATTLE DUEL!`,
        `<div style="font-size:20px; font-weight:bold; color:#dc2626;">${player.name} VS ${opponent.name}</div>
         <p style="margin-top:10px;">ทอยลูกเต๋าดวลกัน ใครได้แต้มน้อยกว่า ดื่ม 1 จิบ!</p>`,
        [
            {
                text: "🎲 เริ่มทอยดวล!",
                primary: true,
                action: () => {
                    const pRoll = Math.floor(Math.random() * 6) + 1;
                    const oRoll = Math.floor(Math.random() * 6) + 1;
                    let resultMsg = `${player.name} ทอยได้ [${pRoll}] | ${opponent.name} ทอยได้ [${oRoll}]<br><br>`;

                    if (pRoll > oRoll) {
                        resultMsg += `<strong style="color:#059669;">🎉 ${player.name} ชนะ! ${opponent.name} ดื่ม 1 จิบ!</strong>`;
                    } else if (oRoll > pRoll) {
                        resultMsg += `<strong style="color:#dc2626;">💀 ${opponent.name} ชนะ! ${player.name} ดื่ม 1 จิบ!</strong>`;
                    } else {
                        resultMsg += `<strong>เสมอ! ดื่มพร้อมกันทั้งคู่ 1 จิบ! 🍻</strong>`;
                    }

                    showModal(`⚔️ ผลการดวล BATTLE`, resultMsg, [
                        { text: "จบการดวล", primary: true, action: nextTurn }
                    ]);
                }
            }
        ]
    );
    addLog(`⚔️ ${player.name} เปิดศึก BATTLE กับ ${opponent.name}`);
}

function triggerRandomPlayer(attacker, customTitle = "🎯 สุ่มคนมาโดน") {
    playSound('roll');
    const candidates = players.filter(p => p.id !== attacker.id);
    const victim = candidates[Math.floor(Math.random() * candidates.length)];

    showModal(
        customTitle,
        `<div style="font-size:22px;">วงล้อทำงานสุ่มผู้โชคร้าย...</div>
         <div style="font-size:32px; font-weight:bold; color:#dc2626; margin:15px 0;" class="animate-bounce">👉 ${victim.name} 👈</div>
         <div>โดนลงโทษ! ดื่ม 1 จิบ หรือรับภารกิจประจำวง!</div>`,
        [{ text: "จัดไป!", primary: true, action: nextTurn }]
    );
    addLog(`🎯 สุ่มคนมาโดน: ${victim.name} โดนลงโทษ!`);
}

// Next Turn Handler
function nextTurn() {
    closeModal();
    isLocked = false;
    rollBtn.disabled = false;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateUI();
}

// Center Action Modals
function showFeedbackModal() {
    showModal(
        `💬 แนะนำ / ติชม`,
        `<p style="margin-bottom:15px;">ขอบคุณที่ร่วมสนุกกับเกมเศรษฐีวงเหล้า!</p>
         <textarea style="width:100%; height:80px; padding:10px; border-radius:10px; border:1.5px solid #cbd5e1;" placeholder="พิมพ์ข้อความแนะนำ หรือ ติชม..."></textarea>`,
        [
            {
                text: "ส่งความคิดเห็น",
                primary: true,
                action: () => {
                    alert("ขอบคุณสำหรับข้อคิดเห็นของท่าน!");
                    closeModal();
                }
            },
            { text: "ปิด", action: closeModal }
        ]
    );
}

function showSupportModal() {
    showModal(
        `❤️ สนับสนุนผู้พัฒนา`,
        `<p>หากคุณชื่นชอบเกมนี้ สามารถเลี้ยงกาแฟหรือเครื่องดื่มผู้พัฒนาได้ที่นี่!</p>
         <div style="font-size:24px; font-weight:bold; color:#d97706; margin:15px 0;">PromptPay: 08X-XXX-XXXX</div>
         <small style="color:#64748b;">ขอให้สนุกและดื่มอย่างมีความสุขครับ! 🍻</small>`,
        [{ text: "ปิดหน้าต่าง", primary: true, action: closeModal }]
    );
}

function showMenuModal() {
    showModal(
        `⚙️ เมนูตัวเลือก`,
        `<div style="display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-outline" style="color:#0f172a; border-color:#334155;" onclick="resetGame()">🔄 เริ่มเกมใหม่</button>
            <button class="btn btn-outline" style="color:#0f172a; border-color:#334155;" onclick="alert('กฎเหล็ก: ไม่เมาห้ามเลิก, เลิกก่อนจ่ายค่าเหล้า, ดื่มแล้วห้ามขับ!')">📜 ดูกฎเหล็ก</button>
         </div>`,
        [{ text: "กลับเข้าสู่เกม", primary: true, action: closeModal }]
    );
}

// Helper Functions
function showModal(title, htmlContent, buttons = []) {
    modalTitleText.textContent = title;
    modalContent.innerHTML = htmlContent;
    modalButtons.innerHTML = "";

    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.innerHTML = btn.text;
        if (btn.primary) b.classList.add("primary-btn");
        b.onclick = () => {
            if (btn.action) btn.action();
            else closeModal();
        };
        modalButtons.appendChild(b);
    });

    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}

function resetGame() {
    closeModal();
    gameScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
}

function addLog(text) {
    logs.unshift(text);
    if (logs.length > 50) logs.pop();
    logsElement.innerHTML = logs.map(l => `<div class="log-entry">${l}</div>`).join("");
}

function diceFace(val) {
    const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return faces[val - 1] || "⚄";
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}