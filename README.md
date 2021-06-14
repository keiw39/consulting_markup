# cosme_markup
「コンサルティング会社」静的ページのマークアップ

## 実装したサイト
- [Bold Consulting Service.](https://works04.k-watanabe39.com/)

BASIC認証をかけてます。

ID：works<br>
PW：works

### ポイント
- ローディングアニメーションの実装
- ハンバーガーメニューのメニュー外をクリックしても閉じれるようにユーザビリティを意識した実装を行いました
- 各リンクhover時のアニメーション実装

## 制作環境について
### Gulpを導入
Gulpを導入することによって下記を全て自動化しています。<br>
※Sass公式推奨の「Dart Sass」で記述しております
- Sassのコンパイル
- ブラウザシンク(ファイル編集後、ブラウザを更新→反映する自動リロードを行う)
- ベンダープレフィックスの付与
- 画像の自動圧縮
### Gulpの起動
1. gulpfile.jsおよびpackage.jsonがある状態で下記コマンドを打つ。

※node_modulesおよびpackage-lock.jsonが生成される
```
$ npm i
```
2. gulp起動の下記コマンドを打つ。
```
$ npx gulp
```
3. gulpfile.jsに記述されたタスクが実行されます。


## 経緯
[CODE MENTOR](https://codementor.arutega.jp/)様での課題を基に制作しました。
