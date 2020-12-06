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

/// new after challenge
// filter: lambda(item,i,list)
// find: lambda(item,i,list), filter but break when we get our first true
const revNumSort = (a,b)=>numSort(b,a)

/////////

/* Here's a bunch of seats written as what your Chrome browser will try to translate from Welsh. But lol, it's just binary with extra steps. What's the last seat number? */

function main() {
	let output
	let input = getIn()
	let seats = input.split("\n")
	seats = seats.map(x=>{
		let seat = {}
		let row = x
			.substring(0,x.length-3)
			.replace(/F/g,"0")
			.replace(/B/g,"1")
		let col = x
			.substring(x.length-3,x.length)
			.replace(/L/g,"0")
			.replace(/R/g,"1")

		row = parseInt(row, 2)
		col = parseInt(col, 2)
		// parseInt lets you pick the base, as opposed to Number constructor
		
		let id = row * 8 + col
		// oh, so I coulda just done /F|L/g and /B|R/g? Thanks for letting me know
		
		seat.row = row
		seat.col = col
		seat.id = id
		//lol, guess where writing `let seat` happened chronologically
		return seat
	})

	output = seats.sort((a,b)=>b.id-a.id)[0].id
	displayOut(1, output)
}

/* Okay, you sniffed everybody's phone for a reason, remember? Which seat is yours? */

function main2() {
	let output
	let input = getIn()
	let seats = input.split("\n")
	seats = seats.map(x=>{
		let seat = {}
		let row = x
			.substring(0,x.length-3)
			.replace(/F/g,"0")
			.replace(/B/g,"1")
		let col = x
			.substring(x.length-3,x.length)
			.replace(/L/g,"0")
			.replace(/R/g,"1")

		row = parseInt(row, 2)
		col = parseInt(col, 2)
		
		let id = row * 8 + col
		
		seat.row = row
		seat.col = col
		seat.id = id
		return seat
	})

	seats.sort((a,b)=>a.id-b.id)
	// slightly less characters than `(a,b)=>numSort(a.id,b.id)`. *sigh*, not so handy-dandy I guess
	let target = seats.find((x,i,arr)=>{
		return arr[i+1].id === x.id+2
		// don't use filter, as it'll fritz on the last element (that i+1 business) and error instead of returning anything
	}).id
	output = target+1
	// +1 very important here
	displayOut(2, output)
}
