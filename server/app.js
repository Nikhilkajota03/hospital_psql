import express from "express";
import studentsRoute  from "./Routes/routes.js"

const app = express();

app.use(express.json());


 app.get("/",(req,res)=>{
   res.send("Hello world");
 })


 app.use('/api/v1/students', studentsRoute);


app.listen(3007, () => {
  console.log(`Server running at port 3007`);
});


export default app;
