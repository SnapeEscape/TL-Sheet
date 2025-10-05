// export.js — initialize + export json
(() => {
  TL.restore();
  TL.initSheet();
  TL.renderEquip();
  TL.renderAbilities();
  TL.renderPerks();
  TL.renderFeats();

  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(TL.state, null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="token-legends-character.json";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });
})();