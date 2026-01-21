const crypto = require("crypto");

// Dynamic import of node-fetch
const fetch = (...args) => import("node-fetch").then(mod => mod.default(...args));

const payload = {
  action_run_link: "https://github.com/nbailey04/B12-App/actions/workflows/b12-submit.yml",
  email: "work.nbailey2004@gmail.com",
  name: "Nathan Bailey",
  repository_link: "https://github.com/nbailey04/B12-App",
  resume_link: "https://raw.githubusercontent.com/nbailey04/B12-App/57a8bb3971f610986ac939c4ffcb0bec4a69b3a3/NathanBailey_Resume_2026.pdf",
  timestamp: new Date().toISOString()
};

const body = JSON.stringify(
  Object.keys(payload)
    .sort()
    .reduce((obj, key) => {
      obj[key] = payload[key];
      return obj;
    }, {})
);

const secret = "hello-there-from-b12";
const signature = crypto
  .createHmac("sha256", secret)
  .update(body, "utf8")
  .digest("hex");

// Async IIFE for POST
(async () => {
  const response = await fetch("https://b12.io/apply/submission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Signature-256": `sha256=${signature}`
    },
    body
  });

  const result = await response.json();
  console.log("Full response:", result);
})();

