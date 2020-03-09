import axios from 'axios';
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

export default Home;
