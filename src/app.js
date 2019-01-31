import 'dotenv/config';
import express from 'express'
import bodyParser from 'body-parser'
import localtunnel from 'localtunnel'
import webhook from './routes/webhook'
import index from './routes/'


const app = express()
const server = require('http').Server(app)

// Database connection
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(bodyParser.json())
app.use(express.static('./data/archives'))

//Routes initalisation
app.use('/webhook', webhook)
app.use('/', index)

app.set('port', (process.env.PORT || 8000));

server.listen(app.get('port'), function () {
	console.log('Server started on port ' + app.get('port'));
});

var tunnel = localtunnel(app.get('port'),{
    subdomain : process.env.subdomain
}, function(err, tunnel) {
    if (err) console.log("erreur !")
    else console.log(`your tunnel url is: ${tunnel.url}`)
});
 
tunnel.on('close', function() {
	console.log("closed server ! Please ")
});
