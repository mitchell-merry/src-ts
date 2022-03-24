import fetch from "node-fetch";
import * as SRC from "../types/src-api";

const BASE = "https://www.speedrun.com/api/v1";

const GAME = "kdkmy721"; // will you snail

const req = `${BASE}/games/${GAME}?embed=categories.variables,levels`;

console.log(req);
const WillYouSnail = await fetch(req).then(res => res.json())
    .then(res => (res as SRC.GameResponse).data);

// Use response as you normally would, except with TS linting
if(WillYouSnail.categories) {
    WillYouSnail.categories.data.filter(category => category.type === "per-game")
    .forEach(category => {
        console.log(category.name)
        
        if(!category.variables) return;
        
        category.variables.data.forEach(variable => {
            console.log(`\t${variable.name} - Default: ${variable.values.default}`);

            Object.entries(variable.values.values).forEach(([id, name]) => {
                console.log(`\t\t${id}: ${name.label}`);
            });
        });
    });
}

if(WillYouSnail.levels) {
    WillYouSnail.levels.data.forEach(level => {
        console.log(level.name)
    });
}