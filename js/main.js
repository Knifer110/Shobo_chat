"use strict";

$.ajax({
  data: {},
  dataType: "json",
  dataFilter: (data, dataType) => {
    return data;
  },
  success: (data, dataType) => {
    const messagesElement = document.getElementById("messages");
    data.forEach(message => {
      const p = document.createElement("p");
      p.textContent = `time: ${message.date}, name: ${message.user}, text: ${message.content}`;
      messagesElement.appendChild(p);
    });
  },
  url: "http://localhost:3000/database",
  type: "GET"
});
