// sections.js — lists: equipment, abilities, perks, feats
(() => {
  const $ = (s,el=document)=>el.querySelector(s);
  const mkRow = (children=[]) => {
    const row = document.createElement("div"); row.className = "row";
    children.forEach(ch => row.appendChild(ch));
    return row;
  };

  // Equipment
  function renderEquip(){
    const host = $("#equipList"); host.innerHTML = "";
    TL.state.equipment.forEach((name, idx) => {
      const nameIn = document.createElement("input"); nameIn.type="text"; nameIn.value=name; nameIn.readOnly=true; nameIn.style.flex="1";
      const rm = document.createElement("button"); rm.className="btn"; rm.textContent="Remove";
      rm.addEventListener("click", () => { TL.state.equipment.splice(idx,1); renderEquip(); TL.persist(); });
      host.appendChild(mkRow([nameIn, rm]));
    });
  }
  $("#addEquip").addEventListener("click", () => {
    const name = $("#equipName").value.trim(); if (!name) return;
    if (!TL.state.equipment.includes(name)) {
      TL.state.equipment.push(name); $("#equipName").value="";
      renderEquip(); TL.persist();
    }
  });

  // Abilities
  function renderAbilities(){
    const host = $("#abilityList"); host.innerHTML = "";
    TL.state.abilities.forEach((ab, idx) => {
      const row = document.createElement("div"); row.className="card";
      row.innerHTML = `<strong>${ab.name}</strong> — <em>${ab.line}</em> — Circle ${ab.circle} — ${ab.casting} — ${ab.tokens} Token(s), CD ${ab.cooldown}<br>${ab.desc}`;
      const bar = document.createElement("div"); bar.className="row";
      const edit = document.createElement("button"); edit.className="btn"; edit.textContent="Edit";
      const rm = document.createElement("button"); rm.className="btn"; rm.textContent="Remove";
      edit.addEventListener("click", () => {
        $("#abName").value = ab.name; $("#abLine").value = ab.line; $("#abCircle").value = ab.circle;
        $("#abCast").value = ab.casting; $("#abTokens").value = ab.tokens; $("#abCooldown").value = ab.cooldown; $("#abDesc").value = ab.desc;
      });
      rm.addEventListener("click", () => { TL.state.abilities.splice(idx,1); renderAbilities(); TL.persist(); });
      bar.appendChild(edit); bar.appendChild(rm); row.appendChild(bar);
      host.appendChild(row);
    });
  }
  $("#addAbility").addEventListener("click", () => {
    const ab = {
      name: $("#abName").value.trim(),
      line: $("#abLine").value.trim(),
      circle: parseInt($("#abCircle").value||0,10),
      casting: $("#abCast").value.trim(),
      tokens: parseInt($("#abTokens").value||0,10),
      cooldown: parseInt($("#abCooldown").value||0,10),
      desc: $("#abDesc").value.trim()
    };
    if (!ab.name) return;
    const i = TL.state.abilities.findIndex(x => x.name.toLowerCase()===ab.name.toLowerCase());
    if (i>=0) TL.state.abilities[i] = ab; else TL.state.abilities.push(ab);
    ["abName","abLine","abCircle","abCast","abTokens","abCooldown","abDesc"].forEach(id => document.getElementById(id).value = id==="abTokens"||id==="abCooldown"||id==="abCircle" ? 0 : "");
    renderAbilities(); TL.persist();
  });
  $("#clearAbilities").addEventListener("click", () => { TL.state.abilities = []; renderAbilities(); TL.persist(); });

  // Perks
  function renderPerks(){
    const host = $("#perkList"); host.innerHTML = "";
    TL.state.perks.forEach((pk, idx) => {
      const row = document.createElement("div"); row.className="card";
      row.innerHTML = `<strong>${pk.name}</strong> — Tier ${pk.tier} — <em>${pk.cat}</em><br>${pk.desc}`;
      const bar = document.createElement("div"); bar.className="row";
      const edit = document.createElement("button"); edit.className="btn"; edit.textContent="Edit";
      const rm = document.createElement("button"); rm.className="btn"; rm.textContent="Remove";
      edit.addEventListener("click", () => {
        $("#perkName").value = pk.name; $("#perkTier").value = pk.tier; $("#perkCat").value = pk.cat; $("#perkDesc").value = pk.desc;
      });
      rm.addEventListener("click", () => { TL.state.perks.splice(idx,1); renderPerks(); TL.persist(); });
      bar.appendChild(edit); bar.appendChild(rm); row.appendChild(bar);
      host.appendChild(row);
    });
  }
  $("#addPerk").addEventListener("click", () => {
    const pk = {
      name: $("#perkName").value.trim(),
      tier: parseInt($("#perkTier").value||1,10),
      cat: $("#perkCat").value.trim(),
      desc: $("#perkDesc").value.trim()
    };
    if (!pk.name) return;
    const i = TL.state.perks.findIndex(x => x.name.toLowerCase()===pk.name.toLowerCase());
    if (i>=0) TL.state.perks[i] = pk; else TL.state.perks.push(pk);
    ["perkName","perkTier","perkCat","perkDesc"].forEach(id => document.getElementById(id).value = id==="perkTier" ? 1 : "");
    renderPerks(); TL.persist();
  });
  $("#clearPerks").addEventListener("click", () => { TL.state.perks = []; renderPerks(); TL.persist(); });

  // Feats
  function renderFeats(){
    const host = $("#featList"); host.innerHTML = "";
    TL.state.feats.forEach((ft, idx) => {
      const row = document.createElement("div"); row.className="card";
      row.innerHTML = `<strong>${ft.name}</strong> — Level ${ft.level}<br>${ft.desc}`;
      const bar = document.createElement("div"); bar.className="row";
      const edit = document.createElement("button"); edit.className="btn"; edit.textContent="Edit";
      const rm = document.createElement("button"); rm.className="btn"; rm.textContent="Remove";
      edit.addEventListener("click", () => {
        $("#featName").value = ft.name; $("#featLevel").value = ft.level; $("#featDesc").value = ft.desc;
      });
      rm.addEventListener("click", () => { TL.state.feats.splice(idx,1); renderFeats(); TL.persist(); });
      bar.appendChild(edit); bar.appendChild(rm); row.appendChild(bar);
      host.appendChild(row);
    });
  }
  $("#addFeat").addEventListener("click", () => {
    const ft = {
      name: $("#featName").value.trim(),
      level: parseInt($("#featLevel").value||1,10),
      desc: $("#featDesc").value.trim()
    };
    if (!ft.name) return;
    const i = TL.state.feats.findIndex(x => x.name.toLowerCase()===ft.name.toLowerCase());
    if (i>=0) TL.state.feats[i] = ft; else TL.state.feats.push(ft);
    ["featName","featLevel","featDesc"].forEach(id => document.getElementById(id).value = id==="featLevel" ? 1 : "");
    renderFeats(); TL.persist();
  });
  $("#clearFeats").addEventListener("click", () => { TL.state.feats = []; renderFeats(); TL.persist(); });

  TL.renderEquip = renderEquip;
  TL.renderAbilities = renderAbilities;
  TL.renderPerks = renderPerks;
  TL.renderFeats = renderFeats;
})();