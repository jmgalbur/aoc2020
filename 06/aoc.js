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

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/* new after challenge */
// join: Array.prototype.join("between")

/////////

/* People list their favorite letters of the alphabet. How many letters does each group like, all summed up? */

function main() {
	let output
	let input = getIn()
	let groups = input.split("\n\n")
	groups = groups.map(x=>{
		let oneline = x.replace(/\s+/g,"")
		oneline = oneline.split("")
		// the internet's telling me I should replace this with [...oneline], since split doesn't handle surrogate pairs, whereas spread operator does, since it uses String's iterator, which does
		oneline.sort()
		oneline = oneline.join("")
		let yesQs = oneline.match(/(\w)\1*/g)
		return yesQs.length
	})
	// yeah, this shouldn't go back into groups: more like groups_vote_num

	output = groups.reduce(sumAll)
	// FINALLY: some handiness, with a spritz of dandy
	displayOut(1, output)
}

/* Silly billy, you that read wrong. How many letters does each group all like, all summed up? */

function main2() {
	let output
	let input = getIn()
	let groups = input.split("\n\n")
	groups = groups.map(x=>{
		let splits = x.split("\n")
		let num = splits.length
		let oneline = splits.join("")
		oneline = oneline.split("")
		oneline.sort()
		oneline = oneline.join("")
		let allYesQs = oneline.match(/(\w)\1*/g)
		return allYesQs.filter(x=>x.length == num).length
	})

	output = groups.reduce(sumAll)
	displayOut(2, output)
}
