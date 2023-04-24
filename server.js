require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
// const socketController = require("./controllers/socket_controller");
const db = require("./config/connection");
const auth_routes = require("./controllers/auth_routes");
const view_routes = require("./controllers/view_routes");
const chat_routes = require("./controllers/chat_routes");
const path = require("path");
const { Users, Conversations, Messages } = require("./models");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const sessionMiddleware = session({
  //Required to be used to validate the client cookie matches the session secret
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

//Allow the client to send through json
app.use(express.json());
// Allow the client to send through standard form data
app.use(express.urlencoded({ extended: true }));
//Loads the css to prevent MIME errors
app.use(express.static(path.join(__dirname, 'public')));
//Setup handlebars
app.engine(
  "hbs",
  engine({
    //Enable shortname extensions - ie. index.hbs vs index.handlebars
    extname: ".hbs"
  })
);
app.set("view engine", "hbs");
//Set the views folder for all of our handlebar template files
app.set("views", "./views");

app.use(cookieParser());

//Setup the req.session object for our routes
app.use(sessionMiddleware);

app.use("/", [view_routes, auth_routes, chat_routes]);

io.engine.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});


io.on("connection", (socket) => {
  console.log("socket connected!");
  let roomNumber;

  // Listener to get the convo_id/room number from the client/browser
  socket.on("join_room", async (convo_id) => {
    // Set the room number for tracking of messages from the specific client connections
    roomNumber = convo_id;
    // Get the conversation (if found) and include the messages and attach the users
    const conversation = await Conversations.findByPk(convo_id, {
      include: {
        model: Messages,
        // This will attach the user to the message and only include the username
        include: {
          model: Users,
          attributes: ['username']
        }
      }
    });

    // Send the chat history if there is any
    if (conversation) socket.emit('chat_history', conversation.Messages);

    // Join the room number
    socket.join(roomNumber);
  });

  socket.on("chat_message", async (data) => {
    const { message_text, conversation_id } = data;
    const user = await Users.findByPk(socket.request.session.user_id);

    // Create the message and attach the sender and conversation id
    const message = await user.createMessage({
      conversation_id,
      sender: user.id,
      message_text
    });

    // Send the message to the specific room number
    io.to(roomNumber).emit("chat_message", {
      message,
      username: user.username
    });
  });
});

db.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log("Server started on %s", PORT));
});





// io.on('connection', (socket) => {
//   console.log('socket connected!');

//   socket.on('join_room', (roomNumber) => {
//     socket.join(roomNumber);
//   });

//   socket.on('chat_message', async (data) => {
//     const user_id = socket.request.session.user_id;
//     const message_text = data.text;
//     const roomNumber = data.roomNumber;

//     const user = await Users.findByPk(user_id);

//     const message = await user.createMessage({
//       text: message_text,
//       roomNumber: roomNumber
//     });

//     io.to(roomNumber).emit('chat_message', message);
//   });
// });

// io.use((socket, next) => {
//   sessionMiddleware(socket.request, {}, next);
//   const roomNumber = socket.handshake.query.roomNumber;
//   socket.join(roomNumber);
//   socket.emit('join_room', roomNumber);
// });









// io.on("connection", (socket) => {
//   console.log("A user connected!");
//   socket.on("disconnect", () => {
//     console.log("A user disconnected!");
//   });
// })


// // The code JD gave:

// require("dotenv").config();
// const express = require("express");
// const session = require("express-session");
// const { engine } = require("express-handlebars");
// const { Server } = require("socket.io");
// const PORT = process.env.PORT || 3000;

// const cookieParser = require('cookie-parser');
// // const socketController = require('./controllers/socket_controller');
// const db = require('./config/connection');
// const view_routes = require("./controllers/view_routes");

// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const io = new Server(server);
// const sessionMiddleware = session({
//   //Required to be used to validate the client cookie matches the session secret
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// });

// //Allow the client to send through json
// app.use(express.json());
// // Allow the client to send through standard form data
// app.use(express.urlencoded({ extended: true }));
// //Loads the css to prevent MIME errors
// app.use(express.static("public"));
// //Setup handlebars
// app.engine(
//   "hbs",
//   engine({
//     //Enable shortname extensions - ie. index.hbs vs index.handlebars
//     extname: ".hbs",
//   })
// );
// app.set("view engine", "hbs");
// //Set the views folder for all of our handlebar template files
// app.set("views", "./views");

// app.use(cookieParser());

// //Setup the req.session object for our routes
// app.use(sessionMiddleware);

// app.use('/', view_routes);

// io.engine.use(sessionMiddleware);

// io.on('connection', (socket) => {
//   console.log('socket connected!');

//   socket.on('chat', () => {

//   });
// });

// db.sync().then(() => {
//   server.listen(PORT, () => console.log('Server started on %s', PORT));
// });

// // server.js io listener:
// io.on('connection', (socket) => {
//   console.log('socket connected!');

//   socket.on('chat_message', async (data) => {
//     const user_id = socket.request.session.user_id;
//     const message_text = data.text;

//     const user = await User.findByPk(user_id);

//     const message = await user.createMessage({
//       text: message_text
//     });

//     socket.emit('chat_message', message);
//   });
// });

