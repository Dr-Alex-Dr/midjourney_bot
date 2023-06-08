import Midjourney from "https://deno.land/x/midjourney_discord_api/mod.ts";

const client = new Midjourney("interaction.txt");
await client.connectWs();
 // Used Websocket to boost detection. (experiental)
console.log("test")
client.imagine(
  "на русском", 
  (percent) => {console.log(percent)}
  /* add optional progress function (percent) => void */
).then(res => {
  console.log(res);
})

