import Midjourney from "midjourney-discord-api";

const client = new Midjourney("interaction.txt");
const msg = await client.imagine(
  "horse", 
  /* add optional progress function (percent) => void */
);
const msg1 = await client.imagine(
  "wolf", 
  /* add optional progress function (percent) => void */
);
console.log("you find your result here: ", msg.attachments[0].url);