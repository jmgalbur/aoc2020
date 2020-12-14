/* handy dandies */
const numSort = (a,b)=>a-b
const revNumSort = (a,b)=>numSort(b,a)
const sumAll = (acc,next)=>acc+next
const mulAll = (acc,next)=>acc*next
const insideRange = (min,max)=>x=> min<=x && x <=max

// filter: new list, with items for which lambda(item,i,list) == true
// reduce: iterate through list with lambda(acc,next,i,list). return is stored in acc
//         NOTE, acc is preloaded with first element, unless second argument given to reduce
// map: new list, with items that are lambda(item)
// forEach: map, but without the return
// find: lambda(item,i,list), filter but break when we get our first true
// substring: is [), so 0,length is full string
// [...spread] == spread.slice()
// join: Array.prototype.join("between")
// match: array of (/g: all matches) (no /g: match and capture groups)
// matchAll: array of match objects/arrays. requires /g
// let clone = Object.assign({}, orig) == {...orig}
//
// Set
// Map
// stack: Array.push() Array.pop(): from end of array
// queue: Array.push() Array.shift(): put in back, take from front

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/////////

/* It's an older code, sir, but it checks out. Except for the glaring vulnerability that has its own CVE entry. What's the first number that's not a sum of two of many predecessors? */

function main() {
	let output
	let input = getIn()
	let numbers = input.split("\n").map(Number)
	let preamble_length = 25

	function isValidByPreamble(n, pre) {
		return pre.some((x,i,arr)=>
			[...arr.slice(0,i), ...arr.slice(i+1)].includes(n-x)
			// don't double count x
		)
		// there is a/some number "x" in the preamble such that there's also an "n-x" in the preamble
	}
	// I tried to do everything all in one nested arrow function, but it became impossible to parse
	// I def like having this separated out

	output = numbers.slice(preamble_length).find((x,i)=>
		!isValidByPreamble(x,numbers.slice(i,i+preamble_length))
	)
	// to be clear, the i=0 of .find() starts at the first number after the preamble (because we're iterating on the post-preamble-slice(), not on `numbers`)
	// however this `i` also corresponds nicely to the position of the corresponding "preamble" of the current number `x` we're checking!

	displayOut(1, output)
	main_1_answer = output
}

let main_1_answer
// so we only have to do that once, lol

/* DESCRIPTION HERE */

function main2() {
	let output
	let input = getIn()
	let numbers = input.split("\n").map(Number)

	let startI = 0
	let endI = 2
	// problem says at least 2 contiguous numbers. I had this at 1 and found the right answer, but that might not have worked for someone else's input. So fixed the bug
	let sum = numbers.slice(startI,endI).reduce(sumAll)
	// I realize this is expensive and wasteful for updating the sum, but it works well enough and intuitively conveys the meaning, more than `+= numbers[endI]` or whatever it would be

	while(sum != main_1_answer) {
		if (sum < main_1_answer) endI++
		else endI = 2 + (++startI)
		sum = numbers.slice(startI,endI).reduce(sumAll)
		// always make sure to update what you're while'ing on!
	}

	output = numbers.slice(startI,endI).sort(numSort)
	output = output[0]+output.slice(-1)[0]
	// .pop() would also work for the second one, but it's also destructive, so nah
	displayOut(2, output)
}
