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
        basicSkill: { name: "Basic Skill", maxLevel: 9, type: "normal", desc: "A simple beginner skill." },

        firstAid: { name: "First Aid", maxLevel: 1, type: "quest", desc: "Recover small HP instantly.", quest: true },
        playDead: { name: "Play Dead", maxLevel: 1, type: "quest", desc: "Pretend to be dead to avoid attacks.", quest: true}
    },

    "Swordsman": {
        bash: { name: "Bash", maxLevel: 10, type: "normal", desc: "Deal physical damage to a single enemy." },
        endure: { name: "Endure", maxLevel: 10, type: "normal", desc: "Reduce incoming damage temporarily." },
        increaseHP: { name: "Increase HP Recovery", maxLevel: 10, type: "normal", desc: "Boost natural HP regeneration." },
        magnumBreak: { name: "Magnum Break", maxLevel: 10, type: "normal", desc: "Attack all enemies nearby with damage and knockback." },
        provoke: { name: "Provoke", maxLevel: 10, type: "normal", desc: "Taunt enemy to attack you." },
        swordMastery: { name: "Sword Mastery", maxLevel: 10, type: "normal", desc: "Increase damage with swords." },
        twoHandedMastery: { name: "Two-Handed Sword Mastery", maxLevel: 10, type: "normal", desc: "Increase damage when using two-handed swords." },

        berserk: { name: "Berserk", maxLevel: 1, type: "quest", desc: "Boost attack power at the cost of defense.", quest: true },
        fatalBlow: { name: "Fatal Blow", maxLevel: 1, type: "quest", desc: "One powerful strike to finish enemies.", quest: true },
        movingHP: { name: "HP Recovery While Moving", maxLevel: 1, type: "quest", desc: "Allows HP regeneration even while moving.", quest: true }
    },

    "Mage": {
        coldBolt: { name: "Cold Bolt", maxLevel: 10, type: "normal", desc: "Ice attack to freeze or slow enemies." },
        fireBall: { name: "Fire Ball", maxLevel: 10, type: "normal", desc: "Fire magic to hit a single enemy." },
        fireBolt: { name: "Fire Bolt", maxLevel: 10, type: "normal", desc: "Quick fire projectile spell." },
        fireWall: { name: "Fire Wall", maxLevel: 10, type: "normal", desc: "Summon a wall of fire to burn enemies." },
        frostDiver: { name: "Frost Diver", maxLevel: 10, type: "normal", desc: "Ice AoE damage to multiple enemies." },
        spRecovery: { name: "Increase SP Recovery", maxLevel: 10, type: "normal", desc: "Boost natural SP regeneration." },
        lightningBolt: { name: "Lightning Bolt", maxLevel: 10, type: "normal", desc: "Deal electric damage to a single enemy." },
        napalmBeat: { name: "Napalm Beat", maxLevel: 10, type: "normal", desc: "Area fire attack on enemies." },
        safetyWall: { name: "Safety Wall", maxLevel: 10, type: "normal", desc: "Block melee attacks from enemies." },
        sight: { name: "Sight", maxLevel: 1, type: "normal", desc: "Detect hidden enemies nearby." },
        soulStrike: { name: "Soul Strike", maxLevel: 10, type: "normal", desc: "Magic attack that ignores defense." },
        stoneCurse: { name: "Stone Curse", maxLevel: 10, type: "normal", desc: "Petrify a single enemy temporarily." },
        thunderstorm: { name: "Thunderstorm", maxLevel: 10, type: "normal", desc: "Electric AoE damage to enemies." },

        energyCoat: { name: "Energy Coat", maxLevel: 1, type: "quest", desc: "Boost defense by covering body in magic.", quest: true }
    },

    "Archer": {
        arrowShower: { name: "Arrow Shower", maxLevel: 10, type: "normal", desc: "Shoot multiple arrows at enemies." },
        doubleStrafe: { name: "Double Strafe", maxLevel: 10, type: "normal", desc: "Quickly shoot two arrows at a single enemy." },
        improveConcentration: { name: "Improve Concentration", maxLevel: 10, type: "normal", desc: "Increase critical rate of arrows." },
        owlsEye: { name: "Owl's Eye", maxLevel: 10, type: "normal", desc: "Increase ranged attack range and accuracy." },
        vulturesEye: { name: "Vulture's Eye", maxLevel: 10, type: "normal", desc: "Further increase accuracy and critical hit chance." },

        arrowCrafting: { name: "Arrow Crafting", maxLevel: 1, type: "quest", desc: "Create custom arrows.", quest: true },
        arrowRepel: { name: "Arrow Repel", maxLevel: 1, type: "quest", desc: "Shoot arrows that knock back enemies.", quest: true }
    },

    "Merchant": {
        discount: { name: "Discount", maxLevel: 10, type: "normal", desc: "Reduce shop prices for purchases." },
        enlargeWeight: { name: "Enlarge Weight Limit", maxLevel: 10, type: "normal", desc: "Carry more items at once." },
        itemAppraisal: { name: "Item Appraisal", maxLevel: 1, type: "normal", desc: "Identify unknown items." },
        mammonite: { name: "Mammonite", maxLevel: 10, type: "normal", desc: "Deal earth damage to enemies." },
        overcharge: { name: "Overcharge", maxLevel: 10, type: "normal", desc: "Increase damage of your weapons temporarily." },
        pushcart: { name: "Pushcart", maxLevel: 10, type: "normal", desc: "Move your cart faster." },
        vending: { name: "Vending", maxLevel: 10, type: "normal", desc: "Sell items automatically using vending machine." },

        cartRevolution: { name: "Cart Revolution", maxLevel: 1, type: "quest", desc: "Spin your cart to damage nearby enemies.", quest: true },
        changeCart: { name: "Change Cart", maxLevel: 1, type: "quest", desc: "Switch to a different cart style.", quest: true },
        crazyUproar: { name: "Crazy Uproar", maxLevel: 1, type: "quest", desc: "Confuse enemies around you.", quest: true }
    },

    "Thief": {
        detoxify: { name: "Detoxify", maxLevel: 1, type: "normal", desc: "Remove poison effects." },
        doubleAttack: { name: "Double Attack", maxLevel: 10, type: "normal", desc: "Attack twice in one turn." },
        envenom: { name: "Envenom", maxLevel: 10, type: "normal", desc: "Add poison effect to your attacks." },
        hiding: { name: "Hiding", maxLevel: 10, type: "normal", desc: "Hide from enemies to avoid attacks." },
        improveDodge: { name: "Improve Dodge", maxLevel: 10, type: "normal", desc: "Increase chance to dodge attacks." },
        steal: { name: "Steal", maxLevel: 10, type: "normal", desc: "Steal items from enemies." },

        backSlide: { name: "Back Slide", maxLevel: 1, type: "quest", desc: "Quickly move behind the enemy.", quest: true },
        findStone: { name: "Find Stone", maxLevel: 1, type: "quest", desc: "Locate rare stones or items.", quest: true },
        sandAttack: { name: "Sand Attack", maxLevel: 1, type: "quest", desc: "Blind enemies temporarily.", quest: true },
        stoneFling: { name: "Stone Fling", maxLevel: 1, type: "quest", desc: "Throw stones to damage or interrupt enemies.", quest: true }
    },

    "Acolyte": {
        angelus: { name: "Angelus", maxLevel: 10, type: "normal", desc: "Increase defense of party members." },
        aquaBenedicta: { name: "Aqua Benedicta", maxLevel: 1, type: "normal", desc: "Holy water effect for protection." },
        blessing: { name: "Blessing", maxLevel: 10, type: "normal", desc: "Increase STR, AGI, and INT temporarily." },
        cure: { name: "Cure", maxLevel: 1, type: "normal", desc: "Heal minor wounds of a single target." },
        decreaseAgi: { name: "Decrease AGI", maxLevel: 10, type: "normal", desc: "Lower enemy AGI temporarily." },
        demonBane: { name: "Demon Bane", maxLevel: 10, type: "normal", desc: "Extra damage to demon-type enemies." },
        divineProtection: { name: "Divine Protection", maxLevel: 10, type: "normal", desc: "Reduce damage to a single ally." },
        heal: { name: "Heal", maxLevel: 10, type: "normal", desc: "Restore HP of a single ally." },
        increaseAgi: { name: "Increase AGI", maxLevel: 10, type: "normal", desc: "Increase AGI of a single ally." },
        pneuma: { name: "Pneuma", maxLevel: 1, type: "normal", desc: "Remove fear effect." },
        ruwach: { name: "Ruwach", maxLevel: 1, type: "normal", desc: "Remove curse from a target." },
        signumCrusis: { name: "Signum Crusis", maxLevel: 10, type: "normal", desc: "Holy magic attack against undead enemies." },
        teleport: { name: "Teleport", maxLevel: 2, type: "normal", desc: "Instantly move to a known location." },
        warpPortal: { name: "Warp Portal", maxLevel: 4, type: "normal", desc: "Create a portal for party members to teleport." },

        holyLight: { name: "Holy Light", maxLevel: 1, type: "quest", desc: "Attack undead enemies with holy magic.", quest: true }
    }
};
// SKILL CONNECTIONS (ARROWS)
const skillConnections = {

    "Novice": [
        ["basicSkill", "firstAid"],
        ["basicSkill", "playDead"]
    ],

    "Swordsman": [
        ["swordMastery", "twoHandedMastery"],

        ["bash", "magnumBreak"],

        ["provoke", "endure"]
        // increaseHP → NO CONNECTION
    ],

    "Mage": [
        ["napalmBeat", "soulStrike"],
        ["napalmBeat", "safetyWall"],

        ["sight", "fireWall"],

        ["fireBolt", "fireBall"],
        ["fireBall", "fireWall"],

        ["coldBolt", "frostDiver"],
        ["lightningBolt", "thunderstorm"]

        // spRecovery → NO CONNECTION
        // stoneCurse → NO CONNECTION
    ],

    "Archer": [
        ["owlsEye", "vulturesEye"],
        ["vulturesEye", "improveConcentration"],

        ["doubleStrafe", "arrowShower"]
    ],

    "Merchant": [
        ["enlargeWeight", "discount"],
        ["enlargeWeight", "pushcart"],

        ["discount", "overcharge"],

        ["pushcart", "vending"]

        // mammonite → NO CONNECTION
        // itemAppraisal → NO CONNECTION
    ],

    "Thief": [
        ["steal", "hiding"],
        ["envenom", "detoxify"]

        // doubleAttack → NO CONNECTION
        // improveDodge → NO CONNECTION
    ],

    "Acolyte": [
        ["divineProtection", "demonBane"],
        ["divineProtection", "angelus"],
        ["divineProtection", "safetyWall"],

        ["demonBane", "signumCrusis"],

        ["heal", "cure"],
        ["heal", "increaseAgi"],

        ["increaseAgi", "decreaseAgi"],

        ["ruwach", "teleport"],
        ["teleport", "warpPortal"],
        ["warpPortal", "pneuma"]

        // aquaBenedicta → NO CONNECTION
    ]
};

const skillTreeLayout = {

    "Novice": {
        basicSkill: { x: 50, y: 20 },
        firstAid:   { x: 35, y: 80 },
        playDead:   { x: 65, y: 80 }
    },

    "Swordsman": {
        swordMastery: { x: 50, y: 20 },
        twoHandedMastery: { x: 50, y: 80 },

        bash: { x: 30, y: 20 },
        magnumBreak: { x: 30, y: 80 },

        provoke: { x: 70, y: 20 },
        endure:  { x: 70, y: 80 },

        increaseHP: { x: 50, y: 140 },

        berserk:   { x: 30, y: 200 },
        fatalBlow: { x: 50, y: 200 },
        movingHP:  { x: 70, y: 200 }
    },

    "Mage": {
        fireBolt: { x: 50, y: 20 },
        fireBall: { x: 50, y: 80 },
        fireWall: { x: 50, y: 140 },

        sight: { x: 30, y: 140 },

        coldBolt:   { x: 30, y: 20 },
        frostDiver: { x: 30, y: 80 },

        lightningBolt: { x: 70, y: 20 },
        thunderstorm:  { x: 70, y: 80 },

        napalmBeat: { x: 50, y: 200 },
        soulStrike: { x: 40, y: 260 },
        safetyWall: { x: 60, y: 260 },

        stoneCurse: { x: 30, y: 260 },
        spRecovery: { x: 50, y: 320 },

        energyCoat: { x: 50, y: 380 }
    },

    "Archer": {
        owlsEye: { x: 50, y: 20 },
        vulturesEye: { x: 50, y: 80 },
        improveConcentration: { x: 50, y: 140 },

        doubleStrafe: { x: 35, y: 200 },
        arrowShower:  { x: 65, y: 200 },

        arrowCrafting: { x: 35, y: 260 },
        arrowRepel:    { x: 65, y: 260 }
    },

    "Merchant": {
        enlargeWeight: { x: 50, y: 20 },

        discount: { x: 30, y: 70 },
        pushcart: { x: 70, y: 70 },

        overcharge: { x: 30, y: 130 },
        vending:    { x: 70, y: 130 },

        mammonite:     { x: 30, y: 190 },
        itemAppraisal: { x: 70, y: 190 },

        cartRevolution: { x: 30, y: 250 },
        changeCart:     { x: 50, y: 250 },
        crazyUproar:    { x: 70, y: 250 }
    },

    "Thief": {
        steal: { x: 50, y: 20 },
        hiding: { x: 50, y: 80 },

        envenom: { x: 30, y: 20 },
        detoxify:{ x: 30, y: 80 },

        doubleAttack: { x: 70, y: 20 },
        improveDodge: { x: 70, y: 80 },

        backSlide:  { x: 20, y: 140 },
        findStone:  { x: 40, y: 140 },
        sandAttack: { x: 60, y: 140 },
        stoneFling: { x: 80, y: 140 }
    },

    "Acolyte": {
        heal: { x: 50, y: 20 },

        cure:        { x: 30, y: 70 },
        increaseAgi: { x: 70, y: 70 },

        decreaseAgi: { x: 70, y: 130 },

        divineProtection: { x: 50, y: 130 },

        angelus:   { x: 30, y: 130 },
        demonBane: { x: 70, y: 190 },

        signumCrusis: { x: 70, y: 250 },

        ruwach: { x: 30, y: 190 },
        teleport: { x: 30, y: 250 },
        warpPortal: { x: 30, y: 310 },
        pneuma: { x: 30, y: 370 },

        aquaBenedicta: { x: 70, y: 310 },
        holyLight:     { x: 70, y: 370 }
    }
};

const skillTypes = {
    "Novice": {
        basicSkill: "Passive",
        firstAid: "Supportive",
        playDead: "Supportive"
    },
    "Swordsman": {
        swordMastery: "Passive",
        twoHandedMastery: "Passive",
        bash: "Offensive",
        magnumBreak: "Offensive",
        provoke: "Active",
        endure: "Active",
        increaseHP: "Passive",
        berserk: "Passive",
        fatalBlow: "Passive",
        movingHP: "Passive"
    },
    "Mage": {
        fireBolt: "Offensive",
        fireBall: "Offensive",
        fireWall: "Offensive",
        sight: "Active",
        coldBolt: "Offensive",
        frostDiver: "Offensive",
        lightningBolt: "Offensive",
        thunderstorm: "Offensive",
        napalmBeat: "Offensive",
        soulStrike: "Offensive",
        safetyWall: "Supportive",
        stoneCurse: "Active",
        spRecovery: "Passive",
        energyCoat: "Supportive"
    },
    "Archer": {
        owlsEye: "Passive",
        vulturesEye: "Passive",
        improveConcentration: "Suppotive",
        doubleStrafe: "Offensive",
        arrowShower: "Offensive",
        arrowCrafting: "Active",
        arrowRepel: "Offensive"
    },
    "Merchant": {
        enlargeWeight: "Passive",
        discount: "Passive",
        pushcart: "Passive",
        overcharge: "Passive",
        vending: "Active",
        mammonite: "Offensive",
        itemAppraisal: "Active",
        cartRevolution: "Offensive",
        changeCart: "Active",
        crazyUproar: "Supportive"
    },
    "Thief": {
        steal: "Active",
        hiding: "Active",
        envenom: "Offensive",
        detoxify: "Supportive",
        doubleAttack: "Passive",
        improveDodge: "Passive",
        backSlide: "Active",
        findStone: "Active",
        sandAttack: "Offensive",
        stoneFling: "Offensive"
    },
    "Acolyte": {
        heal: "Supportive",
        cure: "Supportive",
        increaseAgi: "Supportive",
        decreaseAgi: "Active",
        divineProtection: "Passive",
        angelus: "Supportive",
        demonBane: "Passive",
        signumCrusis: "Supportive",
        ruwach: "Offensive",
        teleport: "Supportive",
        warpPortal: "Supportive",
        pneuma: "Supportive",
        aquaBenedicta: "Active",
        holyLight: "Offensive"
    }
};

function formatSkillIcon(name) {
    return name
        .toLowerCase()       // lowercase
        .replace(/\s+/g, '') // remove spaces
        .replace(/[^a-z0-9]/g, ''); // remove special characters
}

function renderSkillsForJob(job) {
    const treeBody = document.getElementById("skillTreeBody");
    treeBody.innerHTML = ""; // clear previous skills

    const skills = jobSkills[job];
    if (!skills) return;

    Object.keys(skills).forEach(key => {
        const skill = skills[key];

        const el = document.createElement("div");
        el.className = "skill";
        el.dataset.name = skill.name;
        el.dataset.desc = skill.desc;

        el.innerText = skill.name;

        // optional: position will be handled by your updateSkillUI function
        treeBody.appendChild(el);
    });

    // Optional: scale down automatically if too many skills
    const skillCount = Object.keys(skills).length;
    treeBody.style.transform = skillCount > 15 ? "scale(0.85)" : "scale(1)";
}
const jobSelect = document.getElementById("job");
jobSelect.addEventListener("change", () => {
    renderSkillsForJob(jobSelect.value);
    updateSkillUI(); // keep your existing positioning, colors, connections
});

function updateSkillUI() {
    const job = document.getElementById("job").value;
    const treeBody = document.getElementById("skillTreeBody");

    treeBody.innerHTML = "";

    const skills = jobSkills[job];
    const layout = skillTreeLayout[job];

    if (!skills || !layout) return;

    Object.keys(skills).forEach(skillName => {
        if (!(skillName in playerSkills)) playerSkills[skillName] = 0;

        const skill = skills[skillName];
        const pos = layout[skillName];

        if (!pos) return; // skip if no layout

        const el = document.createElement("div");
        el.className = "skill";
        el.dataset.skill = skillName;
        el.dataset.name = skill.name;
        el.dataset.desc = skill.desc;

        // Determine skill type from skillTypes
        const skillType = (skillTypes[job] && skillTypes[job][skillName]) ? skillTypes[job][skillName] : "Passive";
        el.dataset.type = skillType;

        // Mark quest skills
        const isQuest = (jobSkills[job][skillName] && jobSkills[job][skillName].quest) || false;
        if (isQuest) el.classList.add("quest-skill");

        el.innerHTML = `
            <img src="skills/${formatSkillIcon(skill.name)}.png"
                 onerror="this.src='skills/default.png'">
            <span class="lvl">${playerSkills[skillName]}</span>
        `;

        // 📍 TREE POSITIONING
        el.style.left = pos.x + "%";
        el.style.top = pos.y + "px";
        el.style.transform = "translateX(-50%)";

        const state = getSkillState(skillName);
        el.classList.add(state);

        el.onclick = () => upgradeSkill(skillName);

        treeBody.appendChild(el);
    });

    document.querySelector("#skillPoints .sp-value").innerText = skillPoints;

    setTimeout(drawSkillConnections, 50);

    const container = document.getElementById("skillTreeBody");
    const skillCount = Object.keys(skills).length;

    if (skillCount > 15) {
        container.style.transform = "scale(0.85)";
    } else {
        container.style.transform = "scale(1)";
    }

    // ✅ BIND TOOLTIP AFTER ALL SKILL ELEMENTS EXIST
    bindSkillTooltips();
}

// ===============================
// SKILL TOOLTIPS
// ===============================
function bindSkillTooltips() {
    let tooltip = document.querySelector('.skill-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        document.body.appendChild(tooltip);
    }

    const skills = document.querySelectorAll('.skill');
    const job = document.getElementById("job").value;

    skills.forEach(skillEl => {
        const skillName = skillEl.dataset.skill;
        const skill = jobSkills[job][skillName];
        if (!skill) return;

        // 🔥 REMOVE browser tooltip (VERY IMPORTANT)
        skillEl.removeAttribute("title");

        // ✅ Reset old events (safe)
        skillEl.onmouseenter = null;
        skillEl.onmouseleave = null;
        skillEl.onmousemove = null;
        skillEl.onclick = null;

        skillEl.onmouseenter = () => {
            const skillType = (skillTypes[job] && skillTypes[job][skillName]) 
                                ? skillTypes[job][skillName] 
                                : "Passive";

            const isQuest = skill.type === "quest"; // 🔥 use your existing type
            const displayType = skillType + (isQuest ? " (Quest Skill)" : "");

            tooltip.innerHTML = `
                <strong>${skill.name}</strong><br>
                ${skill.maxLevel ? `<em>Max Level: ${skill.maxLevel}</em><br>` : ""}
                ${skill.desc}<br>
                <div style="margin-top:4px; font-size:11px; color:${isQuest ? "#ff69b4" : "#ffd96a"};">
                    Type: ${displayType}
                </div>
            `;
            tooltip.classList.add('show');
        };

        skillEl.onmouseleave = () => {
            tooltip.classList.remove('show');
        };

        skillEl.onmousemove = (e) => {
            tooltip.style.left = e.clientX + 14 + 'px';
            tooltip.style.top = e.clientY - 16 + 'px';
        };

        skillEl.onclick = () => {
            tooltip.classList.remove('show');
            upgradeSkill(skillName);
        };
    });
}

function drawSkillConnections() {
    const job = document.getElementById("job").value;
    const layer = document.getElementById("skillConnections");

    if (!layer) return;
    layer.innerHTML = "";

    const connections = skillConnections[job];
    if (!connections) return;

    const treeBody = document.getElementById("skillTreeBody");
    const parentRect = treeBody.getBoundingClientRect();

    const scale = treeBody.style.transform
        ? parseFloat(treeBody.style.transform.replace("scale(", "").replace(")", ""))
        : 1;

    connections.forEach(([from, to]) => {
        const fromEl = document.querySelector(`[data-skill="${from}"]`);
        const toEl = document.querySelector(`[data-skill="${to}"]`);

        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        // ✅ PERFECT CENTER (more stable)
        const x1 = ((fromRect.left + fromRect.width / 2) - parentRect.left) / scale;
        const y1 = ((fromRect.top + fromRect.height / 2) - parentRect.top) / scale;

        const x2 = ((toRect.left + toRect.width / 2) - parentRect.left) / scale;
        const y2 = ((toRect.top + toRect.height / 2) - parentRect.top) / scale;

        const dx = x2 - x1;
        const dy = y2 - y1;

        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

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