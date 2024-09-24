const parse_mode = "Markdown";

const majorUrl = "https://t.me/major/start?startapp=298444246";
const blumUrl = "https://t.me/blum/app?startapp=ref_uD9kr9qNiE";
const empireUrl = "https://t.me/empirebot/game?startapp=hero298444246";
const yaytsogramUrl = "https://t.me/Yaytsogram_bot?start=invite3968364";

const channelLinkKeyboard = (channelUrl, botUrl) => {
    return {
        parse_mode,
        reply_markup: {
            inline_keyboard: [
                [{ text: "Botga kirish 🤖", url: botUrl }],
                [{ text: "Rasmiy kanal 📣", url: channelUrl }],
            ],
        },
    };
};

const userDefaultKeyboards = {
    parse_mode,
    reply_markup: {
        keyboard: [
            [{ text: "Major ⭐️" }, { text: "Blum 🍀" },],
            [{ text: "X empire 💰" }, { text: "Yaytsogram 🥚" },],
        ]
    }
};

const majorKeyboards = {
    parse_mode,
    reply_markup: {
        inline_keyboard: [
            [{ text: "Puzzle durov 🧩", callback_data: "puzzle_durov" }],
            [{ text: "Botga kirish 🤖", url: majorUrl }],
        ]
    }
};

const blumKeyboards = {
    parse_mode,
    reply_markup: {
        inline_keyboard: [
            [{ text: "YouTube video kodlar 🔑", callback_data: "blum_videos_codes" }],
            [{ text: "Botga kirish 🤖", url: blumUrl }],
        ]
    }
};

const yaytsogramKeyboards = {
    parse_mode,
    reply_markup: {
        inline_keyboard: [
            [{ text: "Shifer 🗝", callback_data: "yaytsogram" }],
            [{ text: "Botga kirish 🤖", url: yaytsogramUrl }],

        ]
    }
};

const empireKeyboards = {
    parse_mode,
    reply_markup: {
        inline_keyboard: [
            [{ text: "YouTube video kodlar 🔑", callback_data: "empire_videos_codes" }],
            [{ text: "Kun topishmog'i ❓", callback_data: "riddle" }, { text: "Kun rebusi 🔍", callback_data: "rebus" }],
            [{ text: "Kun investitsiyasi 💵", callback_data: "invest" }],
            [{ text: "Botga kirish 🤖", url: empireUrl }],
        ]
    }
};

module.exports = { channelLinkKeyboard, userDefaultKeyboards, majorKeyboards, blumKeyboards, yaytsogramKeyboards, empireKeyboards, majorUrl, blumUrl, empireUrl, yaytsogramUrl };
