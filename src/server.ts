// ====================
// External Modules
// ====================
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

// ====================
// Custom Modules
// ====================
import { config } from '@/config';
import corsOptions from '@/lib/cors';

// ====================
// Routes & DB
// ====================
import router from '@/routes';
import { connectdatabase, Disconnectdatabase } from '@/lib/mongoose';

// Initialize Express app
const server = express();

// ====================
// Middlewares
// ====================

// Enable CORS with custom options
server.use(cors(corsOptions));

// Secure HTTP headers
server.use(helmet());

// Parse incoming JSON requests
server.use(express.json());

// Parse URL-encoded data (form submissions)
server.use(express.urlencoded({ extended: true }));

// Serve static files from "public" directory
server.use(express.static(`${__dirname}/public`));

// Parse cookies from request headers
server.use(cookieParser());

// Compress response bodies for better performance
server.use(compression());

// ====================
// Server Bootstrap
// ====================
(async function (): Promise<void> {
  try {
    // Connect to MongoDB database
    await connectdatabase();

    // Register application routes
    server.use('/', router);

    // Start server
    server.listen(config.PORT, () => {
      console.log(`Server running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);

    // Exit process in production on failure
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

// ====================
// Graceful Shutdown
// ====================
const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    // Disconnect from MongoDB
    await Disconnectdatabase();

    // Log shutdown signal
    console.log(`Server shutting down due to ${signal}`);

    // Exit process cleanly
    process.exit(0);
  } catch (error) {
    console.error('Error during server shutdown:', error);
  }
};

// Handle termination signals
process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);