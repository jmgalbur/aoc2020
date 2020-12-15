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

/* DESCRIPTION HERE */

function main() {
	let output
	let input = getIn()
	let starts = input.split(",").map(Number)

	let lastTurns = new Map()
	let curT = 1
	let nextNumber
	let lastSpokeN = NaN

	function speak(n) {
		if (n == undefined) n = nextNumber
		let prev = lastTurns.get(n)
		if (prev == undefined) {
			nextNumber = 0
		} else {
			nextNumber = curT-prev
		}
		lastTurns.set(n, curT)
		console.log(curT, n)
		lastSpokeN = n
		curT++
	}

	starts.forEach(speak)

	while (curT <= 2020) speak()

	output = lastSpokeN
	displayOut(1, output)
}

/* DESCRIPTION HERE */

function main2() {
	let output
	let input = getIn()
	let starts = input.split(",").map(Number)

	let lastTurns = new Map()
	let curT = 1
	let nextNumber
	let lastSpokeN = NaN

	function speak(n) {
		if (n == undefined) n = nextNumber
		let prev = lastTurns.get(n)
		if (prev == undefined) {
			nextNumber = 0
		} else {
			nextNumber = curT-prev
		}
		lastTurns.set(n, curT)
//		console.log(curT, n)
		lastSpokeN = n
		curT++
	}

	starts.forEach(speak)

	while (curT <= 30000000) speak()

	output = lastSpokeN
	displayOut(2, output)
}
