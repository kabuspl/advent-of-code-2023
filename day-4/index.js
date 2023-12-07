import {readFile} from "fs/promises";

const input = (await readFile("input")).toString();

const cards = input.split("\n");

let sum = 0;

for(const card of cards) {
    if(card == "") continue;
    const cardSplit = card.replace(/\s+/g, ' ').split(": ");
    const numbersSplit = cardSplit[1].split(" | ");
    const winningNumbers = numbersSplit[0].split(" ").map(v=>parseInt(v));
    const elfNumbers = numbersSplit[1].split(" ").map(v=>parseInt(v));

    let matches = 0;

    for(const elfNumber of elfNumbers) {
        if(winningNumbers.includes(elfNumber)) {
            matches++;
        }
    }

    let tempSum = !!matches * 1;
    for(let i=1; i<matches; i++) {
        tempSum*=2;
    }

    sum += tempSum;
}

console.log(sum);
