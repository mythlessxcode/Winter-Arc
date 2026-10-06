
const userLogedIn = true;
const debitCard = true;

if(userLogedIn && debitCard){
    console.log("Allow to buy course");
}

if(userLogedIn || debitCard){
    console.log("allowd");
    
}