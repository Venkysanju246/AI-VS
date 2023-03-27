
const express = require("express")
const OPENAI_API_KEY = "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"
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


//  openai.listEngines().then((response)=>{
//     console.log(response)
//  })

const app = express()
app.use(cors())
app.use(express.json())

// const {Configuration , OpenAIApi} = require("openai")

// const configuration = new Configuration({
//     apiKey: OPENAI_API_KEY,
// })
// const openai = new OpenAIApi(configuration)
// app.get("/", ()=>{
//     console.log("Home Page")
// })

app.post("/chat", (req, res) => {
  const question = req.body.question
  openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 4000,
    temperature: 0,
  }).then((response) => {
    return response?.data?.choices?.[0]?.text;
  })
    .then(answer => {
      const array = answer?.split("\n").filter((value) => value).map((value) => value.trim())

      return array
    })
    .then((answer) => {
      res.json({
        answer: answer,
        propt: question
      })
    })

})

// openai.createCompletion({
//     model:"text-davinci-003",
//     prompt:question,
//     max_tokens:200,
//     temperature:0
// }).then((response)=>{
//     return response?.data?.choices?.[0]?.text
// }).then((answer)=>{
//    const array =  answer?.split("\n").filter((value)=> !value).map((value) => value.trim())
//    return array
// })
// .then((answer)=>{
//     res.json({
//         answer:answer,
//         propt:question,
//     })
// })


app.listen(3000, () => {
  console.log("running server")
})