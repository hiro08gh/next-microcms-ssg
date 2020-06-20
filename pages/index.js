import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Home = ({blogs}) => {
  return (
    <div>
      {blogs.map(blog => (
        <React.Fragment key={blog.id}>
          <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
            <a>{blog.title}</a>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs', key);

  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
