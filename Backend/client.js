function startWebsocket() {
  const exampleSocket = new WebSocket("wss://f8b0-2400-1a00-b010-a654-26-b547-64f2-4de7.ngrok-free.app:443");

  exampleSocket.onopen = (event) => {
    console.log("Connected to server!");
  };

  exampleSocket.onmessage = (event) => {
      event.data.text().then((text) => {
        if (text === 'connected') {
          console.log('New client connected');
          // Perform actions when a new client is connected
        } else {
          console.log(text);
        }
      });
    };

  exampleSocket.onerror = function (error) {
    console.log("Error occurred", error);
  };

  exampleSocket.addEventListener("error", (event) => {
    console.log("WebSocket error: ", event);
  });

  const postMessageBtn = document.getElementById("post-message-btn");
  postMessageBtn.addEventListener("click", function() {
    const value = $x("P6_MESSAGE").value;
    const username = document.querySelector(".t-Button-label").textContent;
    const data = { username: username, message: value };
    console.log("Username:", username);
    console.log("Message:", value);
    const jsonData = JSON.stringify(data);
    exampleSocket.send(jsonData);
  });
}

startWebsocket();
