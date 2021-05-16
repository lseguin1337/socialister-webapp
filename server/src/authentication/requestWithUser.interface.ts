import { Request } from 'express';
import { User } from '../users/user.entity';

export type RequestWithUser = Request & { user: User };