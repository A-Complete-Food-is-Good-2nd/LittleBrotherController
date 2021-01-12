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
//ダブルタップズーム無効化
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 350) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

//ボタンの設定
document.querySelector("#connect").onclick = startConn;
document.querySelector("#disconnect").onclick = disconnect;
document.querySelector("#full-screen").onclick = toggleFullScreen;

// ボタン一覧
const go_left_front_btn = document.querySelector("#go-left-front-btn");
const go_front_btn = document.querySelector("#go-front-btn");
const go_right_front_btn = document.querySelector("#go-right-front-btn");
const go_right_btn = document.querySelector("#go-right-btn");
const go_right_back_btn = document.querySelector("#go-right-back-btn");
const go_back_btn = document.querySelector("#go-back-btn");
const go_left_back_btn = document.querySelector("#go-left-back-btn");
const go_left_btn = document.querySelector("#go-left-btn");

const camera_up_btn = document.querySelector("#camera-up-btn");
const camera_down_btn = document.querySelector("#camera-down-btn");
const turn_right_btn = document.querySelector("#turn-right-btn");
const turn_left_btn = document.querySelector("#turn-left-btn");

go_left_front_btn.onpointerdown = () => {
    sendData("GLF");
};
go_left_front_btn.onpointerup = () => {
    sendData("GSP");
};
go_front_btn.onpointerdown = () => {
    sendData("GFF");
};
go_front_btn.onpointerup = () => {
    sendData("GSP");
};
go_right_front_btn.onpointerdown = () => {
    sendData("GRF");
};
go_right_front_btn.onpointerup = () => {
    sendData("GSP");
};
go_right_btn.onpointerdown = () => {
    sendData("GRR");
};
go_right_btn.onpointerup = () => {
    sendData("GSP");
};
go_right_back_btn.onpointerdown = () => {
    sendData("GRB");
};
go_right_back_btn.onpointerup = () => {
    sendData("GSP");
};
go_back_btn.onpointerdown = () => {
    sendData("GBB");
};
go_back_btn.onpointerup = () => {
    sendData("GSP");
};
go_left_back_btn.onpointerdown = () => {
    sendData("GLB");
};
go_left_back_btn.onpointerup = () => {
    sendData("GSP");
};
go_left_btn.onpointerdown = () => {
    sendData("GLL");
};
go_left_btn.onpointerup = () => {
    sendData("GSP");
};

camera_up_btn.onpointerdown = () => {
    sendData("CUP");
};
camera_up_btn.onpointerup = () => {
    sendData("TSP");
}
camera_down_btn.onpointerdown = () => {
    sendData("CDN");
};
camera_down_btn.onpointerup = () => {
    sendData("TSP");
};
turn_right_btn.onpointerdown = () => {
    sendData("TRT");
};
turn_right_btn.onpointerup = () => {
    sendData("TSP");
};
turn_left_btn.onpointerdown = () => {
    sendData("TLF");
};
turn_left_btn.onpointerup = () => {
    sendData("TSP");
};