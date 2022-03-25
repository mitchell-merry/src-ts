import fetch from "node-fetch";
import { GameCategoriesResponse, GameResponse, GameVariablesResponse, Run, RunsResponse } from "../types";

// code that i'm using to test the types

const BASE = "https://www.speedrun.com/api/v1";

const GAME = "kdkmy721"; // will you snail
const CATEGORY = "9d8lw472"; // all collectibles
const VARIABLES = [
    {
        id: "onvvwz7n",             // difficulty
        value: "zqo6235q"           // infinitely easy
    }
];

const options = {
    "game": GAME,
    "category": CATEGORY,
    "orderby": "submitted",   
    "status": "verified",
    "direction": "asc",
    "embed": "categories.variables",
};

function buildGETRequest(baseURL: string, options: Record<string, string> = {}) {
    return baseURL + "?" +  
        Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&');
}

function filterRunsByVariables(runs: Run[], variables: { id: string, value: string }[]): Run[] {
    return runs.filter(run => {
        return !variables.some(({id, value}) => {
            return run.values?.[id] !== value;
        });
    });
}

const req = buildGETRequest(`${BASE}/runs`, options);

console.log(req);
const wys = await fetch(req).then(res => res.json()) as RunsResponse;

if(wys.data) {
    // let r = buildGETRequest(`${BASE}/games/${GAME}/variables`);
    // const wys_categories = await fetch(r).then(res => res.json()) as GameVariablesResponse;
    
    // const cat_names = wys_categories.data
    //     .filter(variable => variable.category === CATEGORY)
    //     .forEach(variable => {
    //         console.log(`${variable.id}: ${variable.name}`);

    //         Object.entries(variable.values.values).forEach(value => {
    //             console.log(`\t${value[0]}: ${value[1].label}`);
    //         })
    //     });
    // console.log(cat_names);

    const wys_cat_runs = filterRunsByVariables(wys.data, VARIABLES);
    console.log(wys_cat_runs);
    
}