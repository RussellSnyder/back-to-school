const padding = 5;
const glidingThreshold = 50;


function convertToBinary(input) {
    let binaryArray = input.map(line => {
        let charArray = line.split('');

        // pad left and right with blanks
        for (let i = 0; i < padding; i++) {
            charArray.push(".");
            charArray.unshift(".");
        }

        return charArray.map(char => {
            if (char === "#") {
                return 1
            } else if(char === ".") {
                return 0
            }
            // TODO make a better way
            // remove nulls and undefined
        }).filter(n => typeof n === "number");
    });
    return binaryArray;
}

function getAdjecentNumberFilling(line, currentIndex, desiredIndex) {
    if (currentIndex + desiredIndex < 0 || (currentIndex + desiredIndex) > line.length - 1) {
        return 0
    } else {
        return line[currentIndex + desiredIndex]
    }
}

function determineNextLine(currentLine) {
    return currentLine.map((entry, i) => {
        let totalToLeft = getAdjecentNumberFilling(currentLine, i, -1) + getAdjecentNumberFilling(currentLine, i, -2)
        let totalToRight = getAdjecentNumberFilling(currentLine, i, 1) + getAdjecentNumberFilling(currentLine, i, 2)
        let totalAdjacent = totalToLeft + totalToRight;

        if (entry === 0) {
            // Rule #1, the square above is blank:
            // If there are 2 or 3 filled squares in total next to it
            // (taking into account 4 squares, 2 on each sides) it will be filled.
            // If not, it will be left blank.
            return Number(totalAdjacent == 2 || totalAdjacent == 3)
        } else if (entry === 1) {
            // Rule #2, the square above is filled:
            // If there are 2 or 4 squares filled in total next to it
            // (taking into account 4 squares, 2 on each sides) it will be filled.
            // If not, it will be left blank.
            return Number(totalAdjacent == 2 || totalAdjacent == 4)
        }
    })
}

function arraysEqual(arr1, arr2) {

    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function checkArrayAgainstArrayOfArrays(arrayToCheck, arrayOfArrays) {
    let isSameAsAnotherArray = false;
    arrayOfArrays.map(array => {
      if (arraysEqual(array, arrayToCheck)) {
          isSameAsAnotherArray = true;
      }
    })
    return isSameAsAnotherArray;
}

function isGlidingPattern(sequence) {
    // console.log(sequence.name);
    // can glide left or right
    // Sometimes only part of the sequence is gliding....

    let seqLength = sequence.iterations[0].length;
    let chunkLength = Math.max(Math.ceil(seqLength / 10), 6);
    let numOfChunks = seqLength - chunkLength;

    let numberSequencesToCompare = 10;
    let chunkedSequences = [Array.from(new Array(numberSequencesToCompare), () => [])];

    // cut the first 10 sequence into chunks in order to compare
    for (let i = 0; i < numberSequencesToCompare; i++) {
        let chunks = Array.from(new Array(numOfChunks), () => []);
        for (let j = 0; j < numOfChunks; j++) {
            chunks[j] = sequence.iterations[i].slice(j, j + chunkLength);
        }
        chunkedSequences[i] = chunks;
    }

    let glidingLeftCount = 0;
    let glidingRightCount = 0;

    for (let i = 0; i < numberSequencesToCompare; i++) {
        chunkedSequences[i].forEach((chunk, j) => {
            for (let k = 1; k < numberSequencesToCompare; k++) {
                let nextLinesLeftChunk = chunkedSequences[i][j - k]
                let nextLinesRightChunk = chunkedSequences[i][j + k];

            // console.log(chunk, chunkedSequences[1][i - 1]);
                if (nextLinesLeftChunk && nextLinesLeftChunk.reduce((sum, entry) => sum + entry) < 1 && arraysEqual(chunk, nextLinesLeftChunk)) {
                    glidingLeftCount++;
                }
                if (nextLinesRightChunk && nextLinesRightChunk.reduce((sum, entry) => sum + entry) < 1 && arraysEqual(chunk, nextLinesRightChunk)) {
                    glidingRightCount++;
                }
            }
        })

    }

    // console.log(glidingLeftCount, glidingRightCount);
    return (glidingLeftCount + glidingRightCount) > glidingThreshold * numberSequencesToCompare;
}

function isBlinkingPattern(sequence) {
    let lastSequence = sequence.iterations[sequence.iterations.length - 1]
    return lastSequence.reduce((sum, entry) => sum + entry) > 0
        && checkArrayAgainstArrayOfArrays(lastSequence, sequence.iterations.slice(0, sequence.iterations.length - 2))
}
function determineSequenceTypes(sequence) {
    let sequenceTypes = [];

    let lastSequence = sequence.iterations[sequence.iterations.length - 1];

    if (isGlidingPattern(sequence)) {
        sequenceTypes.push('Gliding')
    }
    if (isBlinkingPattern(sequence)) {
        sequenceTypes.push('Blinking')
    }

    if (lastSequence.reduce((sum, entry) => sum + entry) < 1) {
        // can't be blinking and vanish
        sequenceTypes.push('Vanishing')
    }
    if (sequenceTypes.length < 1) {
        sequenceTypes.push("other");
    }

    return sequenceTypes;
}
export { convertToBinary, determineNextLine, determineSequenceTypes };