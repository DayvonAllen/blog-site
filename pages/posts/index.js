import Link from "next/link";
import { useState } from "react";
import buildClient from "../../api/buildClient";
import moment from "moment";
import localization from "moment/locale/ja";

function Posts({ posts, serverError }) {
  const [postArr, setPostArr] = useState(posts);

  if (serverError) {
    return <p>Loading...</p>;
  }

  moment.updateLocale("ja", localization);

  return (
    <div>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              All Your Post
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              A sorted list of your posts.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {postArr.map((post) => (
              <Link key={post.id} href={`/posts/${post?.id}`}>
                <a>
                  <div
                    key={post.id}
                    className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover"
                        // src={post.imageUrl}
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a href={post.href} className="block mt-2">
                          <p className="text-xl font-semibold text-gray-900">
                            {post.title}
                          </p>
                          <p className="mt-3 text-base text-gray-500">
                            {post.preview}
                          </p>
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="ml-3">
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time
                              dateTime={moment(post.createdAt).format("LL")}
                            >
                              {moment(post.createdAt).format("LL")}
                            </time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{post.readingTime} Read More</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <nav
        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">6</span> of{" "}
            <span className="font-medium">6</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </nav>
    </div>
  );
}
export async function getServerSideProps(context) {
  if(!context?.req?.headers?.cookie) {
    return {
      redirect: {
      destination: "/",
    }}
  } 

  return {
    props: {
      
    }
  };
};

export default Posts;
