//This makes all logging processes pass through here for easier piping to a file


//Creates a logger with a variable argument # for info
const info = (...params) => {
	if(process.env.NODE_ENV !== 'test'){
    console.log(...params)
	}
}

//Creates a logger with a variable argument # for errors
const error = (...params) => {
	if(process.env.NODE_ENV !== 'test'){
    console.error(...params)
	}
}


//Export
module.exports = {
    info, error
}