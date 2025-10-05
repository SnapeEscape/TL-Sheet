// calcs.js — TL-specific derived stats
(() => {
  const $ = (s,el=document)=>el.querySelector(s);
  const $$ = (s,el=document)=>Array.from(el.querySelectorAll(s));

  const setText = (id, val) => { const el = $(id); if (el) el.textContent = val; };

  function recalcAttributes() {
    const A = TL.state.attributes;
    ["STR","DEX","CON","MND","SMA","CHA"].forEach(stat => {
      const el = $("#"+stat);
      A[stat] = parseInt(el.value||10,10);
      $("#"+stat+"_mod").textContent = TL.scoreToMod(A[stat]);
    });

    // Movement: +5 ft per 5 DEX
    const dex = A.DEX;
    const move = 0 + Math.floor(dex / 5) * 5;
    TL.state.overview.move = move;
    $("#move").value = move;

    // Crit multiplier: base 100% + 5% per 1 SMA
    const critMult = 100 + (A.SMA * 5);
    TL.state.overview.critMult = critMult;
    $("#critMult").value = critMult;

    // Ability slots: +1 per 2 MND
    const slots = Math.floor(A.MND / 2);
    TL.state.overview.abilitySlots = slots;
    $("#abilitySlots").value = slots;

    // Initiative = CHA modifier (CHM/CHA mapping)
    const init = TL.scoreToMod(A.CHA);
    TL.state.identity.initiative = init;
    $("#initiative").value = init;
  }

  // Magic Circles: start Circle 1 at 1 point, then +1 per 2 points, cap 10
  function recalcCircles() {
    TL.SKILLS_MAGIC.forEach(k => {
      const ptsEl = document.querySelector(`.magicPts[data-magic="${k}"]`);
      const circleEl = document.querySelector(`.circle[data-magic="${k}"]`);
      const pts = parseInt(ptsEl.value||0,10);
      let circle = 0;
      if (pts > 0) circle = 1 + Math.floor((pts - 1)/2);
      if (circle > 10) circle = 10;
      TL.state.magic[k].points = pts;
      TL.state.magic[k].circle = circle;
      circleEl.value = circle;
    });
  }

  // Combat skill -> acc mod; single-pick logic
  function wireCombat() {
    TL.SKILLS_COMBAT.forEach(k => {
      const ptsEl = document.querySelector(`.points[data-skill="${k}"]`);
      const modEl = document.querySelector(`.accMod[data-skill="${k}"]`);
      const cb = document.querySelector(`.accPick[data-skill="${k}"]`);
      const update = () => {
        const pts = parseInt(ptsEl.value||0,10);
        const mod = TL.pointsToAccMod(pts);
        TL.state.combat[k].points = pts;
        TL.state.combat[k].accMod = mod;
        modEl.value = mod;
        if (TL.state.combat[k].useForAcc) {
          TL.state.overview.baseAccuracy = mod;
          $("#baseAccuracy").value = mod;
        }
      };
      ptsEl.addEventListener("input", () => { update(); TL.persist(); });
      cb.addEventListener("change", () => {
        if (cb.checked) {
          // uncheck others
          document.querySelectorAll(".accPick").forEach(x => { if (x!==cb) x.checked=false; });
          TL.SKILLS_COMBAT.forEach(s => TL.state.combat[s].useForAcc = (s===k));
          TL.state.overview.baseAccuracy = TL.state.combat[k].accMod;
          $("#baseAccuracy").value = TL.state.overview.baseAccuracy;
        } else {
          TL.state.combat[k].useForAcc = false;
          TL.state.overview.baseAccuracy = 0;
          $("#baseAccuracy").value = 0;
        }
        TL.persist();
      });
      update();
    });
  }

  function bindAttributesInputs() {
    ["STR","DEX","CON","MND","SMA","CHA"].forEach(stat => {
      document.getElementById(stat).addEventListener("input", () => { recalcAttributes(); TL.persist(); });
    });
  }

  function bindMagicInputs() {
    TL.SKILLS_MAGIC.forEach(k => {
      document.querySelector(`.magicPts[data-magic="${k}"]`).addEventListener("input", () => { recalcCircles(); TL.persist(); });
    });
  }

  function initFromState() {
    // Identity
    ["name","race","clazz","level"].forEach(id => {
      const el = document.getElementById(id);
      if (id==="level") el.value = TL.state.identity.level;
      else el.value = TL.state.identity[id] || "";
    });
    // Attributes
    Object.entries(TL.state.attributes).forEach(([k,v]) => { document.getElementById(k).value = v; });
    // Combat
    TL.SKILLS_COMBAT.forEach(k => {
      document.querySelector(`.points[data-skill="${k}"]`).value = TL.state.combat[k].points;
      document.querySelector(`.accMod[data-skill="${k}"]`).value = TL.state.combat[k].accMod;
      document.querySelector(`.accPick[data-skill="${k}"]`).checked = !!TL.state.combat[k].useForAcc;
    });
    // Magic
    TL.SKILLS_MAGIC.forEach(k => {
      document.querySelector(`.magicPts[data-magic="${k}"]`).value = TL.state.magic[k].points;
    });
    // Civil
    TL.SKILLS_CIVIL.forEach(k => {
      document.querySelector(`.civilPts[data-civil="${k}"]`).value = TL.state.civil[k].points;
    });
    // Overview
    document.getElementById("baseAccuracy").value = TL.state.overview.baseAccuracy;
    document.getElementById("move").value = TL.state.overview.move;
    document.getElementById("critMult").value = TL.state.overview.critMult;
    document.getElementById("abilitySlots").value = TL.state.overview.abilitySlots;
    document.getElementById("initiative").value = TL.state.identity.initiative;

    // Equip / carry
    document.getElementById("carryUsed").value = TL.state.carry.used;
    document.getElementById("carryMax").value = TL.state.carry.max;

    // Resources
    document.getElementById("tokens").value = TL.state.resources.tokens;
    document.getElementById("overflow").value = TL.state.resources.overflow;
    document.getElementById("PA").value = TL.state.resources.PA;
    document.getElementById("PAMit").value = TL.state.resources.PAMit;
    document.getElementById("MS").value = TL.state.resources.MS;
    document.getElementById("MShits").value = TL.state.resources.MShits;

    // Notes
    document.getElementById("notes").value = TL.state.notes;

    // Recalc
    recalcAttributes();
    recalcCircles();
  }

  function bindIdentity() {
    const ids = ["name","race","clazz","level"];
    ids.forEach(id => {
      document.getElementById(id).addEventListener("input", () => {
        if (id==="level") TL.state.identity.level = parseInt(document.getElementById(id).value||1,10);
        else TL.state.identity[id] = document.getElementById(id).value.trim();
        TL.persist();
      });
    });
  }

  function bindCivil() {
    TL.SKILLS_CIVIL.forEach(k => {
      document.querySelector(`.civilPts[data-civil="${k}"]`).addEventListener("input", (e) => {
        TL.state.civil[k].points = parseInt(e.target.value||0,10);
        TL.persist();
      });
    });
  }

  function bindResources() {
    ["tokens","overflow","PA","PAMit","MS","MShits"].forEach(id => {
      document.getElementById(id).addEventListener("input", e => {
        TL.state.resources[id] = parseInt(e.target.value||0,10);
        TL.persist();
      });
    });
    ["carryUsed","carryMax"].forEach(id => {
      document.getElementById(id).addEventListener("input", e => {
        TL.state.carry[id.replace("carry","").toLowerCase()] = parseInt(e.target.value||0,10);
        TL.persist();
      });
    });
    document.getElementById("notes").addEventListener("input", e => {
      TL.state.notes = e.target.value;
      TL.persist();
    });
  }

  TL.initSheet = function initSheet(){
    initFromState();
    bindIdentity();
    bindAttributesInputs();
    bindMagicInputs();
    wireCombat();
    bindCivil();
    bindResources();
  };

})();