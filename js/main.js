"use strict";

$.ajax({
  data: {},
  dataFilter: (data, dataType) => {
    return data;
  },
  dataType: "json",
  success: (data, dataType) => {
    const messagesElement = document.getElementById("messages");
    data.forEach(message => {
      const p = document.createElement("p");
      p.textContent = `time: ${message.date}, name: ${message.user}, text: ${message.content}`;
      messagesElement.appendChild(p);
    });
  },
  type: "GET",
  url: "http://localhost:3000/database"
});
