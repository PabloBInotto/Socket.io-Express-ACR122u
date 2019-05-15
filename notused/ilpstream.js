// Error not working
// const server = await IlpStream.createServer({
//	               ^^^^^
// SyntaxError: await is only valid in async function
// https://medium.com/interledger-blog/streaming-money-and-data-over-ilp-fabd76fc991e



	const IlpStream = require('ilp-protocol-stream')
	const createPlugin = require('ilp-plugin')
	const serverPlugin = createPlugin()
	
	function stream() 
{
	const server = await IlpStream.createServer({
	  plugin: serverPlugin
	})

	server.on('connection', (connection) => {
	  console.log('server got connection')
	  
	  connection.on('stream', (stream) => {
	    console.log(`server got a new stream: ${stream.id}`)

	    // Set the maximum amount of money this stream can receive
	    stream.setReceiveMax(10000)

	    // Handle incoming money
	    stream.on('money', (amount) => {
	      console.log(`server stream ${stream.id} got incoming payment for: ${amount}`)
	    })

	    // Handle incoming data
	    stream.on('data', (chunk) => {
	      console.log(`server stream ${stream.id} got data: ${chunk.toString('utf8')}`)
	    })
	  })
	})

	// These would need to be passed from the server to the client using
	// some encrypted communication channel (not provided by STREAM)
	const { destinationAccount, sharedSecret } = server.generateAddressAndSecret()
	console.log(`server generated ILP address (${destinationAccount}) and shared secret (${sharedSecret.toString('hex')}) for client`)

	
}
//
// connect to server

function serverconnect()
{

const clientPlugin = createPlugin()
const clientConn = await IlpStream.createConnection({
  plugin: clientPlugin,
  destinationAccount,
  sharedSecret
})

// Streams are automatically given ids (client-initiated ones are odd, server-initiated are even)
const streamA = clientConn.createStream()
const streamB = clientConn.createStream()

console.log(`sending data to server on stream ${streamA.id}`)
streamA.write('hello there!')

console.log(`sending data to server on stream ${streamB.id}`)
streamB.write('hello there!')

console.log(`sending money to server on stream ${streamA.id}`)
await streamA.sendTotal(100)
console.log('sent 100 units')

console.log(`sending money to server on stream ${streamB.id}`)
await streamB.sendTotal(200)
console.log('sent 200 units')

}

stream();
serverconnect();