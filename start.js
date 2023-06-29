const cron = require('node-cron');
require('dotenv').config();

cron.schedule('*/3 * * * *', () => {
  if (process.env.BOT_TOKEN == 0) {
    process.env.ACTION_BEING = true;
  }
});