# Next.js + microCMS

Next.jsのgetStaticPropsとgetStaticPathsを使ってmicroCMSのデータを取得して、静的にビルドするサンプル。

# バージョン

- Next.js 9.3.0
- React 16.13.0
- ReactDOM 16.13.0

# 始め方

```
$ yarn install
```

.env.sample をコピー
```
$ cp .env.sample .env
```

## 開発サーバーの立ち上げ

microCMSで取得しAPIキーとエンドポイントをenvファイルに記述。

```
API_KEY=xxxxx
ENDPOINT=https://your.microcms.io/api/v1/blog
PREVIEW_KEY=xxxxxxx
```

アプリケーションの立ち上げ

```
$ yarn dev
```

## SSG

```
$ yarn export
```

# ポイント

## getStaticProps

静的なファイルを事前に生成する API。

ビルド時に実行させる。クライアントサイドでは実行されず、必ずサーバーサイドで実行される。

```javascript
export async function getStaticProps() {
  const key = {
    headers: {'X-API-KEY': process.env.api_key},
  };

  const res = await axios.get(process.env.endpoint, key);

  const data = await res.data.contents;

  return {
    props: {
      blogs: data,
    },
  };
}
```

## getStaticPaths

ダイナミックルーティングの使用時に静的なファイルを生成するAPI。

ファイルに[]をつけるとダイナミックルーティングになる。そのファイル内で getStaticPaths を使うことで、ダイナミックルーティングを活用して、静的なファイルを生成できる。

```javascript
export async function getStaticPaths() {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await axios.get(process.env.endpoint, key);
  const repos = await res.data.contents;
  const paths = repos.map(repo => `/blogs/${repo.id}`);
  return {paths, fallback: false};
}
```

# 参考

https://qiita.com/matamatanot/items/1735984f40540b8bdf91
