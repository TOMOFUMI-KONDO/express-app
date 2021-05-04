// const express=require("express")
// const app=express()
// const port=3000
//
// app.get("",(req,res)=>res.send("Hello World!"))
//
// app.listen(port,()=>{
//     console.log(`Listening on http:localhost:${port}`)
// })

const hello = (name: string) => `Hello, ${name}!`;

console.log(hello("TypeScript"));
