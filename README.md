# Next.js + microCMS

Next.js の getStaticProps と getStaticPaths を使って microCMS のデータを取得して、静的にビルドするサンプル。

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

microCMS で取得し API キーとエンドポイントを env ファイルに記述。

```
API_KEY=xxxxx
ENDPOINT=https://your.microcms.io/api/v1
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

  const res = await fetch(process.env.endpoint + '/blogs', key);

  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
}
```

## getStaticPaths

ダイナミックルーティングの使用時に静的なファイルを生成する API。

ファイル名に[]をつけるとダイナミックルーティングになる。そのファイル内で getStaticPaths を使うことで、ダイナミックルーティングを活用して、静的なファイルを生成できる。

```javascript
export async function getStaticPaths() {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.endpoint + '/blogs', key);
  const repos = await res.json();

  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  return {paths, fallback: false};
}
```

# 参考

https://qiita.com/matamatanot/items/1735984f40540b8bdf91
