import {readFile} from "fs/promises";

const input = (await readFile("input")).toString();

const NUMBERS = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

const replacedLines = [];

// This code is unreadable shit but it works
for(const line of input.split("\n")) {
    if(line == "") continue;
    let newLine = line;
    let buffer = "";
    const lineChars = line.split("");
    for(let i = 0; i < lineChars.length; i++) {
        const char = lineChars[i];
        const matches = Object.keys(NUMBERS).filter(v=>v.startsWith(buffer + char));
        const matchesOneNextChar = Object.keys(NUMBERS).filter(v=>v.startsWith(buffer + char + (lineChars[parseInt(i)+1]||"")));
        buffer += char;
        if(matches.length==1 && Object.keys(NUMBERS).includes(buffer)) {
            newLine = newLine.replace(buffer, NUMBERS[buffer]);
            buffer = "";
        } else if (matches.length!=0 && matchesOneNextChar.length == 0) {
            buffer = char;
            i--;
        } else if (matches.length == 0) {
            buffer = char;
        }
    }

    const lineWithoutChars = newLine.replace(/\D/g,""); // Remove all chars that are not numbers
    replacedLines.push(parseInt(lineWithoutChars.at(0) + lineWithoutChars.at(-1))); // Parse first and last char as int and push to array
}

const sum = replacedLines.reduce((prev, curr)=>prev+curr);

console.log(sum);
