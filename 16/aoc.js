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
	let [fields, mine, near] = input.split("\n\n")
	let field_ranges_strings = Array.from(fields.matchAll(/(\d+)-(\d+)/g))
	let field_ranges = field_ranges_strings.map(m=>[Number(m[1]),Number(m[2])])

	let near_numbers = near.match(/\d+/g).map(Number)
	let invalids = near_numbers.filter(n=>field_ranges.every(r=>!insideRange(r[0],r[1])(n)))
	output = invalids.reduce(sumAll,0)

	displayOut(1, output)
}

/* DESCRIPTION HERE */
const inOr = (a,b,c,d)=> x=> insideRange(a,b)(x) || insideRange(c,d)(x)
const setUnion = a=> b=> new Set([...a, ...b])
const setIntersect = a=> b=> new Set([...a].filter(v=>b.has(v)))
const setDifference = a=> b=> new Set([...a].filter(v=>!b.has(v)))

function main2() {
	let output
	let input = getIn()
	let [fields, mine, near] = input.split("\n\n")

	fields = fields.split("\n")
	fields = fields.map(f=>f.match(/^(.*): (\d+)-(\d+) or (\d+)-(\d+)/))
	fields = fields.map(m=>[m[1],{poss_pos:new Set(),range:m.slice(2,6).map(Number)}])
	fields = new Map(fields)

	mine = mine.match(/\d+/g).map(Number)

	near = near.split("\n").slice(1).map(t=>t.match(/\d+/g).map(Number))
	// slice(1) to throw away "nearby tickets:"
	
	/* throw away inavalid tickets */
	near = near.filter(t=>
		t.every(v=>
			Array.from(fields.values()).some(f=>
				inOr(...f.range)(v)
			)
		)
	)

	let good_tickets = [...near, mine]
	console.log(good_tickets)

	/* use iterative elimination to determine field positions */
	for (const val of fields.values()) {
		mine.forEach((_,pos)=>{
			let pos_vals = good_tickets.map(t=>t[pos])
			if (pos_vals.every(inOr(...val.range))) {
				val.poss_pos.add(pos)
				console.log(pos,val)
			}
		})
	}
	console.log(fields)

	while (Array.from(fields.values()).some(f=>f.poss_pos.size > 1)) {
		let figured_pos = Array.from(fields.values()).filter(f=>
				f.poss_pos.size == 1
			).reduce((acc,f)=>
				setUnion(acc)(f.poss_pos)
			,new Set())
		Array.from(fields.values()).filter(f=>
				f.poss_pos.size > 1
			).forEach(f=>{
				f.poss_pos = setDifference(f.poss_pos)(figured_pos)
			})
	}

	output = Array.from(fields).filter(f=>/departure/.test(f[0]))
		.reduce((acc,f)=>acc*mine[[...f[1].poss_pos][0]],1)


	displayOut(2, output)
}
