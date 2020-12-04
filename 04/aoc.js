/* handy dandies */
const numSort = (a,b)=>a-b
const sumAll = (acc,next)=>acc+next
const mulAll = (acc,next)=>acc*next

// filter: new list, with items for which lambda(item) == true
// reduce: iterate through list with lambda(acc,next). return is stored in acc
//         NOTE, acc is preloaded with first element, unless second argument given to reduce
// map: new list, with items that are lambda(item)

/* typical input flow */
//	input = input.split("\n").map(Number).map(x=>Math.floor(x/3)-2).reduce((acc,next)=>acc+next)

/* new after challenge */
const insideRange = (min,max)=>x=> min<=x && x <=max
// substring: is [), so 0,length is full string
// reduce: also have optional arguments "i" and "list" for the lambda.

/////////

/* here's a bunch of PII and required fields. oh wait, one isn't required. how many people could we dox? */

function main() {
	let output
	let input = getIn()
	let passports = input.split("\n\n")
	passports = passports.map(p=>p.replace(/:\S+/g,""))
	// remove the values from the key-value pairs, easier than trying to do substring when filtering
	passports = passports.map(x=>x.split(/\s+/))
	// now an array of keys
	let reqfields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]
	// should be const. oh well
	let validpassports = passports.filter(p=>{
		for (field of reqfields) {
			if (!p.includes(field))
				return false
		}
		return true
	})

	output = validpassports.length
	displayOut(1, output)
}

/* oh wait, some people gave us phony data, but still, most are trusting. hope you like regex! plz how many dox now? */

function main2() {
	let output
	let input = getIn()
	let passports = input.split("\n\n")
	passports = passports.map(x=>x.split(/\s+/))
	passports = passports.map(x=>{
		let kv = {}
		for (field of x) {
			let [k, v] = field.split(":")
			kv[k] = v
		}
		return kv
	})
	// array of "k:v" -> dict/object
	let reqfields = ["byr","iyr","eyr","hgt","hcl","ecl","pid"]
	// lol, didn't need it
	let validpassports = passports.filter(p=>{
		let f= p['byr']
		if (f === undefined || !/^\d{4}$/.test(f)) return false
		// RegExp.prototype.test(str) checks if any part of str satisfies the regex, so def remember those anchors!
		f = Number(f)
		if (f < 1920 || f > 2002) return false

		f= p['iyr']
		if (f === undefined || !/^\d{4}$/.test(f)) return false
		f = Number(f)
		if (f < 2010 || f > 2020) return false

		f= p['eyr']
		if (f === undefined || !/^\d{4}$/.test(f)) return false
		f = Number(f)
		if (f < 2020 || f > 2030) return false

		f= p['hgt']
		if (f === undefined || !/^\d+(cm|in)$/.test(f)) return false
		f = Number(f.substring(0,f.length-2))
		// *sob*, I miss f[:-2]
		if (/cm/.test(p['hgt'])) {
			if (f < 150 || f > 193) return false
		} else {
			if (f < 59 || f > 76) return false
		}

		f= p['hcl']
		if (f === undefined || !/^#[0-9a-f]{6}$/.test(f)) return false

		f= p['ecl']
		if (f === undefined || !/^(amb|blu|brn|gry|grn|hzl|oth)$/.test(f)) return false

		f= p['pid']
		if (f === undefined || !/^\d{9}$/.test(f)) return false

		return true
		//whew, I guess you're legit then
	})

	output = validpassports.length
	displayOut(2, output)
}
