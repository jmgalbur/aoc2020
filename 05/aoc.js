/* handy dandies */
const numSort = (a,b)=>a-b
const sumAll = (acc,next)=>acc+next
const mulAll = (acc,next)=>acc*next
const insideRange = (min,max)=>x=> min<=x && x <=max

// filter: new list, with items for which lambda(item) == true
// reduce: iterate through list with lambda(acc,next,i,list). return is stored in acc
//         NOTE, acc is preloaded with first element, unless second argument given to reduce
// map: new list, with items that are lambda(item)
// substring: is [), so 0,length is full string

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/////////

/* DESCRIPTION HERE */

function main() {
	let output
	let input = getIn()

	output = NaN
	displayOut(1, output)
}

/* DESCRIPTION HERE */

function main2() {
	let output
	let input = getIn()

	output = NaN
	displayOut(2, output)
}
