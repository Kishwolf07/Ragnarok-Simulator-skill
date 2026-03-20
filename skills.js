// ===============================
// SKILL TREE DATA and code
// ===============================
let playerSkills = {};
let skillPoints = 0;
let currentJobLevel = 1;

// skills each job
 const jobSkills = {
    "Novice": {
        basicSkill: { name: "Basic Skill", maxLevel: 9, type: "normal", desc: "A simple beginner skill." },
        firstAid: { name: "First Aid", maxLevel: 1, type: "quest", desc: "Recover small HP instantly.", quest: true, reqJob: 1 },
        playDead: { name: "Play Dead", maxLevel: 1, type: "quest", desc: "Pretend to be dead to avoid attacks.", quest: true, req: { basicSkill: 7 }, reqJob: 1 }
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
        stoneFling: { name: "Stone Fling", maxLevel: 1, type: "quest", desc: "Throw stones.", quest: true, reqJob: 20 }
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

// Skill line connections
const skillConnections = {
    "Novice": [["basicSkill", "firstAid"], ["basicSkill", "playDead"]],
    "Swordsman": [["swordMastery", "twoHandedMastery"], ["bash", "magnumBreak"], ["provoke", "endure"]],
    "Mage": [["napalmBeat", "soulStrike"], ["napalmBeat", "safetyWall"], ["sight", "fireWall"], ["fireBolt", "fireBall"], ["fireBall", "fireWall"], ["coldBolt", "frostDiver"], ["lightningBolt", "thunderstorm"]],
    "Archer": [["owlsEye", "vulturesEye"], ["vulturesEye", "improveConcentration"], ["doubleStrafe", "arrowShower"]],
    "Merchant": [["enlargeWeight", "discount"], ["enlargeWeight", "pushcart"], ["discount", "overcharge"], ["pushcart", "vending"]],
    "Thief": [["steal", "hiding"], ["envenom", "detoxify"]],
    "Acolyte": [["divineProtection", "demonBane"], ["divineProtection", "angelus"], ["divineProtection", "safetyWall"], ["demonBane", "signumCrusis"], ["heal", "cure"], ["heal", "increaseAgi"], ["increaseAgi", "decreaseAgi"], ["ruwach", "teleport"], ["teleport", "warpPortal"], ["warpPortal", "pneuma"]]
};

// Skill node positioning (%)
const skillTreeLayout = {
    "Novice": { basicSkill: { x: 50, y: 20 }, firstAid: { x: 35, y: 80 }, playDead: { x: 65, y: 80 } },
    "Swordsman": { swordMastery: { x: 50, y: 20 }, twoHandedMastery: { x: 50, y: 80 }, bash: { x: 30, y: 20 }, magnumBreak: { x: 30, y: 80 }, provoke: { x: 70, y: 20 }, endure: { x: 70, y: 80 }, increaseHP: { x: 50, y: 140 }, berserk: { x: 30, y: 200 }, fatalBlow: { x: 50, y: 200 }, movingHP: { x: 70, y: 200 } },
    "Mage": { fireBolt: { x: 50, y: 20 }, fireBall: { x: 50, y: 80 }, fireWall: { x: 50, y: 140 }, sight: { x: 30, y: 140 }, coldBolt: { x: 30, y: 20 }, frostDiver: { x: 30, y: 80 }, lightningBolt: { x: 70, y: 20 }, thunderstorm: { x: 70, y: 80 }, napalmBeat: { x: 50, y: 200 }, soulStrike: { x: 40, y: 260 }, safetyWall: { x: 60, y: 260 }, stoneCurse: { x: 30, y: 260 }, spRecovery: { x: 50, y: 320 }, energyCoat: { x: 50, y: 380 } },
    "Archer": { owlsEye: { x: 50, y: 20 }, vulturesEye: { x: 50, y: 80 }, improveConcentration: { x: 50, y: 140 }, doubleStrafe: { x: 35, y: 200 }, arrowShower: { x: 65, y: 200 }, arrowCrafting: { x: 35, y: 260 }, arrowRepel: { x: 65, y: 260 } },
    "Merchant": { enlargeWeight: { x: 50, y: 20 }, discount: { x: 30, y: 70 }, pushcart: { x: 70, y: 70 }, overcharge: { x: 30, y: 130 }, vending: { x: 70, y: 130 }, mammonite: { x: 30, y: 190 }, itemAppraisal: { x: 70, y: 190 }, cartRevolution: { x: 30, y: 250 }, changeCart: { x: 50, y: 250 }, crazyUproar: { x: 70, y: 250 } },
    "Thief": { steal: { x: 50, y: 20 }, hiding: { x: 50, y: 80 }, envenom: { x: 30, y: 20 }, detoxify:{ x: 30, y: 80 }, doubleAttack: { x: 70, y: 20 }, improveDodge: { x: 70, y: 80 }, backSlide: { x: 20, y: 140 }, findStone: { x: 40, y: 140 }, sandAttack: { x: 60, y: 140 }, stoneFling: { x: 80, y: 140 } },
    "Acolyte": { heal: { x: 50, y: 20 }, cure: { x: 30, y: 70 }, increaseAgi: { x: 70, y: 70 }, decreaseAgi: { x: 70, y: 130 }, divineProtection: { x: 50, y: 130 }, angelus: { x: 30, y: 130 }, demonBane: { x: 70, y: 190 }, signumCrusis: { x: 70, y: 250 }, ruwach: { x: 30, y: 190 }, teleport: { x: 30, y: 250 }, warpPortal: { x: 30, y: 310 }, pneuma: { x: 30, y: 370 }, aquaBenedicta: { x: 70, y: 310 }, holyLight: { x: 70, y: 370 } }
};

const skillTypes = {
    "Novice": { basicSkill: "Passive", firstAid: "Supportive", playDead: "Supportive" },
    "Swordsman": { swordMastery: "Passive", twoHandedMastery: "Passive", bash: "Offensive", magnumBreak: "Offensive", provoke: "Active", endure: "Active", increaseHP: "Passive", berserk: "Passive", fatalBlow: "Passive", movingHP: "Passive" },
    "Mage": { fireBolt: "Offensive", fireBall: "Offensive", fireWall: "Offensive", sight: "Active", coldBolt: "Offensive", frostDiver: "Offensive", lightningBolt: "Offensive", thunderstorm: "Offensive", napalmBeat: "Offensive", soulStrike: "Offensive", safetyWall: "Supportive", stoneCurse: "Active", spRecovery: "Passive", energyCoat: "Supportive" },
    "Archer": { owlsEye: "Passive", vulturesEye: "Passive", improveConcentration: "Suppotive", doubleStrafe: "Offensive", arrowShower: "Offensive", arrowCrafting: "Active", arrowRepel: "Offensive" },
    "Merchant": { enlargeWeight: "Passive", discount: "Passive", pushcart: "Passive", overcharge: "Passive", vending: "Active", mammonite: "Offensive", itemAppraisal: "Active", cartRevolution: "Offensive", changeCart: "Active", crazyUproar: "Supportive" },
    "Thief": { steal: "Active", hiding: "Active", envenom: "Offensive", detoxify: "Supportive", doubleAttack: "Passive", improveDodge: "Passive", backSlide: "Active", findStone: "Active", sandAttack: "Offensive", stoneFling: "Offensive" },
    "Acolyte": { heal: "Supportive", cure: "Supportive", increaseAgi: "Supportive", decreaseAgi: "Active", divineProtection: "Passive", angelus: "Supportive", demonBane: "Passive", signumCrusis: "Supportive", ruwach: "Offensive", teleport: "Supportive", warpPortal: "Supportive", pneuma: "Supportive", aquaBenedicta: "Active", holyLight: "Offensive" }
};

function formatSkillIcon(name) {
    return name
        .toLowerCase()       // lowercase
        .replace(/\s+/g, '') // remove spaces
        .replace(/[^a-z0-9]/g, ''); // remove special characters
}

function handleLevelChange() {
    const jobLvlInput = document.getElementById("jobLevel"); 
    if (!jobLvlInput) return;

    currentJobLevel = parseInt(jobLvlInput.value) || 1;
    const currentJob = document.getElementById("job").value;
    
    let totalSpent = 0;
    Object.keys(playerSkills).forEach(key => {
        const skill = jobSkills[currentJob][key];
        const isQuest = skill?.quest === true || skill?.type === "quest";
        // Quest skills are free, don't count them against point pool
        if (skill && !isQuest) {
            totalSpent += playerSkills[key];
        }
    });

    skillPoints = Math.max(0, (currentJobLevel - 1) - totalSpent);
    updateSkillUI();
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

function getSkillState(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    if (!skill) return "locked";
    
    const level = playerSkills[skillName] || 0;
    if (level > 0) return "learned";

    // 1. Check Job Level Requirement
    const requiredJobLevel = skill.reqJob || 1;
    if (currentJobLevel < requiredJobLevel) return "locked";

    // 2. Check Prerequisite Skills
    if (skill.req) {
        for (const [reqSkill, reqLevel] of Object.entries(skill.req)) {
            if ((playerSkills[reqSkill] || 0) < reqLevel) return "locked";
        }
    }

    // 3. Check Point Availability
    const isQuest = skill.quest === true || skill.type === "quest";
    if (isQuest) return "available";

    return skillPoints > 0 ? "available" : "locked";
}

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
        
        //left click increse
        el.onclick = () => upgradeSkill(skillName);
       //rght click decrease
        el.oncontextmenu = (e) => {
        e.preventDefault(); // Prevents the browser's right-click menu
        decreaseSkill(skillName);
};

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

    //  BIND TOOLTIP AFTER ALL SKILL ELEMENTS EXIST
    bindSkillTooltips();
}

function upgradeSkill(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    if (!skill) return;

    const currentLevel = playerSkills[skillName] || 0;
    const state = getSkillState(skillName);

    if (state === "locked" || currentLevel >= skill.maxLevel) return;

    const isQuest = skill.quest === true || skill.type === "quest";
    if (!isQuest && skillPoints <= 0) return; 

    playerSkills[skillName]++;
    if (!isQuest) skillPoints--; 

    updateSkillUI();
}

function decreaseSkill(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    const currentLevel = playerSkills[skillName] || 0;

    // Can't decrease if it's already 0
    if (currentLevel <= 0) return;

    // Can't decrease Quest Skills (standard RO logic)
    const isQuest = skill.quest === true || skill.type === "quest";
    if (isQuest) return;

    // Prerequisite check: Can't decrease if other learned skills depend on this
    const isPrereqForLearnedSkill = Object.keys(jobSkills[job]).some(key => {
        const otherSkill = jobSkills[job][key];
        //If another skill requires this skill at a certain level and is already learned
        return otherSkill.req && 
               otherSkill.req[skillName] && 
               playerSkills[key] > 0 && 
               currentLevel <= otherSkill.req[skillName];
    });

    if (isPrereqForLearnedSkill) {
        console.warn("Cannot decrease: This skill is a prerequisite for another learned skill.");
        return;
    }

    // 4. Update points and level
    playerSkills[skillName]--;
    skillPoints++; // Refund the point

    updateSkillUI();
}

// ===============================
// SKILL TOOLTIPS
// ===============================
function bindSkillTooltips() {
    let tooltip = document.querySelector('.skill-tooltip') || document.createElement('div');
    if (!tooltip.className) {
        tooltip.className = 'skill-tooltip';
        document.body.appendChild(tooltip);
    }

    const skills = document.querySelectorAll('.skill');
    const job = document.getElementById("job").value;

    skills.forEach(skillEl => {
        const skillName = skillEl.dataset.skill;
        const skill = jobSkills[job][skillName];

        skillEl.onmouseenter = () => {
            const skillType = (skillTypes[job] && skillTypes[job][skillName]) || "Passive";
            const isQuest = skill.type === "quest" || skill.quest === true;
            
            let reqText = isQuest && job !== "Novice" ? 
                `<br><span style="color:${currentJobLevel >= (skill.reqJob || 1) ? "#90ee90" : "#ff4d4d"}">Requires Job Lv: ${skill.reqJob || 1}</span>` : "";

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

function upgradeSkill(skillName) {
    const job = document.getElementById("job").value;
    const skill = jobSkills[job][skillName];
    if (!skill) return;

    const currentLevel = playerSkills[skillName] || 0;
    const state = getSkillState(skillName);

    if (state === "locked" || currentLevel >= skill.maxLevel) return;

    const isQuest = skill.quest === true || skill.type === "quest";
    if (!isQuest && skillPoints <= 0) return; 

    playerSkills[skillName]++;
    if (!isQuest) skillPoints--; 

    updateSkillUI();
}

// Initial Event Listeners
document.getElementById("job")?.addEventListener("change", () => {
    playerSkills = {}; // Reset learned skills on job swap
    handleLevelChange();
});

document.getElementById("jobLevel")?.addEventListener("input", handleLevelChange);
//mao ni boy