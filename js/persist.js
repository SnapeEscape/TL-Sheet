// persist.js — save/load/import/export
(() => {
  const STORAGE_KEY = "tl_full_sheet_v1";
  TL.persist = function(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(TL.state)); };
  TL.restore = function(){
    const raw = localStorage.getItem(STORAGE_KEY); if (!raw) return;
    try { Object.assign(TL.state, JSON.parse(raw)); } catch(e){ console.warn("restore failed", e); }
  };

  // Bind global buttons
  document.getElementById("saveBtn").addEventListener("click", () => { TL.persist(); alert("Saved to this browser"); });
  document.getElementById("loadBtn").addEventListener("click", () => {
    TL.restore(); TL.initSheet(); TL.renderEquip(); TL.renderAbilities(); TL.renderPerks(); TL.renderFeats();
    alert("Loaded from this browser");
  });

  document.getElementById("importBtn").addEventListener("click", () => document.getElementById("importFile").click());
  document.getElementById("importFile").addEventListener("change", (e) => {
    const f = e.target.files[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        Object.assign(TL.state, data);
        TL.initSheet(); TL.renderEquip(); TL.renderAbilities(); TL.renderPerks(); TL.renderFeats();
        TL.persist();
        alert("Imported character file.");
      } catch (err) {
        alert("Import failed: " + err.message);
      }
    };
    reader.readAsText(f); e.target.value = "";
  });
})();