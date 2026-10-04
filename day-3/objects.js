

const user ={
    coursename : "js hindi",
    price: '999',
    courseInstructure: 'myth'

}
 
console.log(user.courseInstructure);

const {courseInstructure: instr} = user;

console.log(user.instr);
