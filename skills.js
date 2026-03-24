// ===============================
// SKILL TREE DATA and code
// ===============================
// skills each job
const jobSkills = {
    "Novice": {
        basicSkill: { name: "Basic Skill", maxLevel: 9, type: "normal", desc: "A simple beginner skill." },
        firstAid: { name: "First Aid", maxLevel: 1, type: "quest", desc: "Recover small HP instantly.", quest: true, reqBase: 4 },
        playDead: { name: "Play Dead", maxLevel: 1, type: "quest", desc: "Pretend to be dead to avoid attacks.", quest: true, reqBase: 4 }
    },
    "Swordsman": {
        swordMastery: { name: "Sword Mastery", maxLevel: 10, type: "normal", desc: "Increase damage with swords." },
        twoHandedMastery: { name: "Two-Handed Sword Mastery", maxLevel: 10, type: "normal", desc: "Increase damage when using two-handed swords.", req: { swordMastery: 1 } },
        bash: { name: "Bash", maxLevel: 10, type: "normal", desc: "Deal physical damage to a single enemy." },
        magnumBreak: { name: "Magnum Break", maxLevel: 10, type: "normal", desc: "Attack all enemies nearby.", req: { bash: 5 } },
        provoke: { name: "Provoke", maxLevel: 10, type: "normal", desc: "Taunt enemy to attack you." },
        endure: { name: "Endure", maxLevel: 10, type: "normal", desc: "Reduce incoming damage temporarily.", req: { provoke: 5 } },
        increaseHP: { name: "Increase HP Recovery", maxLevel: 10, type: "normal", desc: "Boost natural HP regeneration." },
        berserk: { name: "Berserk", maxLevel: 1, type: "quest", desc: "Boost attack power.", quest: true, reqJob: 30 },
        fatalBlow: { name: "Fatal Blow", maxLevel: 1, type: "quest", desc: "Powerful strike.", quest: true, reqJob: 30 },
        movingHP: { name: "HP Recovery While Moving", maxLevel: 1, type: "quest", desc: "Regen while walking.", quest: true, reqJob: 35 }
    },
    "Mage": {
        spRecovery: { name: "Increase SP Recovery", maxLevel: 10, type: "normal", desc: "Boost natural SP regeneration." },
        fireBolt: { name: "Fire Bolt", maxLevel: 10, type: "normal", desc: "Quick fire projectile spell." },
        fireBall: { name: "Fire Ball", maxLevel: 10, type: "normal", desc: "Fire magic to hit a single enemy.", req: { fireBolt: 4 } },
        fireWall: { name: "Fire Wall", maxLevel: 10, type: "normal", desc: "Summon a wall of fire.", req: { fireBall: 5, sight: 1 } },
        sight: { name: "Sight", maxLevel: 1, type: "normal", desc: "Detect hidden enemies.", req: { fireBolt: 1 } },
        coldBolt: { name: "Cold Bolt", maxLevel: 10, type: "normal", desc: "Ice attack." },
        frostDiver: { name: "Frost Diver", maxLevel: 10, type: "normal", desc: "Ice AoE damage.", req: { coldBolt: 5 } },
        lightningBolt: { name: "Lightning Bolt", maxLevel: 10, type: "normal", desc: "Deal electric damage." },
        thunderstorm: { name: "Thunderstorm", maxLevel: 10, type: "normal", desc: "Electric AoE damage.", req: { lightningBolt: 4 } },
        napalmBeat: { name: "Napalm Beat", maxLevel: 10, type: "normal", desc: "Area fire attack." },
        soulStrike: { name: "Soul Strike", maxLevel: 10, type: "normal", desc: "Magic attack ignores defense.", req: { napalmBeat: 4 } },
        safetyWall: { name: "Safety Wall", maxLevel: 10, type: "normal", desc: "Block melee attacks.", req: { soulStrike: 5 } },
        stoneCurse: { name: "Stone Curse", maxLevel: 10, type: "normal", desc: "Petrify a single enemy.", req: { napalmBeat: 1 } },
        energyCoat: { name: "Energy Coat", maxLevel: 1, type: "quest", desc: "Boost defense.", quest: true, reqJob: 35 }
    },
    "Archer": {
        owlsEye: { name: "Owl's Eye", maxLevel: 10, type: "normal", desc: "Increase ranged attack range." },
        vulturesEye: { name: "Vulture's Eye", maxLevel: 10, type: "normal", desc: "Increase accuracy.", req: { owlsEye: 3 } },
        improveConcentration: { name: "Improve Concentration", maxLevel: 10, type: "normal", desc: "Increase critical rate.", req: { vulturesEye: 1 } },
        doubleStrafe: { name: "Double Strafe", maxLevel: 10, type: "normal", desc: "Shoot two arrows." },
        arrowShower: { name: "Arrow Shower", maxLevel: 10, type: "normal", desc: "Shoot multiple arrows.", req: { doubleStrafe: 5 } },
        arrowCrafting: { name: "Arrow Crafting", maxLevel: 1, type: "quest", desc: "Create custom arrows.", quest: true, reqJob: 30 },
        arrowRepel: { name: "Arrow Repel", maxLevel: 1, type: "quest", desc: "Knock back enemies.", quest: true, reqJob: 35 }
    },
    "Merchant": {
        enlargeWeight: { name: "Enlarge Weight Limit", maxLevel: 10, type: "normal", desc: "Carry more items." },
        discount: { name: "Discount", maxLevel: 10, type: "normal", desc: "Reduce shop prices.", req: { enlargeWeight: 3 } },
        overcharge: { name: "Overcharge", maxLevel: 10, type: "normal", desc: "Increase weapon damage.", req: { discount: 3 } },
        pushcart: { name: "Pushcart", maxLevel: 10, type: "normal", desc: "Move your cart faster.", req: { enlargeWeight: 5 } },
        vending: { name: "Vending", maxLevel: 10, type: "normal", desc: "Sell items.", req: { pushcart: 3 } },
        mammonite: { name: "Mammonite", maxLevel: 10, type: "normal", desc: "Deal earth damage." },
        itemAppraisal: { name: "Item Appraisal", maxLevel: 1, type: "normal", desc: "Identify unknown items." },
        cartRevolution: { name: "Cart Revolution", maxLevel: 1, type: "quest", desc: "Spin your cart.", quest: true, reqJob: 35 },
        changeCart: { name: "Change Cart", maxLevel: 1, type: "quest", desc: "Switch cart style.", quest: true, reqJob: 30 },
        crazyUproar: { name: "Crazy Uproar", maxLevel: 1, type: "quest", desc: "Confuse enemies.", quest: true, reqJob: 15 }
    },
    "Thief": {
        doubleAttack: { name: "Double Attack", maxLevel: 10, type: "normal", desc: "Attack twice." },
        improveDodge: { name: "Improve Dodge", maxLevel: 10, type: "normal", desc: "Increase dodge chance." },
        steal: { name: "Steal", maxLevel: 10, type: "normal", desc: "Steal items." },
        hiding: { name: "Hiding", maxLevel: 10, type: "normal", desc: "Hide from enemies.", req: { steal: 5 } },
        envenom: { name: "Envenom", maxLevel: 10, type: "normal", desc: "Add poison effect." },
        detoxify: { name: "Detoxify", maxLevel: 1, type: "normal", desc: "Remove poison.", req: { envenom: 3 } },
        backSlide: { name: "Back Slide", maxLevel: 1, type: "quest", desc: "Move behind enemy.", quest: true, reqJob: 35 },
        findStone: { name: "Find Stone", maxLevel: 1, type: "quest", desc: "Locate items.", quest: true, reqJob: 20 },
        sandAttack: { name: "Sand Attack", maxLevel: 1, type: "quest", desc: "Blind enemies.", quest: true, reqJob: 25 },
        stoneFling: { name: "Stone Fling", maxLevel: 1, type: "quest", desc: "Throw stones.", quest: true, reqJob: 15}
    },
    "Acolyte": {
        divineProtection: { name: "Divine Protection", maxLevel: 10, type: "normal", desc: "Reduce damage." },
        demonBane: { name: "Demon Bane", maxLevel: 10, type: "normal", desc: "Damage demon-type.", req: { divineProtection: 3 } },
        ruwach: { name: "Ruwach", maxLevel: 1, type: "normal", desc: "Remove curse." },
        teleport: { name: "Teleport", maxLevel: 2, type: "normal", desc: "Instantly move.", req: { ruwach: 1 } },
        warpPortal: { name: "Warp Portal", maxLevel: 4, type: "normal", desc: "Create a portal.", req: { teleport: 2 } },
        pneuma: { name: "Pneuma", maxLevel: 1, type: "normal", desc: "Remove fear.", req: { warpPortal: 4 } },
        heal: { name: "Heal", maxLevel: 10, type: "normal", desc: "Restore HP." },
        cure: { name: "Cure", maxLevel: 1, type: "normal", desc: "Heal minor wounds.", req: { heal: 2 } },
        increaseAgi: { name: "Increase AGI", maxLevel: 10, type: "normal", desc: "Increase AGI.", req: { heal: 3 } },
        decreaseAgi: { name: "Decrease AGI", maxLevel: 10, type: "normal", desc: "Lower enemy AGI.", req: { increaseAgi: 1 } },
        angelus: { name: "Angelus", maxLevel: 10, type: "normal", desc: "Increase party defense.", req: { divineProtection: 3 } },
        signumCrusis: { name: "Signum Crusis", maxLevel: 10, type: "normal", desc: "Holy attack.", req: { demonBane: 3 } },
        aquaBenedicta: { name: "Aqua Benedicta", maxLevel: 1, type: "normal", desc: "Holy water effect." },
        holyLight: { name: "Holy Light", maxLevel: 1, type: "quest", desc: "Holy magic attack.", quest: true, reqJob: 30 }
    }
};

const skillConnections = {
    "Novice": [["basicSkill", "firstAid"], ["basicSkill", "playDead"]],
    "Swordsman": [["swordMastery", "twoHandedMastery"], ["bash", "magnumBreak"], ["provoke", "endure"]],
    "Mage": [["napalmBeat", "soulStrike"], ["soulStrike", "safetyWall"], ["sight", "fireWall"], ["fireBolt", "fireBall"], ["fireBall", "fireWall"], ["coldBolt", "frostDiver"], ["lightningBolt", "thunderstorm"]],
    "Archer": [["owlsEye", "vulturesEye"], ["vulturesEye", "improveConcentration"], ["doubleStrafe", "arrowShower"]],
    "Merchant": [["enlargeWeight", "discount"], ["enlargeWeight", "pushcart"], ["discount", "overcharge"], ["pushcart", "vending"]],
    "Thief": [["steal", "hiding"], ["envenom", "detoxify"]],
    "Acolyte": [["divineProtection", "demonBane"], ["divineProtection", "angelus"], ["demonBane", "signumCrusis"], ["heal", "cure"], ["heal", "increaseAgi"], ["increaseAgi", "decreaseAgi"], ["ruwach", "teleport"], ["teleport", "warpPortal"], ["warpPortal", "pneuma"]]
};

const skillTreeLayout = {
    "Novice": { basicSkill: { x: 50, y: 20 }, firstAid: { x: 35, y: 80 }, playDead: { x: 65, y: 80 } },
    "Swordsman": { swordMastery: { x: 50, y: 20 }, twoHandedMastery: { x: 50, y: 80 }, bash: { x: 30, y: 20 }, magnumBreak: { x: 30, y: 80 }, provoke: { x: 70, y: 20 }, endure: { x: 70, y: 80 }, increaseHP: { x: 50, y: 140 }, berserk: { x: 30, y: 200 }, fatalBlow: { x: 50, y: 200 }, movingHP: { x: 70, y: 200 } },
    "Mage": { fireBolt: { x: 50, y: 20 }, fireBall: { x: 50, y: 80 }, fireWall: { x: 50, y: 140 }, sight: { x: 30, y: 140 }, coldBolt: { x: 30, y: 20 }, frostDiver: { x: 30, y: 80 }, lightningBolt: { x: 70, y: 20 }, thunderstorm: { x: 70, y: 80 }, napalmBeat: { x: 50, y: 200 }, soulStrike: { x: 40, y: 260 }, safetyWall: { x: 60, y: 260 }, stoneCurse: { x: 30, y: 260 }, spRecovery: { x: 50, y: 320 }, energyCoat: { x: 50, y: 380 } },
    "Archer": { owlsEye: { x: 50, y: 20 }, vulturesEye: { x: 50, y: 80 }, improveConcentration: { x: 50, y: 140 }, doubleStrafe: { x: 35, y: 200 }, arrowShower: { x: 65, y: 200 }, arrowCrafting: { x: 35, y: 260 }, arrowRepel: { x: 65, y: 260 } },
    "Merchant": { enlargeWeight: { x: 50, y: 20 }, discount: { x: 30, y: 70 }, pushcart: { x: 70, y: 70 }, overcharge: { x: 30, y: 130 }, vending: { x: 70, y: 130 }, mammonite: { x: 30, y: 190 }, itemAppraisal: { x: 70, y: 190 }, cartRevolution: { x: 30, y: 250 }, changeCart: { x: 50, y: 250 }, crazyUproar: { x: 70, y: 250 } },
    "Thief": { steal: { x: 50, y: 20 }, hiding: { x: 50, y: 80 }, envenom: { x: 30, y: 20 }, detoxify: { x: 30, y: 80 }, doubleAttack: { x: 70, y: 20 }, improveDodge: { x: 70, y: 80 }, backSlide: { x: 20, y: 140 }, findStone: { x: 40, y: 140 }, sandAttack: { x: 60, y: 140 }, stoneFling: { x: 80, y: 140 } },
    "Acolyte": { heal: { x: 50, y: 20 }, cure: { x: 30, y: 70 }, increaseAgi: { x: 70, y: 70 }, decreaseAgi: { x: 70, y: 130 }, divineProtection: { x: 50, y: 130 }, angelus: { x: 30, y: 130 }, demonBane: { x: 70, y: 190 }, signumCrusis: { x: 70, y: 250 }, ruwach: { x: 30, y: 190 }, teleport: { x: 30, y: 250 }, warpPortal: { x: 30, y: 310 }, pneuma: { x: 30, y: 370 }, aquaBenedicta: { x: 70, y: 310 }, holyLight: { x: 70, y: 370 } }
};

const skillTypes = {
    "Novice": { basicSkill: "Passive", firstAid: "Supportive", playDead: "Supportive" },
    "Swordsman": { swordMastery: "Passive", twoHandedMastery: "Passive", bash: "Offensive", magnumBreak: "Offensive", provoke: "Active", endure: "Active", increaseHP: "Passive", berserk: "Passive", fatalBlow: "Passive", movingHP: "Passive" },
    "Mage": { fireBolt: "Offensive", fireBall: "Offensive", fireWall: "Offensive", sight: "Active", coldBolt: "Offensive", frostDiver: "Offensive", lightningBolt: "Offensive", thunderstorm: "Offensive", napalmBeat: "Offensive", soulStrike: "Offensive", safetyWall: "Supportive", stoneCurse: "Active", spRecovery: "Passive", energyCoat: "Supportive" },
    "Archer": { owlsEye: "Passive", vulturesEye: "Passive", improveConcentration: "Supportive", doubleStrafe: "Offensive", arrowShower: "Offensive", arrowCrafting: "Active", arrowRepel: "Offensive" },    "Merchant": { enlargeWeight: "Passive", discount: "Passive", pushcart: "Passive", overcharge: "Passive", vending: "Active", mammonite: "Offensive", itemAppraisal: "Active", cartRevolution: "Offensive", changeCart: "Active", crazyUproar: "Supportive" },
    "Thief": { steal: "Active", hiding: "Active", envenom: "Offensive", detoxify: "Supportive", doubleAttack: "Passive", improveDodge: "Passive", backSlide: "Active", findStone: "Active", sandAttack: "Offensive", stoneFling: "Offensive" },
    "Acolyte": { heal: "Supportive", cure: "Supportive", increaseAgi: "Supportive", decreaseAgi: "Active", divineProtection: "Passive", angelus: "Supportive", demonBane: "Passive", signumCrusis: "Supportive", ruwach: "Offensive", teleport: "Supportive", warpPortal: "Supportive", pneuma: "Supportive", aquaBenedicta: "Active", holyLight: "Offensive" }
};

function formatSkillIcon(name) {
    return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}

function getMissingPoints(skillName, job) {
    const skill = jobSkills[job][skillName];
    if (!skill || !skill.req) return 0;

    let totalPointsNeeded = 0;

    for (const [reqSkillName, reqLevel] of Object.entries(skill.req)) {
        const currentLevel = playerSkills[reqSkillName] || 0;
        
        if (currentLevel < reqLevel) {
            // 1. Calculate points needed for this specific parent
            const diff = reqLevel - currentLevel;
            totalPointsNeeded += diff;

            // 2. RECURSION: Check if this parent also has missing parents
            totalPointsNeeded += getMissingPoints(reqSkillName, job);
        }
    }
    return totalPointsNeeded;
}

function handleSkillLevelChange() {
    const jobLvlInput = document.getElementById("jobLevel"); 
    const baseLvlInput = document.getElementById("baseLevel");
    const currentJob = document.getElementById("job").value;
    if (!jobLvlInput) return;

    currentJobLevel = parseInt(jobLvlInput.value) || 1;
    const currentBaseLevel = parseInt(baseLvlInput?.value) || 1;
    
    const skills = jobSkills[currentJob];
    if (skills) {
        Object.keys(skills).forEach(key => {
            if (!(key in playerSkills)) playerSkills[key] = 0; // Initialize if missing
            
            const skill = skills[key];
            const isQuest = skill.quest === true || skill.type === "quest";
            
            if (isQuest) {
                if (currentJob === "Novice") {
                    playerSkills[key] = (currentBaseLevel >= (skill.reqBase || 4)) ? 1 : 0;
                } else {
                    const reqJobLvl = skill.reqJob || 1;
                    playerSkills[key] = (currentJobLevel >= reqJobLvl) ? 1 : 0;
                }
            }
        });
    }

    // Recalculate Skill Points
    let totalSpent = 0;
    Object.keys(playerSkills).forEach(key => {
        const skill = jobSkills[currentJob][key];
        if (skill && !(skill.quest || skill.type === "quest")) {
            totalSpent += playerSkills[key];
        }
    });

    skillPoints = Math.max(0, (currentJobLevel - 1) - totalSpent);
    updateSkillUI();
}

function renderSkillsForJob(job) {
    const treeBody = document.getElementById("skillTreeBody");
    treeBody.innerHTML = "";
    const skills = jobSkills[job];
    if (!skills) return;

    Object.keys(skills).forEach(key => {
        const skill = skills[key];
        const el = document.createElement("div");
        el.className = "skill";
        el.dataset.name = skill.name;
        el.dataset.desc = skill.desc;
        el.innerText = skill.name;
        treeBody.appendChild(el);
    });

    const skillCount = Object.keys(skills).length;
    treeBody.style.transform = skillCount > 15 ? "scale(0.85)" : "scale(1)";
}

const jobSelect = document.getElementById("job");
jobSelect.addEventListener("change", () => {
    playerSkills = {}; // Reset learned skills on job change
    
    const treeBody = document.getElementById("skillTreeBody");
    if(treeBody) treeBody.style.transform = "scale(1)";
    
    renderSkillsForJob(jobSelect.value);
    handleSkillLevelChange();
});

function getSkillState(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    if (!skill) return "locked";
    
    const level = playerSkills[skillName] || 0;
    if (level > 0) return "learned";

    const currentBaseLevel = parseInt(document.getElementById("baseLevel")?.value) || 1; 
    const isQuest = skill.quest === true || skill.type === "quest";
    const reqValue = skill.reqJob || 1;

    // --- NOVICE BASE LVL vs OTHERS JOB LVL ---
    if (job === "Novice") {
        if (isQuest && currentBaseLevel < 4) return "locked";
    } else {
        if (currentJobLevel < reqValue) return "locked";
    }

    if (skill.req) {
        for (const [reqSkill, reqLevel] of Object.entries(skill.req)) {
            if ((playerSkills[reqSkill] || 0) < reqLevel) return "locked";
        }
    }

    if (isQuest) return "available";
    return skillPoints > 0 ? "available" : "locked";
}

function updateSkillUI() {
    const job = document.getElementById("job").value;
    const treeBody = document.getElementById("skillTreeBody");
    if (!treeBody) return;
    treeBody.innerHTML = "";

    const skills = jobSkills[job];
    const layout = skillTreeLayout[job];
    if (!skills || !layout) return;

    Object.keys(skills).forEach(skillName => {
        if (!(skillName in playerSkills)) playerSkills[skillName] = 0;
        const skill = skills[skillName];
        const pos = layout[skillName];
        if (!pos) return;

        const el = document.createElement("div");
        el.className = "skill";
        el.dataset.skill = skillName;
        const skillType = (skillTypes[job] && skillTypes[job][skillName]) ? skillTypes[job][skillName] : "Passive";
        el.dataset.type = skillType;

        const isQuest = (jobSkills[job][skillName] && jobSkills[job][skillName].quest) || false;
        if (isQuest) el.classList.add("quest-skill");

        el.innerHTML = `
            <img src="skills/${formatSkillIcon(skill.name)}.png" onerror="this.src='skills/default.png'">
            <span class="lvl">${playerSkills[skillName]}</span>
        `;

        el.style.left = pos.x + "%";
        el.style.top = pos.y + "px";
        el.style.transform = "translateX(-50%)";

        const state = getSkillState(skillName);
        el.classList.add(state);
        
        el.onclick = () => upgradeSkill(skillName);
        el.oncontextmenu = (e) => {
            e.preventDefault();
            decreaseSkill(skillName);
        };

        treeBody.appendChild(el);
    });

    document.querySelector("#skillPoints .sp-value").innerText = skillPoints;
    setTimeout(drawSkillConnections, 50);
    bindSkillTooltips();
}

function upgradeSkill(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    if (!skill) return;

    // Skip Quest Skills (they don't use points)
    if (skill.quest === true || skill.type === "quest") return; 

    const currentLevel = playerSkills[skillName] || 0;
    if (currentLevel >= skill.maxLevel) return;

    // 1. Calculate Total Cost (Target + all Ancestors)
    const pointsNeededForParents = getMissingPoints(skillName, job);
    const totalCost = 1 + pointsNeededForParents;

    // 2. Check if we can afford the whole "Package"
    if (skillPoints < totalCost) {
        console.warn("Insufficient points for advance upgrade chain.");
        return;
    }

    // 3. Helper to apply levels recursively
    const applyRequirements = (name) => {
        const s = jobSkills[job][name];
        if (s && s.req) {
            for (const [reqName, reqLvl] of Object.entries(s.req)) {
                // First, ensure the requirement's own requirements are met
                applyRequirements(reqName);
                
                // Then, bring the requirement up to the needed level
                while ((playerSkills[reqName] || 0) < reqLvl) {
                    playerSkills[reqName] = (playerSkills[reqName] || 0) + 1;
                    skillPoints--;
                }
            }
        }
    };

    // 4. Execute the upgrade chain
    applyRequirements(skillName); // Fix the parents
    playerSkills[skillName]++;    // Upgrade the target
    skillPoints--; 
    
    // 5.   Refresh UI and Stats
    updateSkillUI();
    if (typeof updateStats === 'function') {
        updateStats(); 
    }
}

function decreaseSkill(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    const currentLevel = playerSkills[skillName] || 0;
    if (currentLevel <= 0) return;

    const isQuest = skill.quest === true || skill.type === "quest";
    if (isQuest) return;

    const isPrereqForLearnedSkill = Object.keys(jobSkills[job]).some(key => {
        const otherSkill = jobSkills[job][key];
        return otherSkill.req && otherSkill.req[skillName] && playerSkills[key] > 0 && currentLevel <= otherSkill.req[skillName];
    });

    if (isPrereqForLearnedSkill) return;

    playerSkills[skillName]--;
    skillPoints++;
    updateSkillUI();

    if (typeof updateStats === 'function') {
        updateStats();
    }
}

function bindSkillTooltips() {
    let tooltip = document.querySelector('.skill-tooltip') || document.createElement('div');
    if (!tooltip.className) {
        tooltip.className = 'skill-tooltip';
        document.body.appendChild(tooltip);
    }

    const skills = document.querySelectorAll('.skill');
    const job = document.getElementById("job").value;
    const currentBaseLevel = parseInt(document.getElementById("baseLevel")?.value) || 1;

    skills.forEach(skillEl => {
        const skillName = skillEl.dataset.skill;
        const skill = jobSkills[job][skillName];

        skillEl.onmouseenter = () => {
            const skillType = (skillTypes[job] && skillTypes[job][skillName]) || "Passive";
            const isQuest = skill.type === "quest" || skill.quest === true;
            let reqText = "";
            
            if (isQuest) {
                if (job === "Novice") {
                    const met = currentBaseLevel >= 4;
                    reqText = `<br><span style="color:${met ? "#90ee90" : "#ff4d4d"}">Requires Base Lv: 4</span>`;
                } else {
                    const reqJobLvl = skill.reqJob || 1;
                    const met = currentJobLevel >= reqJobLvl;
                    reqText = `<br><span style="color:${met ? "#90ee90" : "#ff4d4d"}">Requires Job Lv: ${reqJobLvl}</span>`;
                }
            }

            let prereqText = "";
            if (skill.req) {
                Object.entries(skill.req).forEach(([reqName, reqLvl]) => {
                    const met = (playerSkills[reqName] || 0) >= reqLvl;
                    prereqText += `<br><span style="color:${met ? "#90ee90" : "#ff4d4d"}">Requires ${jobSkills[job][reqName].name} Lv: ${reqLvl}</span>`;
                });
            }

            tooltip.innerHTML = `
                <strong>${skill.name}</strong><br>
                ${skill.maxLevel ? `<em>Max Level: ${skill.maxLevel}</em><br>` : ""}
                ${skill.desc}
                ${reqText}${prereqText}
                <div style="margin-top:4px; font-size:11px; color:${isQuest ? "#ff69b4" : "#ffd96a"};">
                    Type: ${skillType}${isQuest ? " (Quest Skill)" : ""}
                </div>
            `;
            tooltip.classList.add('show');
        };

        skillEl.onmouseleave = () => tooltip.classList.remove('show');
        skillEl.onmousemove = (e) => {
            tooltip.style.left = e.clientX + 14 + 'px';
            tooltip.style.top = e.clientY - 16 + 'px';
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
    const scale = treeBody.style.transform ? parseFloat(treeBody.style.transform.replace("scale(", "").replace(")", "")) : 1;

    connections.forEach(([from, to]) => {
        const fromEl = document.querySelector(`[data-skill="${from}"]`);
        const toEl = document.querySelector(`[data-skill="${to}"]`);
        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

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

// Initial Event Listeners
// Ensure both level changes trigger the check
document.getElementById("jobLevel")?.addEventListener("input", handleSkillLevelChange);
document.getElementById("baseLevel")?.addEventListener("input", handleSkillLevelChange);

//anuu daw