import fetch from 'isomorphic-unfetch';

const Blog = ({blog}) => {
  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.endpoint + '/blogs', key);
  const repos = await res.json();

  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  return {paths, fallback: false};
};

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.api_key},
  };

  const res = await fetch(process.env.endpoint + '/blogs/' + id, key);
  const blog = await res.json();

  return {
    props: {
      blog: blog,
    },
  };
};

export default Blog;
