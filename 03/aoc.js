/* handy dandies */
const numSort = (a,b)=>a-b
const sumAll = (acc,next)=>acc+next

// filter: new list, with items for which lambda(item) == true
// reduce: iterate through list with lambda(acc,next). return is stored in acc
//         NOTE, acc is preloaded with first element, unless second argument given to reduce
// map: new list, with items that are lambda(item)
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/////////

/* you're alpine skiing down a repeated background. how many trees do you hit if you go over 3 meters per 1 down? */

function main() {
	let output
	let input = getIn()
	let rows = input.split("\n")
	let nTrees = 0
	for (let rowN = 0; rowN < rows.length; rowN++) {
		if (rows[rowN][3*rowN % rows[rowN].length] == "#")
			nTrees++
		// ahh yeah, nested array dereferences
		// rows[rowN].length could've stayed rows[0].length
		// modulo to wrap around for the repeating
	}

	output = nTrees
	displayOut(1, output)
}

/* ouch, uhh, maybe check these other kinds of slopes? what's the product of the injuries incurred by you and your 4 clones? (and the grand total of your hospital bill) */

function main2() {
	let output
	let input = getIn()
	let rows = input.split("\n")
	let nTrees = 0
	let nmTrees = 1
	for (let rowN = 0; rowN < rows.length; rowN++) {
		if (rows[rowN][1*rowN % rows[rowN].length] == "#")
			nTrees++
	}
	console.log(nTrees)
	nmTrees *= nTrees
	// quicker just to copy paste these blocks and modify numbers for the different trajectories
	nTrees = 0
	for (let rowN = 0; rowN < rows.length; rowN++) {
		if (rows[rowN][3*rowN % rows[rowN].length] == "#")
			nTrees++
	}
	console.log(nTrees)
	nmTrees *= nTrees
	nTrees = 0
	for (let rowN = 0; rowN < rows.length; rowN++) {
		if (rows[rowN][5*rowN % rows[rowN].length] == "#")
			nTrees++
	}
	console.log(nTrees)
	nmTrees *= nTrees
	nTrees = 0
	for (let rowN = 0; rowN < rows.length; rowN++) {
		if (rows[rowN][7*rowN % rows[rowN].length] == "#")
			nTrees++
	}
	console.log(nTrees)
	nmTrees *= nTrees
	nTrees = 0
	for (let rowN = 0; 2*rowN < rows.length; rowN++) {
		if (rows[2*rowN][1*rowN % rows[rowN].length] == "#")
			nTrees++
		// this one held me back. initially incrementing rowN by 2 and still using rowN, but that messes up horizontal trajectory.
		// or something. anyway, the code works, don't try to parse it!!
	}
	console.log(nTrees)
	nmTrees *= nTrees

	output = nmTrees
	displayOut(2, output)
}
