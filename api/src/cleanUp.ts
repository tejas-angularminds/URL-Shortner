// This Code will Run every week on Sunday, to delete the shortURL from db after 2 Months since it's Creation Date.

import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { withAccelerate } from '@prisma/extension-accelerate';
import { POOL } from './config';

const deleteOldRecords = async () => {
    const prisma = new PrismaClient({
        datasourceUrl: POOL,
    }).$extends(withAccelerate());

    try{
        console.log('Running scheduled task to clean up old records...');
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        
        // Delete old records..
        const result = await prisma.urls.deleteMany({
            where: {
              creationDate: {
                lt: twoMonthsAgo
              }
            }
          });
        console.log(`Deleted ${result.count} old records.`);
    } catch(error){
        console.error('Error occurred while deleting old records: ', error);
    } finally {
        await prisma.$disconnect();
    }
}

cron.schedule('0 0 * * 0', deleteOldRecords);