const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Fallback origin for development
  credentials: true,
};

export default corsOptions;
