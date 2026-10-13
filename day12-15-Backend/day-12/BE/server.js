import express from 'express';

const app = express();
app.get('/', (req,res)=>{
    res.send('Server is ready')
})

app.get('/api/jokes', (req,res)=>{
    const jokes = [
  {
    "id": 1,
    "title": "The Programmer's Diet",
    "content": "Why do programmers prefer dark mode? Because light attracts bugs!"
  },
  {
    "id": 2,
    "title": "The Broken Keyboard",
    "content": "Why did the keyboard go to the doctor? Because it had too many space bars!"
  },
  {
    "id": 3,
    "title": "The Lazy Computer",
    "content": "Why was the computer tired? Because it had too many tabs open!"
  },
  {
    "id": 4,
    "title": "The Java Joke",
    "content": "Why do Java developers wear glasses? Because they don't C#!"
  },
  {
    "id": 5,
    "title": "The Database",
    "content": "Why did the database administrator leave his wife? She had too many relationships!"
  }
]
res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`sever at http://localhost:${port}`);
    
})