import zod from 'zod';

export const signupBody = zod.object({
    email: zod.string().email(),
    userName: zod.string(),
    password: zod.string().min(6)
});

export const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
});
