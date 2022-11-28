console.log('producer..')
import Kafka from 'node-rdkafka';
import express from 'express';
import "./addRequire.js";
var fs = require('fs')

var bodyParser = require('body-parser')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

function isEmpty(object) {  
    return Object.keys(object).length === 0
  }

app.use(express.json());
//app.use(express.urlencoded({extended : flase}))

/**
 * @swagger
 * definitions:
 *  JsonMessage:
 *   type: object
 *   properties:
 *    message:
 *     type: object
 *     description: Json message
 *     example: {"test": "Kumar"}
 *    topic_name:
 *     type: string
 *     description: Topic Name
 *     example: demo-topica
 * 
 */

//app.use("/subscribers",router)

const swaggerOptions = {
    swaggerDefinition : {
        title : "Domus API",
        descripition : "Domus API Information",
        definition : "Domus API Information",
        contact : {
            name : "Kumaraswami Hosuru"
        },
        servers : ["http://localthost:9002"],
    },
    //[`.routes/*.js`]
    apis : ['./producer/*.js']
};

/**
 * @swagger
 * /test-file:
 *  get:
 *   description : Used to read file from a specific location and publish message to test-demo topic.
 *   responses:
 *     '200':
 *        description: A successful response.
 */
 app.get("/test-file",function(req,res){
    res.send("test api")
})

/**
 * @swagger
 * /read-file:
 *  get:
 *   description : Used to read file from a specific location and publish message to test-demo topic.
 *   responses:
 *     '200':
 *        description: A successful response.
 */
app.get("/read-file", function (req, res) {
        fs.readFile('./producer/sample.json','utf8', function(err,data){
            console.log(data);
            if(!err) {
                queueMessage(data);
                res.send("file read")
            } else {
                console.log( "error" );
                res.send("file not read")
            }
    });
 })

 var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @swagger
 * /post-file:
 *  post:
 *   summary: This API will be invoked by TPP with Json object
 *   description: This API will be invoked by TPP with Json object
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/JsonMessage'
 *   responses:
 *    '200':
 *      description: A successful response.
 *    '500':
 *      description: 500 Server error.
 * 
 * 
 */
app.post('/post-message-to-demo-topic',  function(request, response){
  console.log(request.body);      // your JSON
  if(request.body != null && !isEmpty(request.body)) {
    queueMessage(JSON.stringify(request.body));
    response.send("file read")
} else {
    console.log( "error" );
    queueMessage("Temp message");
    response.send("file not read")
}
});


app.post('/post-message-to-any-topic',  function(request, response){
    //console.log(request.body);      // your JSON
    if(request.body != null && !isEmpty(request.body)) {
        var rawJsonMessage = JSON.stringify(request.body)
        var JsonMessage = JSON.parse(rawJsonMessage);
        //console.log(JsonMessage);     
        var messageCont = JSON.stringify(JsonMessage.message);
        var topic_name = JsonMessage.topic;
        //console.log(content)
        console.log("message : " +messageCont)
        console.log("topic : " + topic_name)
        messageToMessageTopic(JSON.stringify(JsonMessage.message), topic_name);
      response.send("file read")
  } else {
      console.log( "error" );
      response.send("file not read")
  }
  });

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

var server = app.listen(9002, function(){
    var host = server.address().address
    var port = server.address().port
})



function messageToMessageTopic(data,topic_name) {
    const stream_1 = Kafka.Producer.createWriteStream({
        'metadata.broker.list': 'localhost:9092'
    }, {}, {topic : topic_name });

    const result = stream_1.write(Buffer.from(`${data}`))
    if (result) {
        console.log('Message wrote successfully to topic......')
    } else {
        console.log("Something went wrong......")
    }
}

function queueMessage(data) {
    const stream = Kafka.Producer.createWriteStream({
        'metadata.broker.list': 'localhost:9092'
    }, {}, {topic : 'demo-topic' });
    const result = stream.write(Buffer.from(`${data}`))
    if (result) {
        console.log('Message wrote successfully to topic......')
    } else {
        console.log("Something went wrong......")
    }
}

// setInterval(() => {
//     queueMessage();
// },3000