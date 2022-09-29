export default function Table(props) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Focus
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Reps
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total Time
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                        Total Distance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                  <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {props.workouts.focus}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{props.workouts.reps}</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{props.workouts.totalTime}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{props.workouts.totalDistance}</td>
                    {/* {props.workouts.map((workout) => (
                      <tr key={workout.id} className="divide-x divide-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                          {workout.focus}
                        </td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{workout.reps}</td>
                        <td className="whitespace-nowrap p-4 text-sm text-gray-500">{workout.totalTime}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{workout.totalDistance}</td>
                      </tr>
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }