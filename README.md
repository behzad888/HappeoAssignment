# HappeoAssignment

## Consider the following case
 - We have an API that batches file get requests in our JS API library. The
api returns json.
 - The request that is done to our servers is in uri /api/files/batch and takes in
one query parameter: ids<Array<String>>. For example:
/api/files/batch?ids=[fileid1,fileid2]
 - The API returns a following response: {items:[{id: fileid1, ...data}, {id: fileid2,
...data}]}
 - If a file with id cannot be found or returns an error, it is not provided in the
response items array. For example, if fileid1 and fileid2 are requested, but
fileid1 cannot be found, the return value is: {items:[{id: fileid2, ...data}]}
 - The end result is that a developer can use a call: apiClient.get(“/files/batch”,
{params: ids: “fileid1”}) and does not need to implement batching in the
application layer but this is handled by our JS API library.

## Task
Implement an Axios interceptor that handles batching for the given API request.
All requests should return the requested files.

## Build the app

`npm run build` - the build will be created in the /dist -folder

## Run the test

`npm run test` - This will start the test.js file using `Jest`

## Debug the test

`npm run test:debug` - This will start the test.js file using `Jest` through `chrome://inspect`