const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./db");
console.log("hllo");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// routes require
const {
  authRoutes,
  userRoutes,
  serviceRoutes,
  paymentRoutes,
  orderRoutes,
  conversationRoutes,
  reviewRoutes,
} = require("./routes/index");

// configuration environment
dotenv.config();

app.use(cors());
app.use(morgan("dev"));

// set public folder
app.use(express.static("public"));

// data extract
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// socket connection
let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiver } = data || {};
    const user = activeUsers.find((user) => user.userId === receiver);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/payment-methods", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;

// database connection
dbConnect();

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
