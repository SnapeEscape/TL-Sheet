// state.js — canonical state and helpers
window.TL = window.TL || {};

TL.SKILLS_COMBAT = ["Martial","Ranged","Rogue","Tough"];
TL.SKILLS_MAGIC = ["Red","Blue","Yellow","Unnatural","Morph","Colourless","Green","Black","White"];
TL.SKILLS_CIVIL = ["Merchantry","Scholar","Tradesman","Thievery","Crafts","Artisan","Alchemy","Cook","Deduction","Performer"];

TL.state = {
  identity: { name: "", race: "", clazz: "", level: 1, initiative: 0 },
  attributes: { STR:10, DEX:10, CON:10, MND:10, SMA:10, CHA:10 },
  overview: { baseAccuracy: 0, move: 0, critMult: 100, abilitySlots: 0 },
  combat: TL.SKILLS_COMBAT.reduce((o,k)=> (o[k]={points:0,accMod:0,useForAcc:false}, o), {}),
  magic: TL.SKILLS_MAGIC.reduce((o,k)=> (o[k]={points:0,circle:0}, o), {}),
  civil: TL.SKILLS_CIVIL.reduce((o,k)=> (o[k]={points:0}, o), {}),
  abilities: [],
  equipment: [],
  carry: { used:0, max:10 },
  perks: [],
  feats: [],
  resources: { tokens:3, overflow:0, PA:0, PAMit:0, MS:0, MShits:0 },
  notes: ""
};

TL.pointsToAccMod = (pts) => Math.floor((+pts||0) / 2);
TL.scoreToMod = (score) => Math.floor(((+score||0) - 10) / 2);
