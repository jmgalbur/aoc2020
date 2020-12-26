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
	let rows = input.split("\n")

	const coordToString = c=> c.toString()

	const stringToCoord = s=> s.split(",").map(Number)

	const neighborsStringSet = c=> {
		let [x, y, z] = c
		let neigh = new Set()
		for (let xx = x-1; xx <= x+1; xx++)
			for (let yy = y-1; yy <= y+1; yy++)
				for (let zz = z-1; zz <= z+1; zz++)
					if (xx != x || yy != y || zz != z)
						neigh.add(coordToString([xx,yy,zz]))
		return neigh
	}

	/* initialize state */
	let active_string_cubes = new Set()
	rows.forEach((row,y)=>{
		row.split("").forEach((s,x)=>{
			if (s == "#")
				active_string_cubes.add(coordToString([x,y,0]))
		})
	})
	console.log(active_string_cubes)

	for (let iterations = 6; iterations > 0; iterations--) {
		/* next state */
		let count_of_active_neighbors = new Map()
		for (const active_string of active_string_cubes) {
			let active = stringToCoord(active_string)
			for (const neighbor_string of neighborsStringSet(active)) {
				let old_count = count_of_active_neighbors.get(neighbor_string) || 0
				count_of_active_neighbors.set(neighbor_string, 1+old_count)
			}
		}

		let new_active_string_cubes = new Set()
		for (const [neighbor, count] of count_of_active_neighbors) {
			if (active_string_cubes.has(neighbor) && insideRange(2,3)(count)) {
				new_active_string_cubes.add(neighbor)
			} else if (!active_string_cubes.has(neighbor) && count == 3) {
				new_active_string_cubes.add(neighbor)
			}
		}

		active_string_cubes = new_active_string_cubes
	}

	output = active_string_cubes.size
	displayOut(1, output)
}

/* DESCRIPTION HERE */

function main2() {
	let output
	let input = getIn()
	let rows = input.split("\n")

	const coordToString = c=> c.toString()

	const stringToCoord = s=> s.split(",").map(Number)

	const neighborsStringSet = c=> {
		let [x, y, z, w] = c
		let neigh = new Set()
		for (let xx = x-1; xx <= x+1; xx++)
			for (let yy = y-1; yy <= y+1; yy++)
				for (let zz = z-1; zz <= z+1; zz++)
					for (let ww = w-1; ww <= w+1; ww++)
						if (xx != x || yy != y || zz != z || ww != w)
							neigh.add(coordToString([xx,yy,zz,ww]))
		return neigh
	}

	/* initialize state */
	let active_string_cubes = new Set()
	rows.forEach((row,y)=>{
		row.split("").forEach((s,x)=>{
			if (s == "#")
				active_string_cubes.add(coordToString([x,y,0,0]))
		})
	})
	console.log(active_string_cubes)

	for (let iterations = 6; iterations > 0; iterations--) {
		/* next state */
		let count_of_active_neighbors = new Map()
		for (const active_string of active_string_cubes) {
			let active = stringToCoord(active_string)
			for (const neighbor_string of neighborsStringSet(active)) {
				let old_count = count_of_active_neighbors.get(neighbor_string) || 0
				count_of_active_neighbors.set(neighbor_string, 1+old_count)
			}
		}

		let new_active_string_cubes = new Set()
		for (const [neighbor, count] of count_of_active_neighbors) {
			if (active_string_cubes.has(neighbor) && insideRange(2,3)(count)) {
				new_active_string_cubes.add(neighbor)
			} else if (!active_string_cubes.has(neighbor) && count == 3) {
				new_active_string_cubes.add(neighbor)
			}
		}

		active_string_cubes = new_active_string_cubes
	}

	output = active_string_cubes.size
	displayOut(2, output)
}
