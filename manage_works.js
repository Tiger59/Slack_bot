const Slack = require('slack');
const slack = new Slack();
const BOT_TOKEN = 【アクセスキー】;
const CHANNEL_ID = 【チャンネルID】;
let animalLog = [];
var jikan= new Date();
var hour = jikan.getHours();
var minute = jikan.getMinutes();
var second = jikan.getSeconds();

slack.chat.postMessage({
    token: BOT_TOKEN,
    channel: CHANNEL_ID,
    text: '仕事を?',
    attachments: getAttachments()
}).then(console.log).catch(console.error);

// Interactive Message 待ち受け
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.post('/', bodyParser.urlencoded({ extended: false }), (req, res) => {
    const payload = JSON.parse(req.body.payload);
    animalLog.push(payload.actions[0].name);
    res.json({
        text: '仕事を?',
        attachments: getAttachments()
    });
});
app.listen(3000);

function getAttachments() {
    let attachments = [{
        callback_id: 'animals_button',
        color: '#36a64f',
        text: '',
        actions: ['始めます', '終わります', '少し休憩します', '再開します'].map(v => ({
            type: 'button',
            text: v,
            name: v
        }))
    }];
    // animalLog の数だけクソレスポンスを追加
    let memo = {};
    animalLog.forEach(animal => {
        attachments.push({
            text: `了解しました!` + (() => {
                jikan= new Date();
                hour = jikan.getHours();
                minute = jikan.getMinutes();
                second = jikan.getSeconds();
                if (animal === '始めます') return '頑張ってください!';
                if (animal === '終わります') return 'お疲れ様です!進捗いかがですか?';
                if (animal === '少し休憩します') return '休憩も大事ですよね!';
                return '頑張ってください!';
            })() + ' >'+hour+':'+minute+':'+second
        });
    });
    return attachments;
}
