import { config } from "@/config";
import type { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    // Allow requests with no origin (Postman, mobile apps)
    if (!requestOrigin) {
      return callback(null, true);
    }

    // Allow only whitelisted origins
    if (config.CORS_WHITELIST.includes(requestOrigin)) {
      return callback(null, true);
    }

    // In development allow all (optional)
    if (config.NODE_ENV === 'development') {
      return callback(null, true);
    }

    // Block others in production
    return callback(new Error('Not Allowed by CORS'));
  },
  credentials: true,
};

export default corsOptions;