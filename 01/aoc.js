/* handy dandies */
const numSort = (a,b)=>a-b
const sumAll = (acc,next)=>acc+next

// filter: new list, with items for which lambda(item) == true
// reduce: iterate through list with lambda(acc,next). return is stored in acc
//         NOTE, acc is preloaded with first element, unless second argument given to reduce
// map: new list, with items that are lambda(item)

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/////////////

// I wrote the above after the challenge

/* get a list of numbers where 2 sum to 2020. what is their product? */

function main() {
	let output
	let input = getIn()

	let numbers = input.split("\n").map(Number).sort((a,b)=>a-b)
	// probably didn't need to sort them.
	console.log(numbers)
	
	n1 =numbers.filter(n=>numbers.includes(2020-n))
	console.log(n1)

	output = n1[0] * n1[1]
	displayOut(1, output)
}

/* same list, but 3 numbers sum to 2020. what is their product? */

function main2() {
	let output
	let input = getIn()

	let numbers = input.split("\n").map(Number).sort((a,b)=>a-b)
	
	for (x of numbers) {
		let n2 = numbers.filter(n=>numbers.includes(2020-n-x))
		if (n2.length == 2) {
			console.log(n2)
			output = x * n2[0] * n2[1]
			break
		}
	}
	// for each number, see if there's two that sum to 2020-number. then we're done

	displayOut(2, output)
}
