const nicknameEl = document.getElementById("nickname");
const nicknameFormEl = document.getElementById("nickname-form");
const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");

const onConnect = () => {
  nicknameEl.innerText = socket.id;
  console.log(socket.id);
};

const onUserConnected = () => {
  console.log("another user connected");
};

const onNewMessage = ({ message, nickname }) => {
  const liEl = document.createElement("li");
  liEl.textContent = `${nickname}: ${message}`;
  messagesEl.appendChild(liEl);
  window.scrollTo(0, document.body.scrollHeight);
};

const onUserDisconnected = () => {
  console.log("another user disconnected");
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const message = inputEl.value;
  if (!message) return;

  socket.emit("chat message", {
    message: message,
    nickname: nicknameEl.value,
  });

  const liEl = document.createElement("li");
  liEl.style.textAlign = "right";
  liEl.textContent = `${message}`;
  messagesEl.appendChild(liEl);

  inputEl.value = "";
};

const socket = io();
socket.on("connect", onConnect);

socket.on("chat message", onNewMessage);
socket.on("user connected", onUserConnected);
socket.on("user disconnected", onUserDisconnected);

formEl.addEventListener("submit", onFormSubmit);
nicknameFormEl.addEventListener("submit", (e) => e.preventDefault());
