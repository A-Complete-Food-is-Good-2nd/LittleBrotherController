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

//video codecの指定をできるようにするために追加
conn.options.video.codec = "H264"; //デスクトップChrome系のブラウザでのみ反映される

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
        // document.querySelector("#full-screen").textContent = "解除";
        document.body.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            // document.querySelector("#full-screen").textContent = "全画面";
            document.exitFullscreen();
        }
    }
}
//ダブルタップズーム無効化
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 450) {
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
    sendData("glf");
};
go_left_front_btn.onpointerup = () => {
    sendData("gsp");
};
go_front_btn.onpointerdown = () => {
    sendData("gff");
};
go_front_btn.onpointerup = () => {
    sendData("gsp");
};
go_right_front_btn.onpointerdown = () => {
    sendData("grf");
};
go_right_front_btn.onpointerup = () => {
    sendData("gsp");
};
go_right_btn.onpointerdown = () => {
    sendData("grr");
};
go_right_btn.onpointerup = () => {
    sendData("gsp");
};
go_right_back_btn.onpointerdown = () => {
    sendData("grb");
};
go_right_back_btn.onpointerup = () => {
    sendData("gsp");
};
go_back_btn.onpointerdown = () => {
    sendData("gbb");
};
go_back_btn.onpointerup = () => {
    sendData("gsp");
};
go_left_back_btn.onpointerdown = () => {
    sendData("glb");
};
go_left_back_btn.onpointerup = () => {
    sendData("gsp");
};
go_left_btn.onpointerdown = () => {
    sendData("gll");
};
go_left_btn.onpointerup = () => {
    sendData("gsp");
};

camera_up_btn.onpointerdown = () => {
    sendData("cup");
};
camera_up_btn.onpointerup = () => {
    sendData("csp");
}
camera_down_btn.onpointerdown = () => {
    sendData("cdn");
};
camera_down_btn.onpointerup = () => {
    sendData("csp");
};

turn_right_btn.onpointerdown = () => {
    sendData("trt");
};
turn_right_btn.onpointerup = () => {
    sendData("tsp");
};
turn_left_btn.onpointerdown = () => {
    sendData("tlf");
};
turn_left_btn.onpointerup = () => {
    sendData("tsp");
};

//PC用のキーボード操作
let prevus_down_key_code = null;
function do_by_down(code, func) {
    if (prevus_down_key_code != code) {
        prevus_down_key_code = code;
        func();
    }
}
function do_by_up(code, func) {
    if (prevus_down_key_code === code) {
        prevus_down_key_code = null;
    }
    func();
}

window.addEventListener("keydown", event => {
    switch (event.code) {
        case "KeyQ":
            do_by_down("KeyQ", () => { sendData("glf"); });
            break;
        case "KeyW":
            do_by_down("KeyW", () => { sendData("gff"); });
            break;
        case "KeyE":
            do_by_down("KeyE", () => { sendData("grf"); });
            break;
        case "KeyD":
            do_by_down("KeyD", () => { sendData("grr"); });
            break;
        case "KeyX":
            do_by_down("KeyX", () => { sendData("grb"); });
            break;
        case "KeyS":
            do_by_down("KeyS", () => { sendData("gbb"); });
            break;
        case "KeyZ":
            do_by_down("KeyZ", () => { sendData("glb"); });
            break;
        case "KeyA":
            do_by_down("KeyA", () => { sendData("gll"); });
            break;
        case "ArrowUp":
            do_by_down("ArrowUp", () => {sendData("cup");});
            break;
        case "ArrowDown":
            do_by_down("ArrowDown", () => {sendData("cdn");});
            break;
        case "ArrowLeft":
            do_by_down("ArrowLeft", ()=>{sendData("tlf");});
            break;
        case "ArrowRight":
            do_by_down("ArrowRight", ()=>{sendData("trt");});
            break;
        default:
            break;
    }
});

window.addEventListener("keyup", event => {
    switch (event.code) {
        case "KeyQ":
            do_by_up("KeyQ", () => { sendData("gsp"); });
            break;
        case "KeyW":
            do_by_up("KeyW", () => { sendData("gsp"); });
            break;
        case "KeyE":
            do_by_up("KeyE", () => { sendData("gsp"); });
            break;
        case "KeyD":
            do_by_up("KeyD", () => { sendData("gsp"); });
            break;
        case "KeyX":
            do_by_up("KeyX", () => { sendData("gsp"); });
            break;
        case "KeyS":
            do_by_up("KeyS", () => { sendData("gsp"); });
            break;
        case "KeyZ":
            do_by_up("KeyZ", () => { sendData("gsp"); });
            break;
        case "KeyA":
            do_by_up("KeyA", () => { sendData("gsp"); });
            break;
        case "ArrowUp":
            do_by_up("ArrowUp", () => {sendData("csp");});
            break;
        case "ArrowDown":
            do_by_up("ArrowDown", () => {sendData("csp");});
            break;
        case "ArrowLeft":
            do_by_up("ArrowLeft", ()=>{sendData("tsp");});
            break;
        case "ArrowRight":
            do_by_up("ArrowRight", ()=>{sendData("tsp");});
            break;
        default:
            break;
    }
});