const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [process.env.CORS_ORIGIN] // Set this to your production origin
    : ['http://localhost:3000']; // Development origin

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export default corsOptions
