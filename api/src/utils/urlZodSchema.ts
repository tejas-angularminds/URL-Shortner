import zod from 'zod';

export const urlBody = zod.object({
    orignalUrl : zod.string().url(),
    userId: zod.string()
});