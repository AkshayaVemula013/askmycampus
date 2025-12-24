function login() {
  document.getElementById("loginDiv").style.display = "none";
  document.getElementById("choiceDiv").style.display = "block";
}

function showQuery() {
  document.getElementById("choiceDiv").style.display = "none";
  document.getElementById("queryDiv").style.display = "block";
}

function showComplaint() {
  document.getElementById("choiceDiv").style.display = "none";
  document.getElementById("complaintDiv").style.display = "block";
}

/* AI typing effect */
function typeAI(text, boxId) {
  let i = 0;
  let box = document.getElementById(boxId);
  let p = document.createElement("p");
  p.className = "ai";
  box.appendChild(p);

  let interval = setInterval(() => {
    p.innerHTML += text.charAt(i);
    i++;
    if (i === text.length) clearInterval(interval);
  }, 35);
}

/* QUERY FLOW */
let queryStep = 0;

function startQuery() {
  document.getElementById("queryChat").innerHTML = "";
  document.getElementById("queryInput").style.display = "block";
  document.getElementById("sendQuery").style.display = "inline";
  queryStep = 0;

  typeAI("Hi 👋 I’m your campus AI assistant. Please explain your query.", "queryChat");
}

function sendQuery() {
  let input = document.getElementById("queryInput").value;
  if (!input) return;

  let chat = document.getElementById("queryChat");
  let user = document.createElement("p");
  user.className = "user";
  user.innerText = "You: " + input;
  chat.appendChild(user);
  document.getElementById("queryInput").value = "";

  if (queryStep === 0) {
    typeAI("Thanks! Which semester are you currently studying?", "queryChat");
    queryStep++;
  } else {
    typeAI("Got it ✅ Your query has been noted and forwarded to the concerned department.", "queryChat");
    document.getElementById("queryInput").disabled = true;
    document.getElementById("sendQuery").disabled = true;
  }
}

/* COMPLAINT FLOW */
function submitComplaint() {
  document.getElementById("complaintChat").innerHTML = "";
  document.getElementById("complaintInput").style.display = "block";
  document.getElementById("sendComplaint").style.display = "inline";

  typeAI(
    "I’m sorry you’re facing this issue. Can you tell me when this problem started?",
    "complaintChat"
  );
}

function sendComplaint() {
  let input = document.getElementById("complaintInput").value;
  if (!input) return;

  let chat = document.getElementById("complaintChat");
  let user = document.createElement("p");
  user.className = "user";
  user.innerText = "You: " + input;
  chat.appendChild(user);
  document.getElementById("complaintInput").value = "";

  typeAI(
    "Thank you for the details. Your complaint has been officially registered and forwarded.",
    "complaintChat"
  );

  document.getElementById("complaintInput").disabled = true;
  document.getElementById("sendComplaint").disabled = true;
}
