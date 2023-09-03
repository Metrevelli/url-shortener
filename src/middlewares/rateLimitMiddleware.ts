import rateLimit from 'express-rate-limit';

const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
});

export default apiRateLimit;
