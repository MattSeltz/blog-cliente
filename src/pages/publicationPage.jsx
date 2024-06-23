import { Link } from "react-router-dom";

export const PublicationPage = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-16 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 ">
        <div>
          <div>
            <div>
              <p className="text-base font-semibold leading-7 text-indigo-600">
                <Link to="/user/1">Michael Foster</Link>
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Boost your conversion rate
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Illo sint voluptas. Error voluptates culpa eligendi. Hic vel
                totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed
                exercitationem placeat consectetur nulla deserunt vel. Iusto
                corrupti dicta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
