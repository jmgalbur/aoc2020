/* handy dandies */
const numSort = (a,b)=>a-b
const revNumSort = (a,b)=>numSort(b,a)
const sumAll = (acc,next)=>acc+next
const mulAll = (acc,next)=>acc*next
const insideRange = (min,max)=>x=> min<=x && x <=max

const setUnion = a=> b=> new Set([...a, ...b])
const setIntersect = a=> b=> new Set([...a].filter(v=>b.has(v)))
const setDifference = a=> b=> new Set([...a].filter(v=>!b.has(v)))

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
// matchAll: iterator of match objects/arrays. requires /g
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
	let problems = input.split("\n").map(p=>p.replace(/\s+/g, ""))

	function computeRun(p) {
		let numbers = p.match(/-?\d+/g).map(Number)
		let ops = p.match(/\+|\*/g)
		return numbers.reduce((acc,v)=>{
			switch(ops.shift()) {
				case "*":
					return acc*v
					break
				case "+":
					return acc+v
					break
			}
		}).toString()
	}

	function flatten(p) {
		return computeRun(p.substring(1,p.length-1))
	}

	function solve(p) {
		while (/\(/.test(p)) {
			p = p.replace(/\([^(]*?\)/,flatten)
		}
		return Number(computeRun(p))
	}

	output = problems.reduce((acc,p)=>acc+solve(p),0)
	displayOut(1, output)
}

/* DESCRIPTION HERE */

function main2() {
	let output
	let input = getIn()
	let problems = input.split("\n").map(p=>p.replace(/\s+/g, ""))

	function computeRun(p) {
		while (/\+/.test(p)) {
			p = p.replace(/(-?\d+)\+(-?\d+)/,(_,a,b)=>(Number(a)+Number(b)).toString())
		}
		while (/\*/.test(p)) {
			p = p.replace(/(-?\d+)\*(-?\d+)/,(_,a,b)=>(Number(a)*Number(b)).toString())
		}
		return p
	}

	function flatten(p) {
		return computeRun(p.substring(1,p.length-1))
	}

	function solve(p) {
		while (/\(/.test(p)) {
			p = p.replace(/\([^(]*?\)/,flatten)
		}
		return Number(computeRun(p))
	}

	output = problems.reduce((acc,p)=>acc+solve(p),0)
	displayOut(2, output)
}
