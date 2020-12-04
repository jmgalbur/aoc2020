// forgot my goody bag of handy-dandies

/* get a list of passwords and their respective policies. how many comply? */
/* minNumOccurenceChar, maxNumOccurenceChar, Char, password */

function main() {
	let output
	let input = getIn()
	let policies = input.split("\n")
	let parsedpolicies = policies.map(x=>x.split(/[-: ]+/))
	// finally separating out chained statements
	// I feel coddled by Python, though, and hate the word "let", now

	let goodpasswords = parsedpolicies.filter(p=>{
		let [minS,maxS,letter,pass] = p
		let matches = pass.match(RegExp(letter,"g"))
		// regex with /g flag makes str.match() return an array
		let Nmatches = 0
		if (matches !== null) {
			Nmatches = matches.length
		}
		return Number(minS) <= Nmatches && Nmatches <= Number(maxS)
		// I miss Python's chained comparison
	})

	output = goodpasswords.length
	displayOut(1, output)
}

/* oh wait, wrong format. how many actually comply? */
/* first 1-based position, second 1-based position, Char, password */
/* char must be in xor position of password */

function main2() {
	let output
	let input = getIn()
	let policies = input.split("\n")
	let parsedpolicies = policies.map(x=>x.split(/[-: ]+/))

	let goodpasswords = parsedpolicies.filter(p=>{
		let [first,second,letter,pass] = p
		first = Number(first)-1
		second = Number(second)-1
		let firstMatch = pass[first] == letter
		let secondMatch = pass[second] == letter
		return !!(firstMatch ^ secondMatch)
		// xor of Booleans returns Number, coerce back to Boolean, plz!
	})

	output = goodpasswords.length
	displayOut(2, output)
}
