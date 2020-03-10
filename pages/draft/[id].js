import axios from 'axios';

const Draft = ({blog}) => {
  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
};
export async function getStaticPaths() {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await axios.get(process.env.endpoint, key);
  const repos = await res.data.contents;
  const paths = repos.map(repo => `/draft/${repo.id}`);
  return {paths, fallback: false};
}

// ビルド時に実行される
export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(context.preview);
  const key = {
    headers: {'X-API-KEY': process.env.api_key},
  };

  console.log(
    process.env.endpoint +
      id +
      `${context.preview ? '?draftKey=ZJBBDP0Bvx' : null}`,
  );

  const res = await axios.get(
    'https://hiro08.microcms.io/api/v1/blogs/xSBUPb7nZ?draftKey=ZJBBDP0Bvx',
    key,
  );
  const blog = await res.data;
  return {
    props: {
      blog: blog,
    },
  };
}

export default Draft;
