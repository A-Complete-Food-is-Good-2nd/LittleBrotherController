// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import * as Ayame from "@open-ayame/ayame-web-sdk";
import "regenerator-runtime/runtime";
var qs = require('qs');

const signalingUrl = "wss://ayame-labo.shiguredo.jp/signaling";
let roomId = null;
let signalingKey = null;
let dataChannel = null;
const label = 'dataChannel';

// URLからRoom IDと Signaling Keyをパース
const url = location.search.substr(1);
if (url) {
    const params = qs.parse(url);
    console.log(params);
    if (params.roomId) {
        roomId = params.roomId;
    }
    if (params.signalingKey) {
        signalingKey = params.signalingKey;
    }
}

//ここからはApache 2.0ライセンスで配布されている成果物である「ayame-web-sdkのサンプル」を含んでいます．

//ハードコードされていたsignaling urlとroom idを変数にした
// const conn = Ayame.connection('wss://example.com/ws', 'test-room');
const conn = Ayame.connection(signalingUrl, roomId);
conn.options.video.direction = 'recvonly';
conn.options.audio.direction = 'recvonly';

//signaling keyを設定するようにした
conn.options.signalingKey = signalingKey;
const startConn = async () => {

    //データチャネルを使用するために追加
    //ここから
    // const startConn = async () => {
    // const conn = Ayame.connection('wss://example.com/ws', 'test-room');
    conn.on('open', async (e) => {
        dataChannel = await conn.createDataChannel(label);
        if (dataChannel) {
            dataChannel.onmessage = onMessage;
        }
    });
    conn.on('datachannel', (channel) => {
        if (!dataChannel) {
            dataChannel = channel;
            dataChannel.onmessage = onMessage;
        }
    });
    // await conn.connect(null);
    // };
    // const sendData = (data) => {
    // conn.sendData(data);
    // };
    //ここまで

    await conn.connect(null);
    conn.on('disconnect', (e) => console.log(e));
    conn.on('addstream', (e) => {
        document.querySelector('#remote-video').srcObject = e.stream;
    });
};
//ここまで

function sendData(data) {
    if (dataChannel && dataChannel.readyState === 'open') {
        dataChannel.send(data);
    }
}
function onMessage(e) {
    console.log(e.data);
}
function disconnect() {
    if (conn) {
        conn.disconnect();
    }
}
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.querySelector("#full-screen").textContent = "解除";
        document.body.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.querySelector("#full-screen").textContent = "全画面";
            document.exitFullscreen();
        }
    }
}

//ボタンの設定
document.querySelector("#connect").onclick = startConn;
document.querySelector("#disconnect").onclick = disconnect;
document.querySelector("#send-1").onclick = function () {
    sendData("1");
};
document.querySelector("#send-0").onclick = function () {
    sendData("0");
};
document.querySelector("#full-screen").onclick = toggleFullScreen;