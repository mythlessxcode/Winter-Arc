// const promises = new Promise(function(resolve, reject){
//     setTimeout(function(){
//         console.log("async task 1")
//         resolve()
//     }, 5000)
// })

// promises.then(function(){
//     console.log("task 1 resolved");
    
// })

// const promis2 = new Promise(function(resolve,reject){
//     setTimeout(function(){
//         resolve({user: 'myth', email: 'myth@ex.com'})
//     }, 2000)
// })

// promis2.then(function(e){
//   console.log(e);
  
// })

const promise3 = new Promise(function(reject,resolve){
     setTimeout(function(){
        let error = false
        if (!error) {
            resolve({username: "hitesh", password: "123"})
        } else {
            reject('ERROR: Something went wrong')
        }
    }, 1000)
})

promise3.then((user)=>{
//    console.log(user);
   return user.username
}).then((username)=>{
    console.log(username);
    
}).catch((error)=>{
    console.log(error);
    
})
