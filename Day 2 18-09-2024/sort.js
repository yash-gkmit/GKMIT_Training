const arr = [5,2,7,1,8];
const asec_sorted = arr.sort((a,b)=>(a-b));
console.log(asec_sorted);

const desc_sorted = arr.sort((a,b)=>(b-a));
console.log(desc_sorted);

const cars_details = [
{
	name: "volvo",
	year: "1990",
},
{
	name: "toyota",
	year: "1999",
},
{
	name: "tata",
	year: "1890",
},
]

cars_details.sort((a,b)=> a.name.localeCompare(b.name));
console.log(cars_details)

const arrstr = ["yash","aditya","yashsingh"];
console.log(arrstr.sort());
console.log(arrstr.sort((a,b)=>(b.localeCompare(a))));