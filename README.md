# LittleBrotherController
LittleBrotherのブラウザ用クライアントアプリです．

## 環境構築
1. Node.jsのLTSを[ダウンロード](https://nodejs.org/ja/)してインストールします．  
1. このRepositoryをダウンロードします．
    ```
    git clone https://github.com/Complete-Foods-are-Good-2nd/LittleBrotherController.git
    ```
1. LittleBrotherControllerディレクトリに移動します．  
1. 必要なライブラリをインストールします．
    ```
    npm install
    ```

## 動かす  
1. LittleBrotherControllerディレクトリに移動します．
1. PowerShellの場合はセキュリティ設定をごにょごにょします．これはターミナルを開くたびに実行してください．  
    ```
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
    ```
1. ビルドとサーバーのテスト用サーバーの起動をします．  
    ```
    parcel .\index.html --out-dir docs  --public-url https://complete-foods-are-good-2nd.github.io/LittleBrotherController/
    ```
1. 表示されたURLにアクセスします．  

### GitHub Pagesで公開されてるよ
[ここ](https://complete-foods-are-good-2nd.github.io/LittleBrotherController/)  
以下のようにRoom IDとSignaling Keyを指定することでLittleBrother本体への接続が可能になります．  
```
https://complete-foods-are-good-2nd.github.io/LittleBrotherController/?roomId=[Room ID]&signalingKey=[Signaling Key]
```

## ライブラリに関する説明
- [Font Awesome](https://fontawesome.com/)  
    - 多数のベクターアイコンを使用できます．
    - [こちらの記事](https://qiita.com/riversun/items/4faa56ac40071f638313)の後半の使い方が容量が増えにくく良いと考えています．  
- [BootStrap](https://getbootstrap.com/)
    - フォーム、ボタン、ナビゲーションなどのテンプレートを使用できます．  
- [ayame-web-sdk](https://github.com/OpenAyame/ayame-web-sdk)
    - LittleBrother本体に載せる[WebRTC Native Client Momo](https://github.com/shiguredo/momo)との通信に用います．  

## コントリビューターに対する注意
(Apache License 2.0で配布されている成果物を使用する場合)  
- ソース形式の派生成果物を頒布する場合は，ソース形式の成果物に含まれている著作権，特許，商標、および帰属についての告知を，派生成果物のどこにも関係しないものは除いて，すべて派生成果物に入れること．
- 変更を加えたファイルについては，あなたが変更したということがよくわかるような告知を入れること．

## ライセンス
このソフトウェアはMITライセンスで配布されています．  
このソフトウェアは、 Apache License 2.0で配布されている成果物である[ayame-web-sdk](https://github.com/OpenAyame/ayame-web-sdk)を含んでいます．  
```
Copyright 2019, Kyoko Kadowaki aka kdxu (Original Author)
Copyright 2019-2020, Shiguredo Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
このソフトウェアは、 Apache License 2.0で配布されている成果物である[ayame-web-sdk-samples](https://github.com/OpenAyame/ayame-web-sdk-samples)を含んでいます． 
```
Copyright 2019, Kyoko Kadowaki aka kdxu (Original Author)
Copyright 2019-2020, Shiguredo Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
