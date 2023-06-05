const { Midjourney } = require('midjourney');

async function main() {
  const client = new Midjourney({
    ChannelId: '1042502447282782238',
    SalaiToken: 'NzA5ODA4ODIyODUxNjAwNDY3.GWCkb8.x2tO9ILRibzqguUl2z6OGoazSxaAskX4BAxHhY',
    Debug: true,
    Ws:true,
  });

  await client.init();
  const msg = await client.Imagine("a cool cat, blue ears, yellow hat");
  console.log({ msg });
  if (!msg) {
    console.log("no message");
    return;
  }
  const msg2 = await client.Upscale(
    msg.content,
    2,
    msg.id,
    msg.hash,
    (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    }
  );
  const msg3 = await client.Upscale(
    msg.content,
    3,
    msg.id,
    msg.hash,
    (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    }
  );
  console.log({ msg3 });
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});