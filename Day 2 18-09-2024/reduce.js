const arr = [45,2,1,78,3]
const sum = arr.reduce((acc,num)=>{
	acc+=num;
	return acc;
},0);

console.log(sum);

const max = arr.reduce((acc,num)=>{
	return Math.max(acc,num);
},0)

console.log(max);

