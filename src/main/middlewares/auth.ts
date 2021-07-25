import { adaptMiddleware } from '../adapter/express/expressMiddlewareAdapter';
import { makeAuthMiddleware } from './authMiddleware';

export const auth = adaptMiddleware(makeAuthMiddleware());
