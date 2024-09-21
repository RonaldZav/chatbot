const { ChatGeneration } = require( '../src/index');
const options = require( '../src/options.json');

const chat = new ChatGeneration()
    .setName("Roni Bot")
    .setOptions(options)
    .setAccuracy(40); // Default 40%

const response = chat.send("Hola, como estas?");
console.log(response);