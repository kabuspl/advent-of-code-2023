import {readFile} from "fs/promises";

const input = (await readFile("input")).toString();

const engineSchematic = [];

for(const line of input.split("\n")) {
    if(line == "") continue;
    engineSchematic.push([]);
    for(const char of line.split("")) {
        engineSchematic.at(-1).push(char);
    }
}

function isNumberOrDot(char) {
    return /^(\d|\.)$/.test(char);
}

function isGear(char) {
    return /^\*$/.test(char);
}

function checkNeighbors(arr, x, y, verifyFunction) {
    const foundNeighbors = [];

    // y=-1 x=-1,0,1
    if(x > 0 && y > 0 && verifyFunction(arr[x-1][y-1])) foundNeighbors.push({x: x-1, y: y-1});
    if(y > 0 && verifyFunction(arr[x][y-1])) foundNeighbors.push({x: x, y: y-1});
    if(x < arr.length-1 && y > 0 && verifyFunction(arr[x+1][y-1])) foundNeighbors.push({x: x+1, y: y-1});

    // y=0 x=-1,1
    if(x > 0 && verifyFunction(arr[x-1][y])) foundNeighbors.push({x: x-1, y: y});
    if(x < arr.length-1 && verifyFunction(arr[x+1][y])) foundNeighbors.push({x: x+1, y: y});

    // y=1 x=-1,0,1
    if(x > 0 && y < arr[x].length-1 && verifyFunction(arr[x-1][y+1])) foundNeighbors.push({x: x-1, y: y+1});
    if(y < arr[x].length-1 && verifyFunction(arr[x][y+1])) foundNeighbors.push({x: x, y: y+1});
    if(x < arr.length-1 && y < arr[x].length-1 && verifyFunction(arr[x+1][y+1])) foundNeighbors.push({x: x+1, y: y+1});

    return foundNeighbors;
}

function pushSerialsAndGears(currentNumber, isCurrentNumberSerial, gearConnectionQueue) {
    if(currentNumber!="" && isCurrentNumberSerial) {
        serialNumbers.push(parseInt(currentNumber));
        for(const gear of gearConnectionQueue) {
            const filteredGears = gears.filter(v=>v.x==gear.x && v.y==gear.y);
            const filteredGearsFilteredSerials = filteredGears.filter(v=>v.connectedSerials.includes(parseInt(currentNumber)));
            if(filteredGears.length==0) {
                gears.push({...gear, connectedSerials: [parseInt(currentNumber)]});
            }else if(filteredGearsFilteredSerials.length==0){
                filteredGears[0].connectedSerials.push(parseInt(currentNumber));
            }
        }
    }
}

const serialNumbers = [];
const gears = [];

for(let x = 0; x < engineSchematic.length; x++) {
    let isCurrentNumberSerial = false;
    let currentNumber = "";
    let gearConnectionQueue = [];
    for(let y = 0; y < engineSchematic[x].length; y++) {
        if(!/^\d$/.test(engineSchematic[x][y])) {
            pushSerialsAndGears(currentNumber, isCurrentNumberSerial, gearConnectionQueue);
            currentNumber = "";
            isCurrentNumberSerial = false;
            gearConnectionQueue = [];
            continue;
        }

        currentNumber += engineSchematic[x][y];

        let isSerialNumber = checkNeighbors(engineSchematic, x, y, char=>!isNumberOrDot(char)).length > 0;
        let currentGears = checkNeighbors(engineSchematic, x, y, isGear);

        for(const gear of currentGears) {

            const filteredQueuedGears = gearConnectionQueue.filter(v=>v.x==gear.x && v.y==gear.y);
            if(filteredQueuedGears.length==0) {
                gearConnectionQueue.push(gear);
            }
        }

        isCurrentNumberSerial = isCurrentNumberSerial || isSerialNumber;
    }
    pushSerialsAndGears(currentNumber, isCurrentNumberSerial, gearConnectionQueue);
    currentNumber = "";
    isCurrentNumberSerial = false;
    gearConnectionQueue = [];
}

const sum = serialNumbers.reduce((prev, curr)=>prev+curr);

console.log("Sum of serials: "+sum);

let gearRatiosSum = 0;

for(const gear of gears) {
    if(gear.connectedSerials.length==2) {
        gearRatiosSum += gear.connectedSerials[0] * gear.connectedSerials[1];
    }
}

console.log("Sum of gear ratios: "+gearRatiosSum);
