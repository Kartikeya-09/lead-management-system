const validateEnv = () => {
  const requiredKeys = [
    'MONGODB_URI',
    'JWT_SECRET',
    'JWT_EXPIRY',
    'CORS_ORIGIN',
    'PORT'
  ];

  let hasError = false;

  requiredKeys.forEach((key) => {
    if (!process.env[key]) {
      console.error(`[Startup Error] Missing required environment variable: ${key}`);
      hasError = true;
    }
  });

  if (hasError) {
    console.error('[Startup Error] Cannot start the server due to missing environment variables.');
    process.exit(1);
  }
};

export {
  validateEnv,
};
