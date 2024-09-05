import { type MyPage } from "@/components/layouts/types";

const AdminUsersIndex: MyPage = () => {
  // const getAllUsers = api.admin.getAllUsers.useQuery();
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="mt-16 rounded-lg border-2 border-dashed border-slate-200 p-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="">
              Aşağıdaki tablo temsilidir. Aşağıdakileri inceleyeceğiz (TanStack
              Table):
              <a
                href="https://ui.shadcn.com/docs/components/data-table"
                className="my-4 block"
              >
                https://ui.shadcn.com/docs/components/data-table
              </a>
              <a
                href="https://ui.shadcn.com/examples/tasks"
                className="my-4 block"
              >
                https://ui.shadcn.com/examples/tasks
              </a>
            </div>
            <div className="flex items-center justify-between bg-white pb-4 dark:bg-slate-900">
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-slate-700 dark:focus:ring-gray-700"
                  type="button"
                >
                  Action
                  <svg
                    className="ml-2.5 h-2.5 w-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownAction"
                  className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-slate-700"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white"
                      >
                        Reward
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white"
                      >
                        Promote
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:text-white"
                      >
                        Activate account
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-slate-600 dark:hover:text-white"
                    >
                      Delete User
                    </a>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  className="block w-80 rounded-lg border border-gray-300 bg-slate-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search for users"
                />
              </div>
            </div>
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-slate-50 text-xs uppercase text-gray-700 dark:bg-slate-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ad Soyad
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Firma İsmi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rol
                  </th>
                  <th scope="col" className="px-6 py-3">
                    E-Posta
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Telefon Numarası
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {getAllUsers?.data?.map((user) => {
                  return (
                    <tr
                      key={user.userId}
                      className="border-b bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-600"
                    >
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 bg-slate-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                          />
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white"
                      >
                        <Image
                          className="h-10 w-10 rounded-full"
                          width={200}
                          height={200}
                          src="/docs/images/people/profile-picture-1.jpg"
                          alt="Jese image"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{user.companyName}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>{" "}
                          {user.role}
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.personalPhone}</td>
                      <td className="px-6 py-4">{user.address}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit user
                        </a>
                      </td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsersIndex;
AdminUsersIndex.Layout = "Admin";
