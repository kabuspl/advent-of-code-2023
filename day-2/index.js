import {readFile} from "fs/promises";

const input = (await readFile("input")).toString();

const cubesInBag = {
    red: 12,
    green: 13,
    blue: 14
}

let idSum = 0;
let powerSum = 0;

for(const line of input.split("\n")) {
    if(line=="") continue;
    const lineSplit = line.split(": ");
    const gameId = parseInt(lineSplit[0].split(" ")[1]);
    let impossible = false;
    const minimalcubes = {
        red: 0,
        green: 0,
        blue: 0
    }
    for(const revealedSet of lineSplit[1].split("; ")) {
        for(const cube of revealedSet.split(", ")) {
            const cubeSplit = cube.split(" ");
            const cubeCount = parseInt(cubeSplit[0]);
            const cubeColor = cubeSplit[1];
            if(cubeCount > cubesInBag[cubeColor]) impossible = true;
            if(cubeCount > minimalcubes[cubeColor]) minimalcubes[cubeColor] = cubeCount;
        }
    }
    const power = minimalcubes.red * minimalcubes.green * minimalcubes.blue;
    powerSum += power;
    if(!impossible) idSum += gameId;
}

console.log("Step 1: "+idSum);
console.log("Step 2: "+powerSum);
