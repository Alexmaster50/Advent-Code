const fs = require("fs");

async function main() {
	// Takes the input, and splits each line into an array entry
	const lines = (await fs.promises.readFile("input.txt", "utf-8")).split("\n");
	console.log("Part 1 result:", partOne(lines));
	console.log("Part 2 result:", partTwo(lines));
}

function partOne(input) {
	let listLeft = [];
	let listRight = [];
	let totalDifference = 0;

	// Take the input file's individual lines,
	// Split the two values, then push them into two seperate arrays
	for (let i = 0; i < input.length; i++) {
		const [leftNum, rightNum] = input[i].split("   ").map(Number);
		listLeft.push(leftNum);
		listRight.push(rightNum);
	}

	// Sort the arrays from smallest to largest
	listLeft.sort((a, b) => a - b);
	listRight.sort((a, b) => a - b);

	// Calculate the total difference between the left and right tlists
	for (let i = 0; i < listLeft.length; i++) {
		totalDifference += Math.abs(listLeft[i] - listRight[i]);
	}

	return totalDifference;
}

function partTwo(input) {
	let listLeft = [];
	let listRight = [];
	let similarityScore = 0;

	// Take the input file's individual lines,
	// Split the two values, then push them into two seperate arrays
	for (let i = 0; i < input.length; i++) {
		const [leftNum, rightNum] = input[i].split("   ").map(Number);
		listLeft.push(leftNum);
		listRight.push(rightNum);
	}

	// Calculates the similarity score,
	// by counting appearances of the left list's numbers in the right list
	for (let i = 0; i < input.length; i++) {
		let appearances = 0;
		for (let j = 0; j < input.length; j++) {
			if (listLeft[i] === listRight[j]) {
				appearances++;
			}
		}
		similarityScore += listLeft[i] * appearances;
	}
	return similarityScore;
}

main();
