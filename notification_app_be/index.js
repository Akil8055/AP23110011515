const axios = require("axios");
let cachedToken = null;

async function getToken() {
  if (cachedToken) return cachedToken;

  const res = await axios.post(
    "http://20.207.122.201/evaluation-service/auth",
    {
      email: "akileswarreddy_nagendla@srmap.edu.in",
      name: "nagendla akileswar reddy",
        rollNo: "ap23110011515",
      accessCode: "QkbpxH",
      clientID: "d64c2c42-6967-4902-8f7a-bbb642cd8cb8",
      clientSecret: "amKEEvJpmvvTrPMY"
    }
  );

  cachedToken = res.data.access_token;
  return cachedToken;
}

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getTopNotifications(notifications, n = 10) {
  return notifications
    .sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
}

async function run() {
  try {
    const token = await getToken(); 

    const res = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const notifications = res.data.notifications;

    const top = getTopNotifications(notifications);

    console.log(top);

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

run();