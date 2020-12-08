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
//
// Set
// Map
// stack: Array.push() Array.pop(): from end of array
// queue: Array.push() Array.shift(): put in back, take from front

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/* new after challenge */
// let clone = Object.assign({}, orig) == {...orig}

/////////

/* I know you've been waiting for this one! VIRTUAL MACHINE! Now with more inifinite loops and killing browser processes to refresh. What's the state of the machine when it starts looping? */

function main() {
	let output
	let input = getIn()
	let code = input.split("\n").map(inst=>{
		let [_, opcode, val] = inst.match(/^(\w{3}) (\+\d+|-\d+)/)
		return {opcode:opcode, val:Number(val)}
	})

	let pc = 0
	let acc = 0
	let visited = Array(code.length).fill(false)
	// remember to fill new Arrays.
	while (!visited[pc]) {
		visited[pc] = true
		let cur = code[pc]
		switch(cur.opcode) {
			case "jmp":
				pc += cur.val - 1
				// -1 because we unconditionally increment pc below
				break
			case "acc":
				acc += cur.val
				break
			case "nop":
				break
		}
		pc++
	}

	output = acc
	displayOut(1, output)
}

/* So, QA said changing exacly one of the instructions will fix it, but I already deleted the email before they said which one. Ugh, like, TL;DR. Make it exciting! Anywho, find it, fix it, and say what we should get. */

function main2() {
	let output
	let input = getIn()
	let origcode = input.split("\n").map(inst=>{
		let [_, opcode, val] = inst.match(/^(\w{3}) (\+\d+|-\d+)/)
		return {opcode:opcode, val:Number(val)}
	})

	for (let i in origcode) {
		let code = [...origcode]
		// quick rename for base list from code -> origcode saved a whole lotta refactoring below
		code[i] = {...code[i]}
		// code has copy of references to elements of origcode, so below switch statement is destructive. replace current to-be-changed instruction with a fresh one
		switch(code[i].opcode) {
			case "nop":
				code[i].opcode = "jmp"
				break
			case "jmp":
				code[i].opcode = "nop"
				break
		}

		// and now, business as usual
		let pc = 0
		let acc = 0
		let visited = Array(code.length).fill(false)
		console.log(visited)
		while (!visited[pc]) {
			visited[pc] = true
			let cur = code[pc]
			switch(cur.opcode) {
				case "jmp":
					pc += cur.val - 1
					break
				case "acc":
					acc += cur.val
					break
				case "nop":
					break
			}
			pc++
			if (pc == code.length) break
			// tried to put this check in the while, but I don't think I had the short circuiting right. or maybe it was the shallow copy gotcha above. anyway, it works
		}
		if (pc == code.length) {
			output = acc
			break
		}
		// hmmm, I could've avoided the double-check by putting this and displayOut above with a return. Oh well
	}

	displayOut(2, output)
}
