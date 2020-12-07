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
// find: lambda(item,i,list), filter but break when we get our first true
// substring: is [), so 0,length is full string
// join: Array.prototype.join("between")

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/* new after challenge */
// [...spread] == spread.slice('')
// forEach: map, but without the return
// match: array of (/g: all matches) (no /g: match and capture groups)
// matchAll: array of match objects/arrays. requires /g

// Set
// Map
// stack: Array.push() Array.pop(): from end of array
// queue: Array.push() Array.shift(): put in back, take from front

/////////

/* Ah yes, trees! I know how much you love recursion and graphs! How many kinds of bags must have a shiny gold bag inside? */

function main() {
	let output
	let input = getIn()
	let rules = input.split("\n")
	let grass_dag = new Map()
	// because we're working through bags from inner to outer
	rules.forEach(rule=>{
		let outer = rule.match(/^\w+ \w+/)[0]
		let inner = [...rule.matchAll(/\d+ (\w+ \w+)/g)].map(x=>x[1])
		inner.forEach(v=>{
			grass_dag.set(v, grass_dag.get(v) || new Set())
			grass_dag.get(v).add(outer)
		})
	})
	let containers = new Set([...grass_dag.get("shiny gold").keys()])
	containers.forEach(v=>{
		if (grass_dag.has(v))
			for (elem of grass_dag.get(v))
				containers.add(elem)
	})
	// forEach goes in insertion order through Set and will go through newly inserted items, so don't need to iterate multiple times here
	// forEach also skips not-yet-visited deleted items in Set

	output = containers.size
	displayOut(1, output)
}

/* But we don't care about that. Your bag must have how many bags inside it? */

function main2() {
	let output
	let input = getIn()
	let rules = input.split("\n")
	let children = new Map()
	// our tree
	rules.forEach(rule=>{
		let outer = rule.match(/^\w+ \w+/)[0]
		// match without /g returns an object with "0":matched_string
		let inners = [...rule.matchAll(/(\d+) (\w+ \w+)/g)].map(x=>({name:x[2],number:Number(x[1])}))
		// matchAll returns array of match objects, and "1"..."n" are the capture groups
		// so turn array of match objects into array of objects with name and converted number
		children.set(outer, inners)
	})

	function insidebags(name) {
		if (children.get(name).length == 0) return 0
		return children.get(name).reduce((acc,v)=>{
			return acc + (v.number * (insidebags(v.name)+1))
			// v.number*insidebags + v.number
		},0)
		// since our answer isn't a children value, but a children value.number, need to initialize accumulator with 0
	}

	output = insidebags("shiny gold")
	// didn't overflow the stack!
	displayOut(2, output)
}
