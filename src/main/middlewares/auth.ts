import { adaptMiddleware } from '@/main/adapter/express/expressMiddlewareAdapter';
import { makeAuthMiddleware } from '@/main/middlewares/authMiddleware';

export const auth = adaptMiddleware(makeAuthMiddleware());
