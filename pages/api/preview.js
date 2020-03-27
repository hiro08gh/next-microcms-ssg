import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  //シークレットキーの確認
  if (req.query.secret !== process.env.preview_key || !req.query.id) {
    return res.status(401).json({message: 'Invalid token'});
  }

  const key = {
    headers: {'X-API-KEY': process.env.api_key},
  };

  const url =
    process.env.endpoint + req.query.id + `?draftKey=${req.query.draftKey}`;

  const post = await fetch(url, key);

  //postデータが存在しない場合、401を返す
  if (!post) {
    return res.status(401).json({message: 'Invalid slug'});
  }
  console.log(post.data);
  res.setPreviewData({});

  //TODO URLのリライト実装
  //res.writeHead(307, {Location: `/blogs/${post.data.id}`});
  res.end();
};
