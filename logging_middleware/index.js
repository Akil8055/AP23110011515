const axios = require('axios');
//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha2lsZXN3YXJyZWRkeV9uYWdlbmRsYUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDAxMDksImlhdCI6MTc3NzY5OTIwOSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImYzNDMwOTFkLTdiOGMtNDY5Ni04YmM1LTAyOWI3MTdlNDFmZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5hZ2VuZGxhIGFraWxlc3dhciByZWRkeSIsInN1YiI6ImQ2NGMyYzQyLTY5NjctNDkwMi04ZjdhLWJiYjY0MmNkOGNiOCJ9LCJlbWFpbCI6ImFraWxlc3dhcnJlZGR5X25hZ2VuZGxhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJuYWdlbmRsYSBha2lsZXN3YXIgcmVkZHkiLCJyb2xsTm8iOiJhcDIzMTEwMDExNTE1IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZDY0YzJjNDItNjk2Ny00OTAyLThmN2EtYmJiNjQyY2Q4Y2I4IiwiY2xpZW50U2VjcmV0IjoiYW1LRUV2SnBtdnZUclBNWSJ9.zRQpEe_4QtZlkSJEzYCgxiEiZ6WhZMmPDsvZdWYmStw";



let cachedToken = null;

async function getToken() {
  try {
    if (cachedToken) return cachedToken; // reuse token

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

  } catch (err) {
    console.error("Auth failed", err.response?.data || err.message);
  }
}
async function Log(stack, level, pkg, message) {
  try {
    const token = await getToken();
    const res = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        "stack": stack,
        "level": level,
        "package": pkg,
        "message": message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Log sent:", res.data);

  } catch (err) {
    console.error("Logging failed:", err.response?.data || err.message);
  }
}

module.exports = Log;
Log("backend", "info", "handler", "test log message");