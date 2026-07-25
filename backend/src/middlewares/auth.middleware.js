import { verifyToken } from '../utils/jwt.utils.js';
import { sendError } from '../utils/response.utils.js';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Missing or invalid authorization token', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};

export {
  verifyJWT,
};
