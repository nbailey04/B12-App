const crypto = require("crypto");

// Dynamic import of node-fetch
const fetch = (...args) => import("node-fetch").then(mod => mod.default(...args));

const payload = {
  action_run_link: "https://github.com/YOURNAME/YOURREPO/actions/runs/123456789",
  email: "nathan@example.com",
  name: "Nathan Bailey",
  repository_link: "https://github.com/YOURNAME/YOURREPO",
  resume_link: "https://your-resume-link",
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

