import client from './apiClient';
import axios from 'axios';

jest.setTimeout(15000);

// All requests should run at the same time and produce only one request
// to the backend. All requests should return or reject.
describe('batch requests', () => {
  const batchUrl = '/file-batch-api';

  it('All requests should run at the same time and produce only one request', async () => {
    const apiClient = client();

    // Should return [{id:”fileid1”},{id:”fileid2”}]
    const firstRequest = apiClient.get(batchUrl, {
      params: {ids: ['fileid1', 'fileid2']},
    });

    // Should return [{id:”fileid2”}]
    const secondRequest = apiClient.get(batchUrl, {params: {ids: ['fileid2']}});

    // Should reject as the fileid3 is missing from the response
    const thirdRequest = apiClient.get(batchUrl, {params: {ids: ['fileid3']}});

    // Should return [{id:”fileid1”}}]
    const fourthRequest = apiClient.get(batchUrl, {
      params: {ids: ['fileid1', 'fileid3']},
    });

    //we can also use apiClient.all() and apiClient.spread here
    //But, with Promise.all() there is a specific behavior.
    //In this case at least one request will be rejected and
    //all requests will be rejected and code will go to .catch() sections
    var [firstResponse, secondResponse, thirdResponse, fourthResponse] =
      await Promise.allSettled([
        firstRequest,
        secondRequest,
        thirdRequest,
        fourthRequest,
      ]);

    expect(firstResponse.value).toEqual([{id: 'fileid1'}, {id: 'fileid2'}]);
    expect(secondResponse.value).toEqual([{id: 'fileid2'}]);
    expect(thirdResponse.reason).toEqual(
      'fileid3 is missing from the response'
    );
    expect(fourthResponse.value).toEqual([{id: 'fileid1'}]);

    expect.assertions(4);
  });
});
