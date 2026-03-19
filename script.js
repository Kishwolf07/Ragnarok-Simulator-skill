// ===============================
// CHARACTER IMAGE
// ===============================
function updateCharacterImage() {
    const job = document.getElementById("job").value;
    const genderToggle = document.getElementById("genderToggle");
    const genderSymbol = document.querySelector(".gender-symbol");
    const characterGif = document.querySelector(".character-gif");

    const isFemale = genderToggle && genderToggle.checked;

    if (genderSymbol) {
        genderSymbol.textContent = isFemale ? "♀" : "♂";
        genderSymbol.classList.remove("male-icon", "female-icon");
        genderSymbol.classList.add(isFemale ? "female-icon" : "male-icon");
    }

    const jobFile = job.toLowerCase();
    const genderSuffix = isFemale ? "G" : "";
    const gifSrc = `jobs/${jobFile}${genderSuffix}.gif`;

    if (characterGif) {
        characterGif.style.opacity = 0;
        setTimeout(() => {
            characterGif.src = gifSrc;
            characterGif.style.opacity = 1;
        }, 200);
    }
}

// ===============================
// TAB SYSTEM (BRING TO FRONT)
// ===============================
function switchPanel(panelName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    if (panelName === 'stats') {
        document.getElementById('tab-stats').classList.add('active');
        document.getElementById('statsPanel').classList.add('active');
    } else if (panelName === 'skills') {
        document.getElementById('tab-skills').classList.add('active');
        document.getElementById('skillsPanel').classList.add('active');
        
        // Refresh skills whenever the skill tab is brought to front
        if (typeof updateSkillUI === 'function') {
            updateSkillUI();
        }
    }
}
// ===============================
// STAT POINT SYSTEM
// ===============================
function getPointsForLevel(level) {
    if (level <= 4) return 3;
    if (level >= 95) return 22;
    return Math.floor((level - 1) / 5) + 3;
}

function getTotalStatPoints(level) {
    let total = 48;
    for (let i = 2; i <= level; i++) {
        let pointsToAdd = getPointsForLevel(i);
        if (level === 99 && i === 99) {
            total += (pointsToAdd - 1);
        } else {
            total += pointsToAdd;
        }
    }
    return total;
}

// JOB BONUSES DATA
const jobBonuses = {
    "Swordsman": { 1: [0, 0, 0, 0, 0, 0], 2: [1, 0, 0, 0, 0, 0], 6: [1, 0, 1, 0, 0, 0], 10: [1, 0, 1, 0, 1, 0], 14: [2, 0, 1, 0, 1, 0], 18: [2, 0, 2, 0, 1, 0], 22: [2, 0, 2, 0, 2, 0], 26: [2, 0, 2, 0, 2, 1], 30: [2, 1, 2, 0, 2, 1], 33: [3, 1, 2, 0, 2, 1], 36: [3, 1, 2, 0, 3, 1], 38: [3,1,3,0,3,1], 40: [4, 1, 3, 0, 3, 1], 42: [4, 1, 4, 0, 3, 1], 44: [4, 1, 4, 0, 3, 2], 46: [4, 2, 4, 0, 3, 2], 47: [5, 2, 4, 0, 3, 2], 49: [6, 2, 4, 0, 3, 2], 50: [7, 2, 4, 0, 3, 2] },
    "Mage": { 1: [0, 0, 0, 0, 0, 0], 2: [0, 0, 0, 1, 0, 0], 6: [0, 0, 0, 1, 1, 0], 10: [0, 0, 0, 1, 2, 0], 14: [0, 0, 0, 2, 2, 0], 18: [0, 1, 0, 2, 2, 0], 22: [0, 1, 0, 3, 2, 0], 26: [0, 2, 0, 3, 2, 0], 30: [0, 2, 0, 3, 2, 1], 33: [0, 2, 0, 4, 2, 1], 36: [0, 2, 0, 4, 3, 1], 38: [0, 2, 0, 5, 3, 1], 40: [0, 3, 0, 5, 3, 1], 42: [0, 3, 0, 5, 3, 2], 44: [0, 3, 0, 6, 3, 2], 46: [0, 3, 0, 7, 3, 2], 47: [0, 4, 0, 7, 3, 2], 49: [0, 4, 0, 7, 3, 3], 50: [0, 4, 0, 8, 3, 3] },
    "Archer": { 1: [0, 0, 0, 0, 0, 0], 2: [0, 0, 0, 0, 1, 0], 6: [1, 0, 0, 0, 1, 0], 10: [1, 0, 0, 1, 1, 0], 14: [1, 0, 0, 1, 2, 0], 18: [1, 0, 0, 1, 3, 0], 22: [1, 0, 0, 1, 3, 1], 26: [1, 1, 0, 1, 3, 1], 30: [1, 1, 0, 1, 4, 1], 33: [1, 2, 0, 1, 4, 1], 36: [1, 2, 0, 1, 5, 1], 38: [2, 2, 0, 1, 5, 1], 40: [3, 2, 0, 1, 5, 1], 42: [3, 2, 0, 1, 6, 1], 44: [3, 2, 0, 1, 6, 2], 46: [3, 2, 1, 1, 6, 2], 47: [3, 2, 1, 2, 6, 2], 49: [3, 3, 1, 2, 6, 2], 50: [3, 3, 1, 2, 7, 2] },
    "Merchant": { 1: [0, 0, 0, 0, 0, 0], 2: [0, 0, 1, 0, 0, 0], 6: [0, 0, 1, 0, 1, 0], 10: [1, 0, 1, 0, 1, 0], 14: [1, 0, 1, 0, 2, 0], 18: [1, 0, 2, 0, 2, 0], 22: [2, 0, 2, 0, 2, 0], 26: [2, 0, 2, 1, 2, 0], 30: [2, 0, 3, 1, 2, 0], 33: [2, 1, 3, 1, 2, 0], 36: [2, 1, 3, 1, 2, 1], 38: [2, 1, 3, 1, 3, 1], 40: [3, 1, 3, 1, 3, 1], 42: [3, 1, 3, 1, 4, 1], 44: [4, 1, 3, 1, 4, 1], 46: [4, 1, 3, 1, 4, 2], 47: [4, 1, 4, 1, 4, 2], 49: [5, 1, 4, 1, 4, 2], 50: [5, 1, 4, 1, 5, 2] },
    "Thief": { 1: [0, 0, 0, 0, 0, 0], 2: [0, 1, 0, 0, 0, 0], 6: [1, 1, 0, 0, 0, 0], 10: [1, 1, 0, 0, 1, 0], 14: [1, 1, 1, 0, 1, 0], 18: [1, 1, 1, 1, 1, 0], 22: [1, 1, 1, 1, 2, 0], 26: [1, 1, 1, 1, 2, 1], 30: [2, 1, 1, 1, 2, 1], 33: [2, 2, 1, 1, 2, 1], 36: [2, 3, 1, 1, 2, 1], 38: [3, 3, 1, 1, 2, 1], 40: [3, 3, 1, 1, 2, 2], 42: [3, 3, 1, 1, 3, 2], 44: [3, 3, 2, 1, 3, 2], 46: [3, 3, 2, 1, 3, 3], 47: [4, 3, 2, 1, 3, 3], 49: [4, 3, 2, 1, 4, 3], 50: [4, 4, 2, 1, 4, 3] },
    "Acolyte": { 1: [0, 0, 0, 0, 0, 0], 2: [0, 0, 0, 0, 0, 1], 6: [0, 0, 1, 0, 0, 1], 10: [0, 0, 1, 1, 0, 1], 14: [0, 0, 1, 1, 1, 1], 18: [0, 0, 1, 1, 1, 2], 22: [0, 1, 1, 1, 1, 2], 26: [1, 1, 1, 1, 1, 2], 30: [1, 1, 2, 1, 1, 2], 36: [1, 1, 2, 2, 2, 2], 38: [1, 1, 2, 2, 2, 3], 40: [1, 2, 2, 2, 2, 3], 42: [2, 2, 2, 2, 2, 3], 44: [2, 2, 3, 2, 2, 3], 46: [2, 2, 3, 3, 3, 3], 49: [3, 2, 3, 3, 3, 3], 50: [3, 2, 3, 3, 3, 4] }
};

//bonus fomula
function getBonusForJobLevel(job, level) {
    const classData = jobBonuses[job] || { 1: [0, 0, 0, 0, 0, 0] };
    const sortedLevels = Object.keys(classData).map(Number).sort((a, b) => a - b);
    let activeLevel = 1;
    for (let l of sortedLevels) { if (l <= level) activeLevel = l; else break; }
    return classData[activeLevel];
}

//StatCost
function getStatCost(currentValue) {
    if (currentValue < 11) return 2;
    if (currentValue < 21) return 3;
    if (currentValue < 31) return 4;
    if (currentValue < 41) return 5;
    if (currentValue < 51) return 6;
    if (currentValue < 61) return 7;
    if (currentValue < 71) return 8;
    if (currentValue < 81) return 9;
    if (currentValue < 91) return 10;
    return 11;
}

//total cost
function getTotalCost(statValue) {
    let total = 0;
    for (let i = 1; i < statValue; i++) total += getStatCost(i);
    return total;
}

// ===============================
// REGEN & HP CALCULATIONS
// ===============================
function calculateBaseHP(level, hpFactor, job) {
    // Swordsmen get a +2 head-start in the engine's HP constants
    let baseHP = (job === "Swordsman") ? 37 : 35;
    
    // Add the level-based growth (Level * 5)
    baseHP += (level * 5); 

    // Use Math.round as we confirmed it matches the engine
    for (let i = 2; i <= level; i++) {
        baseHP += Math.round(hpFactor * i); 
    }
    
    return baseHP;
}

function calculateHPRegen(maxHP, vit, hprMod = 0) {
    //Base recovery from HP
    let hpPart = Math.floor(maxHP / 200);
    //Base recovery from VIT
    let vitPart = Math.floor(vit / 5);
    let baseConstant = 1;
    let hpr = hpPart + vitPart + baseConstant;
    hpr = Math.floor(hpr * (1 + hprMod * 0.01));

    return hpr;
}

function calculateSPRegen(maxSP, int) {
    let spr = 1 + Math.floor(maxSP / 100) + Math.floor(int / 6);
    if (int >= 120) spr += Math.floor(int / 2 - 56);
    return Math.floor(spr);
}

// ===============================
// DATA TABLES
// ===============================
const jobData = {
    Novice: { hpFactor: 0, spFactor: 1, maxJob: 9 },
    Swordsman: { hpFactor: 0.7, spFactor: 2, maxJob: 50 },
    Mage: { hpFactor: 0.3, spFactor: 6, maxJob: 50 },
    Archer: { hpFactor: 0.5, spFactor: 2, maxJob: 50 },
    Thief: { hpFactor: 0.5, spFactor: 2, maxJob: 50 },
    Acolyte: { hpFactor: 0.4, spFactor: 5, maxJob: 50 },
    Merchant: { hpFactor: 0.4, spFactor: 3, maxJob: 50 }
};

const jobWeapons = {
    Novice: ["Hand", "Dagger", "One-handed Sword", "One-handed Axe", "One-handed Mace", "Two-handed Mace", "Rod & Staff", "Two-handed Staff"],
    Swordsman: ["Hand", "Dagger", "One-handed Sword", "Two-handed Sword", "One-handed Spear", "Two-handed Spear", "One-handed Axe", "Two-handed Axe", "One-handed Mace", "Two-handed Mace"],
    Mage: ["Hand", "Dagger", "Rod & Staff", "Two-handed Staff"],
    Archer: ["Hand", "Dagger", "Bow"],
    Thief: ["Hand", "Dagger", "One-handed Sword", "One-handed Axe", "Bow"],
    Acolyte: ["Hand", "One-handed Mace", "Two-handed Mace", "Rod & Staff", "Two-handed Staff"],
    Merchant: ["Hand", "Dagger", "One-handed Sword", "One-handed Axe", "Two-handed Axe", "One-handed Mace", "Two-handed Mace"]
};

const jobWeaponBTBA = {
    "Novice": { "Hand": 1.0, "Dagger": 1.3, "One-handed Sword": 1.4, "One-handed Axe": 1.6, "One-handed Mace": 1.4, "Two-handed Mace": 1.4, "Rod & Staff": 1.3, "Two-handed Staff": 1.3 },
    "Swordsman": { "Hand": 0.8, "Dagger": 1.0, "One-handed Sword": 1.1, "Two-handed Sword": 1.2, "One-handed Spear": 1.3, "Two-handed Spear": 1.4, "One-handed Axe": 1.4, "Two-handed Axe": 1.5, "One-handed Mace": 1.3, "Two-handed Mace": 1.4 },
    "Mage": { "Hand": 1.0, "Dagger": 1.2, "Rod & Staff": 1.4, "Two-handed Staff": 1.4 },
    "Archer": { "Hand": 0.8, "Dagger": 1.2, "Bow": 1.4 },
    "Thief": { "Hand": 0.8, "Dagger": 1.0, "One-handed Sword": 1.3, "One-handed Axe": 1.6, "Bow": 1.6 },
    "Acolyte": { "Hand": 0.8, "One-handed Mace": 1.2, "Two-handed Mace": 1.2, "Rod & Staff": 1.2, "Two-handed Staff": 1.2 },
    "Merchant": { "Hand": 0.8, "Dagger": 1.2, "One-handed Sword": 1.4, "One-handed Axe": 1.4, "Two-handed Axe": 1.5, "One-handed Mace": 1.4, "Two-handed Mace": 1.4 }
};

const jobWeightModifier = { "Novice": 0, "Swordsman": 800, "Mage": 200, "Archer": 600, "Thief": 400, "Acolyte": 400, "Merchant": 800 };

// ===============================
// CALCULATIONS
// ===============================
function calculateASPD(job, weapon, agi, dex) {
    const btba = (jobWeaponBTBA[job] && jobWeaponBTBA[job][weapon]) ? jobWeaponBTBA[job][weapon] : 1.0;
    let WD = 50 * btba;
    let drAgi = Math.round(WD * agi / 25);
    let drDex = Math.round(WD * dex / 100);
    let aspd = 200 - (WD - Math.floor((drAgi + drDex) / 10));
    return Math.min(Math.max(aspd, 0), 190);
}

function updateWeaponOptions() {
    const job = document.getElementById("job").value;
    const weaponSelect = document.getElementById("weapon");
    weaponSelect.innerHTML = "";
    (jobWeapons[job] || ["Hand"]).forEach(w => {
        let option = document.createElement("option");
        option.value = w; option.textContent = w;
        weaponSelect.appendChild(option);
    });
}

// ===============================
// MAIN UPDATE FUNCTION
// ===============================

function updateStats(changedStatId) {

    let jobLevel = parseInt(document.getElementById("jobLevel").value) || 1;
    let job = document.getElementById("job").value;

    // ===============================
    // HANDLE JOB CHANGE (RESET SKILLS)
    // ===============================
    if (job !== currentJobTracked) {
        playerSkills = {};
        skillPoints = 0;
        lastJobLevel = jobLevel;
        currentJobTracked = job;
    }

    // ===============================
    // SKILL POINT GAIN
    // ===============================
    if (jobLevel > lastJobLevel) {
        skillPoints += (jobLevel - lastJobLevel);
    } 
    else if (jobLevel < lastJobLevel) {
        // optional: reset if level goes down
        skillPoints = 0;
    }

    lastJobLevel = jobLevel;

    //Validation for Base Level
    const baseLevelInput = document.getElementById("baseLevel");
    let level = parseInt(baseLevelInput.value) || 1;

    if (level > 99) { level = 99; baseLevelInput.value = 99; }
    else if (level < 1) { level = 1; baseLevelInput.value = 1; }

    let weapon = document.getElementById("weapon").value;
    let jobInfo = jobData[job] || jobData["Novice"];

    if (parseInt(document.getElementById("jobLevel").value) > jobInfo.maxJob) {
        document.getElementById("jobLevel").value = jobInfo.maxJob;
    }

    // Calculate effective stats
    // We use Math.max(1, ...) to ensure stats never drop below 1
    let rawStats = {
        str: Math.max(1, parseInt(document.getElementById("str").value) || 1),
        agi: Math.max(1, parseInt(document.getElementById("agi").value) || 1),
        vit: Math.max(1, parseInt(document.getElementById("vit").value) || 1),
        int: Math.max(1, parseInt(document.getElementById("int").value) || 1),
        dex: Math.max(1, parseInt(document.getElementById("dex").value) || 1),
        luk: Math.max(1, parseInt(document.getElementById("luk").value) || 1)
    };

    //Point Validation & Automatic Rollback
    let totalPoints = getTotalStatPoints(level);
    let spentPoints = getTotalCost(rawStats.str) + getTotalCost(rawStats.agi) + getTotalCost(rawStats.vit) +
        getTotalCost(rawStats.int) + getTotalCost(rawStats.dex) + getTotalCost(rawStats.luk);

    // If points are exceeded, force the changed stat down until it is valid
    if (changedStatId && spentPoints > totalPoints) {
        let el = document.getElementById(changedStatId);
        // This loop aggressively lowers the value until it fits the points
        while (spentPoints > totalPoints && parseInt(el.value) > 1) {
            el.value = parseInt(el.value) - 1;
            rawStats[changedStatId] = parseInt(el.value);
            spentPoints = getTotalCost(rawStats.str) + getTotalCost(rawStats.agi) + getTotalCost(rawStats.vit) +
                getTotalCost(rawStats.int) + getTotalCost(rawStats.dex) + getTotalCost(rawStats.luk);
        }
        // Proceed with the new corrected values
    }

    //bonus calculation
    const bonuses = getBonusForJobLevel(job, jobLevel);
    const bonusIds = ["strBonus", "agiBonus", "vitBonus", "intBonus", "dexBonus", "lukBonus"];
    bonusIds.forEach((id, index) => { document.getElementById(id).innerText = bonuses[index]; });

    let stats = {
        str: rawStats.str + bonuses[0],
        agi: rawStats.agi + bonuses[1],
        vit: rawStats.vit + bonuses[2],
        int: rawStats.int + bonuses[3],
        dex: rawStats.dex + bonuses[4],
        luk: rawStats.luk + bonuses[5]
    };

    //required cost
    const statKeys = ['str', 'agi', 'vit', 'int', 'dex', 'luk'];
    statKeys.forEach(key => { document.getElementById(key + "Req").innerText = getStatCost(rawStats[key]); });

    //weight
    let weight = 2000 + (30 * stats.str) + (jobWeightModifier[job] || 0);
    let baseHP = calculateBaseHP(level, jobInfo.hpFactor, job);   
    let maxHP = Math.floor(baseHP * (1 + stats.vit * 0.01));
    let maxSP = Math.floor((10 + (level * jobInfo.spFactor)) * (1 + stats.int * 0.01));

    //hp,sp value
    document.getElementById("weight").innerText = weight;
    document.getElementById("hpValue").innerText = maxHP;
    document.getElementById("spValue").innerText = maxSP;

    const hpPercent = Math.min((maxHP / 20000) * 100, 100);
    const spPercent = Math.min((maxSP / 5000) * 100, 100);
    const hpBar = document.getElementById("hpBar");
    const spBar = document.getElementById("spBar");
    hpBar.style.width = hpPercent + "%";
    hpBar.querySelector("span").innerText = Math.floor(hpPercent) + "%";    
    spBar.style.width = spPercent + "%";
    spBar.querySelector("span").innerText = Math.floor(spPercent) + "%";

    //hp,sp regen
    const hpr = calculateHPRegen(maxHP, stats.vit);
    document.getElementById("hpRegen").innerText = hpr;
    document.getElementById("spRegen").innerText = calculateSPRegen(maxSP, stats.int);
    document.getElementById("statusPoints").innerText = Math.max(totalPoints - spentPoints, 0);


    //status information
    let baseAtk = (weapon === "Bow")
        ? (stats.dex + Math.pow(Math.floor(stats.dex / 10), 2) + Math.floor(stats.str / 5) + Math.floor(stats.luk / 5))
        : (stats.str + Math.pow(Math.floor(stats.str / 10), 2) + Math.floor(stats.dex / 5) + Math.floor(stats.luk / 5));
    document.getElementById("atk").innerText = baseAtk + " + 0";

    let matkMin = stats.int + Math.pow(Math.floor(stats.int / 7), 2);
    let matkMax = stats.int + Math.pow(Math.floor(stats.int / 5), 2);
    document.getElementById("matk").innerText = matkMin + " ~ " + matkMax;

    document.getElementById("def").innerText = "0 + " + stats.vit;
    document.getElementById("mdef").innerText = "0 + " + stats.int;
    document.getElementById("hit").innerText = level + stats.dex;
    document.getElementById("flee").innerText = (level + stats.agi) + " + " + (Math.floor(stats.luk / 10) + 1);
    document.getElementById("critical").innerText = Math.floor(stats.luk * 0.3) + 1;
    document.getElementById("aspd").innerText = calculateASPD(job, weapon, stats.agi, stats.dex);

    if (document.getElementById('skillsPanel').classList.contains('active')) {
    updateSkillUI();
}
}

//reset button function
function resetCharacter() {
    document.getElementById("baseLevel").value = 1;
    document.getElementById("jobLevel").value = 1;
    document.getElementById("job").value = "Novice";
    const stats = ["str", "agi", "vit", "int", "dex", "luk"];
    stats.forEach(s => document.getElementById(s).value = 1);
    updateWeaponOptions();
    updateCharacterImage();
    updateStats();
    switchPanel('stats');
}

// ===============================
// SKILL TREE DATA and code
// ===============================

let playerSkills = {};
let skillPoints = 0;
let lastJobLevel = 1;
let currentJobTracked = "Novice";
// skills each job
const jobSkills = {
    "Novice": {
        basicSkill: { name: "Basic Skill", maxLevel: 9, type: "normal" },
        firstAid: { name: "First Aid", maxLevel: 1, type: "quest" },
        playDead: { name: "Play Dead", maxLevel: 1, type: "quest" }
    },

    "Swordsman": {
        bash: { name: "Bash", maxLevel: 10, type: "normal" },
        endure: { name: "Endure", maxLevel: 10, type: "normal" },
        increaseHP: { name: "Increase HP Recovery", maxLevel: 10, type: "normal" },
        magnumBreak: { name: "Magnum Break", maxLevel: 10, type: "normal" },
        provoke: { name: "Provoke", maxLevel: 10, type: "normal" },
        swordMastery: { name: "Sword Mastery", maxLevel: 10, type: "normal" },
        twoHandedMastery: { name: "Two-Handed Sword Mastery", maxLevel: 10, type: "normal" },

        berserk: { name: "Berserk", maxLevel: 1, type: "quest" },
        fatalBlow: { name: "Fatal Blow", maxLevel: 1, type: "quest" },
        movingHP: { name: "HP Recovery While Moving", maxLevel: 1, type: "quest" }
    },

    "Mage": {
        coldBolt: { name: "Cold Bolt", maxLevel: 10, type: "normal" },
        fireBall: { name: "Fire Ball", maxLevel: 10, type: "normal" },
        fireBolt: { name: "Fire Bolt", maxLevel: 10, type: "normal" },
        fireWall: { name: "Fire Wall", maxLevel: 10, type: "normal" },
        frostDiver: { name: "Frost Diver", maxLevel: 10, type: "normal" },
        spRecovery: { name: "Increase SP Recovery", maxLevel: 10, type: "normal" },
        lightningBolt: { name: "Lightning Bolt", maxLevel: 10, type: "normal" },
        napalmBeat: { name: "Napalm Beat", maxLevel: 10, type: "normal" },
        safetyWall: { name: "Safety Wall", maxLevel: 10, type: "normal" },
        sight: { name: "Sight", maxLevel: 1, type: "normal" },
        soulStrike: { name: "Soul Strike", maxLevel: 10, type: "normal" },
        stoneCurse: { name: "Stone Curse", maxLevel: 10, type: "normal" },
        thunderstorm: { name: "Thunderstorm", maxLevel: 10, type: "normal" },

        energyCoat: { name: "Energy Coat", maxLevel: 1, type: "quest" }
    },

    "Archer": {
        arrowShower: { name: "Arrow Shower", maxLevel: 10, type: "normal" },
        doubleStrafe: { name: "Double Strafe", maxLevel: 10, type: "normal" },
        improveConcentration: { name: "Improve Concentration", maxLevel: 10, type: "normal" },
        owlsEye: { name: "Owl's Eye", maxLevel: 10, type: "normal" },
        vulturesEye: { name: "Vulture's Eye", maxLevel: 10, type: "normal" },

        arrowCrafting: { name: "Arrow Crafting", maxLevel: 1, type: "quest" },
        arrowRepel: { name: "Arrow Repel", maxLevel: 1, type: "quest" }
    },

    "Merchant": {
        discount: { name: "Discount", maxLevel: 10, type: "normal" },
        enlargeWeight: { name: "Enlarge Weight Limit", maxLevel: 10, type: "normal" },
        itemAppraisal: { name: "Item Appraisal", maxLevel: 1, type: "normal" },
        mammonite: { name: "Mammonite", maxLevel: 10, type: "normal" },
        overcharge: { name: "Overcharge", maxLevel: 10, type: "normal" },
        pushcart: { name: "Pushcart", maxLevel: 10, type: "normal" },
        vending: { name: "Vending", maxLevel: 10, type: "normal" },

        cartRevolution: { name: "Cart Revolution", maxLevel: 1, type: "quest" },
        changeCart: { name: "Change Cart", maxLevel: 1, type: "quest" },
        crazyUproar: { name: "Crazy Uproar", maxLevel: 1, type: "quest" }
    },

    "Thief": {
        detoxify: { name: "Detoxify", maxLevel: 1, type: "normal" },
        doubleAttack: { name: "Double Attack", maxLevel: 10, type: "normal" },
        envenom: { name: "Envenom", maxLevel: 10, type: "normal" },
        hiding: { name: "Hiding", maxLevel: 10, type: "normal" },
        improveDodge: { name: "Improve Dodge", maxLevel: 10, type: "normal" },
        steal: { name: "Steal", maxLevel: 10, type: "normal" },

        backSlide: { name: "Back Slide", maxLevel: 1, type: "quest" },
        findStone: { name: "Find Stone", maxLevel: 1, type: "quest" },
        sandAttack: { name: "Sand Attack", maxLevel: 1, type: "quest" },
        stoneFling: { name: "Stone Fling", maxLevel: 1, type: "quest" }
    },

    "Acolyte": {
        angelus: { name: "Angelus", maxLevel: 10, type: "normal" },
        aquaBenedicta: { name: "Aqua Benedicta", maxLevel: 1, type: "normal" },
        blessing: { name: "Blessing", maxLevel: 10, type: "normal" },
        cure: { name: "Cure", maxLevel: 1, type: "normal" },
        decreaseAgi: { name: "Decrease AGI", maxLevel: 10, type: "normal" },
        demonBane: { name: "Demon Bane", maxLevel: 10, type: "normal" },
        divineProtection: { name: "Divine Protection", maxLevel: 10, type: "normal" },
        heal: { name: "Heal", maxLevel: 10, type: "normal" },
        increaseAgi: { name: "Increase AGI", maxLevel: 10, type: "normal" },
        pneuma: { name: "Pneuma", maxLevel: 1, type: "normal" },
        ruwach: { name: "Ruwach", maxLevel: 1, type: "normal" },
        signumCrusis: { name: "Signum Crusis", maxLevel: 10, type: "normal" },
        teleport: { name: "Teleport", maxLevel: 2, type: "normal" },
        warpPortal: { name: "Warp Portal", maxLevel: 4, type: "normal" },

        holyLight: { name: "Holy Light", maxLevel: 1, type: "quest" }
    }
};
const skillConnections = {
    "Novice": [
        ["basicSkill", "firstAid"],
        ["basicSkill", "playDead"]
    ],

    "Swordsman": [
        ["bash", "magnumBreak"],
        ["bash", "provoke"],
        ["provoke", "endure"],
        ["swordMastery", "twoHandedMastery"]
    ]
    // you can expand later per job
};
function formatSkillIcon(name) {
    return name
        .toLowerCase()       // lowercase
        .replace(/\s+/g, '') // remove spaces
        .replace(/[^a-z0-9]/g, ''); // remove special characters
}
function updateSkillUI() {
    const job = document.getElementById("job").value;
    const treeBody = document.getElementById("skillTreeBody");

    treeBody.innerHTML = "";

    const skills = jobSkills[job];


    if (!skills || Object.keys(skills).length === 0) {
        treeBody.innerHTML = `<p style="color:#888; grid-column:1/-1; text-align:center;">
            No skills available for ${job}
        </p>`;
        return;
    }

    const normalSkills = [];
    const questSkills = [];

    // 🔹 Separate skills
    for (let skillName in skills) {
        if (!(skillName in playerSkills)) playerSkills[skillName] = 0;

        const skill = skills[skillName];

        if (skill.type === "quest") {
            questSkills.push([skillName, skill]);
        } else {
            normalSkills.push([skillName, skill]);
        }
    }

    // 🔹 Skill element creator (reuse logic)
    function createSkillElement(skillName, skill) {
        const el = document.createElement("div");
        el.className = "skill";
        el.dataset.skill = skillName;

        el.innerHTML = `
    <img src="skills/${formatSkillIcon(skillName)}.png" onerror="this.src='skills/default.png'">
    <div class="skill-name">${skill.name}</div>
    <span class="skill-level">${playerSkills[skillName]}/${skill.maxLevel}</span>
`;

        const state = getSkillState(skillName);
        el.classList.add(state);

        el.addEventListener("click", () => {
            upgradeSkill(skillName);
        });

        return el;
    }

    // 🔹 Render NORMAL skills
    normalSkills.forEach(([skillName, skill]) => {
        treeBody.appendChild(createSkillElement(skillName, skill));
    });

    // 🔹 QUEST SKILLS HEADER
    if (questSkills.length > 0) {
        const header = document.createElement("div");
        header.innerText = "QUEST SKILLS";
        header.style.gridColumn = "1 / -1"; // ✅ full width always
        header.style.textAlign = "center";
        header.style.color = "gold";
        header.style.marginTop = "10px";

        treeBody.appendChild(header);
    }

    // 🔹 Render QUEST skills
    questSkills.forEach(([skillName, skill]) => {
        treeBody.appendChild(createSkillElement(skillName, skill));
    });

    document.getElementById("skillPoints").innerText = `Skill Points: ${skillPoints}`;
    setTimeout(drawSkillConnections, 50);

    const skillCount = Object.keys(skills).length;
const container = document.getElementById("skillTreeBody");

if (skillCount > 12) {
    container.style.transformOrigin = "top center"; // keeps alignment nice
} else {
    container.style.transform = "scale(1)";
}
}
function drawSkillConnections() {
    const job = document.getElementById("job").value;
    const layer = document.getElementById("skillConnections");

    if (!layer) return;

    layer.innerHTML = "";

    const connections = skillConnections[job];
    if (!connections) return;

    connections.forEach(([from, to]) => {
        const fromEl = document.querySelector(`[data-skill="${from}"]`);
        const toEl = document.querySelector(`[data-skill="${to}"]`);

        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const treeBody = document.getElementById("skillTreeBody");
const parentRect = treeBody.getBoundingClientRect(); // 🔥 FIX

        const x1 = fromRect.left + fromRect.width / 2 - parentRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - parentRect.top;
        const x2 = toRect.left + toRect.width / 2 - parentRect.left;
        const y2 = toRect.top + toRect.height / 2 - parentRect.top;

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        const line = document.createElement("div");
        line.className = "arrow-line";

        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;

        layer.appendChild(line);
    });
}

function getSkillState(skillName) {
    const level = playerSkills[skillName];

    if (level > 0) return "learned";

    if (skillPoints > 0) return "available";

    return "locked";
}

function upgradeSkill(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];

    if (!skill) return;
    if (skillPoints <= 0) return;
    if (getSkillState(skillName) === "locked") return;
    playerSkills[skillName]++;
    skillPoints--;

    if (document.getElementById('skillsPanel').classList.contains('active')) {
        updateSkillUI();
    }
}