import React from "react";

const AdminPageFallback = () => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-slate-700 dark:focus:ring-gray-600 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              {/** create a logo skeleton placeholder */}
              <span className="mr-3 h-12 w-[250px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600" />
              <span className="mr-3 h-6 w-[250px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600" />
            </div>
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <div className="mr-3 h-6 w-[120px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-slate-200 bg-white pt-20 transition-transform dark:border-slate-700 dark:bg-slate-800 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-slate-800">
          <ul className="mt-4 space-y-2 font-medium">
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600"></div>
            </li>
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600"></div>
            </li>
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600"></div>
            </li>
            <li>
              <div className="mb-6 mr-3 h-6 w-[200px] animate-pulse rounded-full bg-slate-200 dark:bg-slate-600"></div>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex min-h-screen animate-pulse items-center justify-center bg-slate-100 dark:bg-slate-600"></div>
    </>
  );
};

export default AdminPageFallback;
