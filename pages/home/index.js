import { useState } from "react";
import cookie from 'cookie'
import moment from "moment";
import localization from "moment/locale/ja";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Home({ postData }) {
  const [postArr, setPostArr] = useState(postData?.posts);

  moment.updateLocale("ja", localization);

  return (
    <div>
      <div className="bg-gray-50 pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Views For Your Site
            </h2>
          </div>
        </div>
        <div className="mt-10 pb-12 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Last 30 Days
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      1,000
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Last 60 Days
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      5,000
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                      Unique Visitors
                    </dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">
                      10,000
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              Recent Posts
            </h2>
          </div>
          <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {postArr?.map((post) => (
              <div className="mt-6" key={post.title}>
                <div>
                  <a href={post.mainImage} className="inline-block">
                    <span
                      className={classNames(
                        "bg-green-100 text-green-800",
                        "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
                      )}
                    >
                      {post.tag}
                    </span>
                  </a>
                </div>
                <a href={post?.href} className="block mt-4">
                  <p className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {post?.preview}
                  </p>
                </a>
                <div className="mt-6 flex items-center">
                  {/* <div className="flex-shrink-0">
                    <a href={post?.author}>
                      <span className="sr-only">{post.author.name}</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.author.imageUrl}
                        alt=""
                      />
                    </a>
                  </div> */}
                  <div className="ml-3">
                    {/* <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href}>{post.author}</a>
                    </p> */}
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={moment(post.createdAt).format("LL")}>
                        {moment(post.createdAt).format("LL")}
                      </time>
                      <span aria-hidden="true">&middot;</span>
                      <Link key={post.id} href={`/posts/${post?.id}`}>
                        <a>
                          <span>{post.readingTime} Read More</span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  if (!context?.req?.headers?.cookie) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const { token } = cookie.parse(context?.req?.headers?.cookie);

  const res = await fetch(`http://admin-srv/control/posts`, {
    method: "GET",
    headers: {
      Authorization: `${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const data = await res.json();

  return {
    props: {
      postData: data?.data,
    },
  };
}

export default Home;
