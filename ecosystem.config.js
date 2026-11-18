module.exports = {
  apps: [
    {
      name: "front",
      script: "./server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        HOSTNAME: "127.0.0.1",
        API_INTERNAL_URL: "http://127.0.0.1:3000",
      },
    },
  ],
};