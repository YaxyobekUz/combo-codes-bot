const parse_mode = "Markdown";

const adminDefaultKeyboards = {
    parse_mode,
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{ text: "Statistika 📊" }, { text: "Rasmiy kanal 📣" },],
            [{ text: "Major ⭐️" }, { text: "Blum 🍀" },],
            [{ text: "X empire 💰" }, { text: "Yaytsogram 🥚" },],
        ]
    }
};

const updateCombo = (combo, text = "Komboni") => {
    return {
        parse_mode,
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [[{ text: text + " yangilash 🔄", callback_data: `update_${combo}_combo` }]],
        }
    }
};

const channelKeyboard = {
    parse_mode,
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [[{ text: "Rasmiy kanalni yangilash 🔄", callback_data: `update_channel` }]],
    }
};

const updateVideo = (combo, text = "Video ") => {
    return {
        parse_mode,
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                [{ text: text + "kodini qo'shish ➕", callback_data: `add_${combo}_video_code` }],
                [{ text: text + "kodini o'chirish 🗑", callback_data: `delete_${combo}_video_code` }]
            ],
        }
    }
};


const cancelKeyboard = {
    parse_mode,
    reply_markup: {
        resize_keyboard: true,
        keyboard: [[{ text: "⬅️ Bekor qilish" }]],
    }
};

module.exports = { adminDefaultKeyboards, updateCombo, updateVideo, cancelKeyboard, channelKeyboard };
