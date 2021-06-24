//This makes all logging processes pass through here for easier piping to a file


//Creates a logger with a variable argument # for info
const info = (...params) => {
    console.log(...params)
}

//Creates a logger with a variable argument # for errors
const error = (...params) => {
    console.error(...params)
}


//Export
module.exports = {
    info, error
}