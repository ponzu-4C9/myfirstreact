# ベースイメージとしてNode.jsを使用
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsのビルド
RUN npm run build

# アプリケーションを起動
CMD ["npm", "start"]