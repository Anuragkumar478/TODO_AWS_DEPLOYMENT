// function count(){
//      let count=0;
//     return function(){
//         count++;
//         return count;
//      }
// }
// const val=count();
// console.log(val());
// console.log(val());
// console.log(val());

function calculated(a,b,operations){
     const val=operations(a,b);
     console.log(val);
     return val;
}

const add = (a,b)=> a+b;

calculated(4,5,add);
