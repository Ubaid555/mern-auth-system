const ENV = Object.freeze({
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",

  NODE_ENV: import.meta.env.MODE,

  IS_DEVELOPMENT: import.meta.env.MODE === "development",

  IS_PRODUCTION: import.meta.env.MODE === "production",
});

export default ENV;