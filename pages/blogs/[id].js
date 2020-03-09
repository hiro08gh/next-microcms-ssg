import axios from 'axios';

const Blog = ({blog}) => {
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
  const paths = repos.map(repo => `/blogs/${repo.id}`);
  return {paths, fallback: false};
}

// ビルド時に実行される
export async function getStaticProps({params}) {
  const id = params.id;
  console.log(id);
  const key = {
    headers: {'X-API-KEY': process.env.api_key},
  };

  const res = await axios.get(process.env.endpoint + id, key);
  const blog = await res.data;
  return {
    props: {
      blog: blog,
    },
  };
}

export default Blog;
