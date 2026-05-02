const axios = require('axios');
const Log = require('../logging_middleware');
let cachedToken = null;
async function getToken() {
  if (cachedToken) return cachedToken;

  const res = await axios.post(
    "http://20.207.122.201/evaluation-service/auth",
    {
        "email": "akileswarreddy_nagendla@srmap.edu.in",
    "name": "nagendla akileswar reddy",
        "rollNo": "ap23110011515",
        "accessCode": "QkbpxH",
        "clientID": "d64c2c42-6967-4902-8f7a-bbb642cd8cb8",
        "clientSecret": "amKEEvJpmvvTrPMY"
    }
  );

  cachedToken = res.data.access_token;
  return cachedToken;
}

function knapsack(items, capacity) {
  const n = items.length;

  const dp = Array(n + 1).fill(null).map(() =>
    Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = items[i - 1];

    for (let w = 0; w <= capacity; w++) {
      if (Duration <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - Duration] + Impact
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  
  let w = capacity;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(items[i - 1]);
      w -= items[i - 1].Duration;
    }
  }

  return {
    maxImpact: dp[n][capacity],
    selectedTasks: selected.reverse()
  };
}


async function solve() {
  try {
    await Log("backend", "info", "route", "Started");
    const token = await getToken();
    
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const depotsRes = await axios.get(
      "http://20.207.122.201/evaluation-service/depots",
      { headers }
    );

    const vehiclesRes = await axios.get(
      "http://20.207.122.201/evaluation-service/vehicles",
      { headers }
    );

    const depots = depotsRes.data.depots;
    const vehicles = vehiclesRes.data.vehicles;

    
    depots.forEach(depot => {
      const capacity = depot.MechanicHours;

      const result = knapsack(vehicles, capacity);

      console.log(`\nDepot ${depot.ID}`);
      console.log("Max Impact:", result.maxImpact);
      console.log(
        "Selected Tasks:",
        result.selectedTasks.map(t => t.TaskID)
      );
    });
    await Log("backend", "info", "controller", "Solved");

  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    await Log(
    "backend",
    "error",
    "handler",
    err.message || "Unknown error"
   );
  }
}

solve();