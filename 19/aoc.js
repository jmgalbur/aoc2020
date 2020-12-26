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

const combineRegex = rarr=> {
	if (!rarr.every(s=>s instanceof RegExp)) return rarr
	return new RegExp("(" + rarr.map(x=>x.source).join("") + ")")
}

function main() {
	let output
	let input = getIn()
	let [rules, messages] = input.split("\n\n")
	messages = messages.split("\n")
	rules = new Map(rules.split("\n").map(r=>r.split(": ")))

	/* change bare strings to regex */
	;[...rules].filter(r=>{
			let [n, rule] = r
			return /"/.test(rule)
		}).forEach(r=>{
			let [n, rule] = r
			rules.set(n, new RegExp(rule.replace(/"/g, "")))
		})

	/* tokenize remaining rules */
	;[...rules].filter(r=>{
			let [n, rule] = r
			return !(rule instanceof RegExp)
		}).forEach(r=>{
			let [n, rule] = r
			rules.set(n, rule.split(" "))
		})

	/* make special |(pipe) rule */
	rules.set("|", /|/)

	/* add anchors to rule 0 */
	rules.set("0", [/^/, ...rules.get("0"), /$/])

	/* collapse rules level-by-level */
	while (!(rules.get("0") instanceof RegExp)) {
		let solved_rules = new Map([...rules].filter(r=>{
				let [n, rule] = r
				return rule instanceof RegExp
			}))
		for (const n of solved_rules.keys()) rules.delete(n)

		for (const [n, rule] of rules) {
			rules.set(n, combineRegex(rule.map(x=>solved_rules.get(x)||x)))
		}
	}

	let rulecheck = rules.get("0")

	output = messages.filter(rulecheck.test, rulecheck).length
	displayOut(1, output)
}

/* DESCRIPTION HERE */

function main2() {
	let output
	let input = getIn()
	let [rules, messages] = input.split("\n\n")
	messages = messages.split("\n")
	rules = new Map(rules.split("\n").map(r=>r.split(": ")))

	/* change bare strings to regex */
	;[...rules].filter(r=>{
			let [n, rule] = r
			return /"/.test(rule)
		}).forEach(r=>{
			let [n, rule] = r
			rules.set(n, new RegExp(rule.replace(/"/g, "")))
		})

	// change 11 to 42{n}31{n} for n 1..5
	rules.set("11",
		"42 31 | " +
		"42 42 31 31 | " +
		"42 42 42 31 31 31 | " +
		"42 42 42 42 31 31 31 31 | " +
		"42 42 42 42 42 31 31 31 31 31"
	)

	/* tokenize remaining rules */
	;[...rules].filter(r=>{
			let [n, rule] = r
			return !(rule instanceof RegExp)
		}).forEach(r=>{
			let [n, rule] = r
			rules.set(n, rule.split(" "))
		})

	/* make special |(pipe) rule */
	rules.set("|", /|/)

	/* add anchors to rule 0 */
	rules.set("0", [/^/, ...rules.get("0"), /$/])

	/* collapse rules level-by-level */
	while (!(rules.get("0") instanceof RegExp)) {
		let solved_rules = new Map([...rules].filter(r=>{
				let [n, rule] = r
				return rule instanceof RegExp
			}))
		for (const n of solved_rules.keys()) rules.delete(n)

		// change 8 to 42+
		if (solved_rules.has("8")) {
			r = solved_rules.get("8")
			r = new RegExp(r.source + "+")
			solved_rules.set("8", r)
		}

		for (const [n, rule] of rules) {
			rules.set(n, combineRegex(rule.map(x=>solved_rules.get(x)||x)))
		}
	}

	let rulecheck = rules.get("0")

	output = messages.filter(rulecheck.test, rulecheck).length
	displayOut(2, output)
}
