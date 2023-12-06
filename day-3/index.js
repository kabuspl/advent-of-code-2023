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

const serialNumbers = [];

for(let x = 0; x < engineSchematic.length; x++) {
    let isCurrentNumberSerial = false;
    let currentNumber = "";
    for(let y = 0; y < engineSchematic[x].length; y++) {
        if(!/^\d$/.test(engineSchematic[x][y])) {
            if(currentNumber!="" && isCurrentNumberSerial) serialNumbers.push(parseInt(currentNumber));
            currentNumber = "";
            isCurrentNumberSerial = false;
            continue;
        }

        currentNumber += engineSchematic[x][y];

        let isSerialNumber = false;

        // y=-1 x=-1,0,1
        if(x > 0 && y > 0 && !isNumberOrDot(engineSchematic[x-1][y-1])) isSerialNumber = true;
        if(y > 0 && !isNumberOrDot(engineSchematic[x][y-1])) isSerialNumber = true;
        if(x < engineSchematic.length-1 && y > 0 && !isNumberOrDot(engineSchematic[x+1][y-1])) isSerialNumber = true;

        // y=0 x=-1,1
        if(x > 0 && !isNumberOrDot(engineSchematic[x-1][y])) isSerialNumber = true;
        if(x < engineSchematic.length-1 && !isNumberOrDot(engineSchematic[x+1][y])) isSerialNumber = true;

        // y=1 x=-1,0,1
        if(x > 0 && y < engineSchematic[x].length-1 && !isNumberOrDot(engineSchematic[x-1][y+1])) isSerialNumber = true;
        if(y < engineSchematic[x].length-1 && !isNumberOrDot(engineSchematic[x][y+1])) isSerialNumber = true;
        if(x < engineSchematic.length-1 && y < engineSchematic[x].length-1 && !isNumberOrDot(engineSchematic[x+1][y+1])) isSerialNumber = true;

        isCurrentNumberSerial = isCurrentNumberSerial || isSerialNumber;
    }
    if(currentNumber!="" && isCurrentNumberSerial) serialNumbers.push(parseInt(currentNumber));
    currentNumber = "";
    isCurrentNumberSerial = false;
}

const sum = serialNumbers.reduce((prev, curr)=>prev+curr);

console.log(sum);
