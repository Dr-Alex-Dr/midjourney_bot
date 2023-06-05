const { Midjourney } = require('midjourney');

const client = new Midjourney({
    ChannelId: '1042502447282782238',
    SalaiToken: 'NzA5ODA4ODIyODUxNjAwNDY3.GWCkb8.x2tO9ILRibzqguUl2z6OGoazSxaAskX4BAxHhY',
    Debug: true,
    Ws:true,
});

async function getImg() {
    const msg = await client.Imagine("futuristic house in the form of a white trailer", (uri) => { });
    console.log("=================== ", typeof msg, mgs)
}

getImg();

