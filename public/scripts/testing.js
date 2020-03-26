// const created_at = 1461116232227;
// const date = new Date(parseInt(created_at));
// const now = Date.now();
// console.log(date);
// console.log(now);

// const differenceInDate = (date1) => {
//   const difference = Date.now() - date1;
//   const daysDifference = Math.floor(difference/1000/60/60/24);
//   const yearDifference = Math.floor(difference/1000/60/60/24/365)
//   return yearDifference;
// }

// console.log(differenceInDate(created_at));

const serialized = 'text=fuck%20you';
console.log(serialized);
console.log(JSON.parse(serialized));