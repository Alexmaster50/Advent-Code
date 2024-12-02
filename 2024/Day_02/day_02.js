const fs = require("fs");

async function main() {
	// Takes the input, and splits each line into an array entry
	const lines = (await fs.promises.readFile("input.txt", "utf-8")).split("\n");

	console.log("Part 1 result:", partOne(lines));
	console.log("Part 2 result:", partTwo(lines));

	//console.log("\n\n---- TESTING ENDED ---- \n\n")
}

function partOne(input) {
	let safeReportAmount = 0;
	let arrayLines = [];
	let previousNumber = 0;
	let currentNumber = 0;
	let numbericDifference = 0;
	let lastChangeDirection = 0;
	let thisChangeDirection = 0;
	let levelDifference = 0;



	//console.log("\n\n---- PART ONE -- TESTING BEGIN ---- \n\n")

	//console.log("input amount: ", input.length, "\n\n")

	for (let i = 0; i < input.length; i++) {
		const currentLine = input[i].split(" ").map(Number);
		arrayLines.push(currentLine)
		//console.log(arrayLines)

		previousNumber = 0;
		currentNumber = 0;
		numbericDifference = 0;
		lastChangeDirection = 0;
		thisChangeDirection = 0;
		levelDifference = 0;

		for (let j = 0; j < currentLine.length; j++) {
			if (j == 0) {
				previousNumber = arrayLines[i][j]
				//console.log("j - ", j, " - ", previousNumber)
				lastChangeDirection = 0
				thisChangeDirection = 0
			} else {
				currentNumber = arrayLines[i][j]
				previousNumber = arrayLines[i][j - 1]
				lastChangeDirection = thisChangeDirection

				levelDifference = Math.abs(currentNumber - previousNumber);
				//console.log("j - ", j, " - ", currentNumber, " - ", levelDifference)

				numbericDifference = -previousNumber + currentNumber;


				if (numbericDifference > 3) {
					//console.log("UNSAFE - Changed too much");
					break;
				}
				else if (numbericDifference > 0) {
					//console.log("Safe? Increased");
					thisChangeDirection = 1;
				}
				else if (numbericDifference == 0) {
					//console.log("UNSAFE - unchanged");
					break;
				}
				else if (numbericDifference < -3) {
					//console.log("UNSAFE - Changed too much");
					break;
				}
				else if (numbericDifference < 0) {
					//console.log("Safe? Decresed");
					thisChangeDirection = -1;
				}

				if ((lastChangeDirection + thisChangeDirection) == 0) {
					//console.log("UNSAFE - direction changed");
					break;
				}

			}

			if (j == (currentLine.length - 1)) {
				safeReportAmount++;
			}
		}

		//console.log(i, " -> ", currentLine, "\n\n")
	}


	return safeReportAmount;
}

function partTwo(input) {
	let safeReportAmount = 0;
	let arrayLines = [];
	let previousNumber = 0;
	let currentNumber = 0;
	let numbericDifference = 0;
	let lastChangeDirection = 0;
	let thisChangeDirection = 0;
	let levelDifference = 0;

	let reattempt = 0;
	let reattemptOccured = 0;
	let savingNumber = 0;

	let redosOccured = 0;
	let goodRedoAttempts = 0;

	let listGoodRedos = [];



	//console.log("\n\n---- PART TWO -- TESTING BEGIN ---- \n\n")

	//console.log("input amount: ", input.length, "\n\n")

	for (let i = 0; i < input.length; i++) {
		const currentLine = input[i].split(" ").map(Number);
		arrayLines.push(currentLine)
		//console.log(arrayLines)

		previousNumber = 0;
		currentNumber = 0;
		numbericDifference = 0;
		lastChangeDirection = 0;
		thisChangeDirection = 0;
		levelDifference = 0;





		reattempt = 0;
		reattemptOccured = 0;
		savingNumber = 0;

		for (let j = 0; j < currentLine.length; j++) {
			if (j == 0) {
				previousNumber = arrayLines[i][j]
				//console.log("j - ", j, " - ", previousNumber)
				lastChangeDirection = 0
				thisChangeDirection = 0


			} else {

				currentNumber = arrayLines[i][j]
				previousNumber = arrayLines[i][j - 1]
				lastChangeDirection = thisChangeDirection

				levelDifference = Math.abs(currentNumber - previousNumber);

				/*
				if(reattemptOccured == 1){
					console.log("j - ", j, " - ", currentNumber, " - ", levelDifference)
				}
				*/

				numbericDifference = -previousNumber + currentNumber;


				if (numbericDifference > 3) {
					//console.log("UNSAFE - Changed too much");
					reattempt = 1;
				}
				else if (numbericDifference > 0) {
					//console.log("Safe? Increased");
					thisChangeDirection = 1;
				}
				else if (numbericDifference == 0) {
					//console.log("UNSAFE - unchanged");
					reattempt = 1;
				}
				else if (numbericDifference < -3) {
					//console.log("UNSAFE - Changed too much");
					reattempt = 1;
				}
				else if (numbericDifference < 0) {
					//console.log("Safe? Decresed");
					thisChangeDirection = -1;
				}



				if ((lastChangeDirection + thisChangeDirection) == 0) {
					//console.log("UNSAFE - direction changed"); 
					reattempt = 1;
				}

				if (reattempt == 1 && reattemptOccured == 0) {
					//console.log("1st fail at:",currentLine[j])
					//console.log("pre-splice:", currentLine)
					savingNumber = currentLine[j]
					currentLine.splice(j, 1)
					//console.log("post-splice:", currentLine)
					j = -1;
					reattempt = 0;
					reattemptOccured++;
					//console.log("redo triggered\n\n")
					redosOccured++;
				}
				else if (reattempt == 1 && reattemptOccured == 1) {
					//console.log("2nd fail at:",currentLine[j])
					//console.log("pre-splice:", currentLine)
					currentLine.splice(j - 1, 1, savingNumber)
					//console.log("post-splice:", currentLine)
					j = -1;
					reattempt = 0;
					reattemptOccured++;
					//console.log("redo TWO\n\n")
					redosOccured++;
				}
				else if (reattempt == 1 && reattemptOccured == 2) {
					//console.log("breaking")
					break;
				}



			}

			if ((j == (currentLine.length - 1)) && reattemptOccured >= 1) {
				goodRedoAttempts++;
				//console.log("good redo")
			}

			if (j == (currentLine.length - 1)) {
				safeReportAmount++;
				//console.log("safety incremented")
			}
		}

		//console.log(i, " -> ", currentLine, "\n\n")
		//console.log("------------------\n")

	}

	return [safeReportAmount, goodRedoAttempts];
}

main();
