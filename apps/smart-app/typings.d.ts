import { app_user, user_data } from '@prisma/client';

interface iappUser extends app_user{
    app_users: app_user[];
}