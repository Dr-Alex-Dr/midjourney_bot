const upscaleInfoBtn = {
    reply_markup: {
        inline_keyboard: [
            [ 
                { text: '2x', callback_data: "2x" }, 
                { text: '4x', callback_data: "4x" } 
            ],
        ]
    }
}

module.exports = upscaleInfoBtn;