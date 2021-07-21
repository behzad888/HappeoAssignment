import client from './apiClient';
jest.setTimeout(15000);

// All requests should run at the same time and produce only one request
// to the backend. All requests should return or reject.
describe('batch requests', () => {
  const batchUrl = '/file-batch-api';

  it('All requests should run at the same time and produce only one request', async () => {
    const apiClient = client();

    // Should return [{id:”fileid1”},{id:”fileid2”}]
    const firstRequest = apiClient
      .get(batchUrl, {
        params: {ids: ['fileid1', 'fileid2']},
      })
      .then(({items}) => {
        expect(items).toEqual([{id: 'fileid1'}, {id: 'fileid2'}]);
      });

    // Should return [{id:”fileid2”}]
    const secondRequest = apiClient
      .get(batchUrl, {params: {ids: ['fileid2']}})
      .then(({items}) => {
        expect(items).toEqual([{id: 'fileid2'}]);
      });

    // Should reject as the fileid3 is missing from the response
    const thirdRequest = apiClient
      .get(batchUrl, {params: {ids: ['fileid3']}})
      .catch((err) => {
        expect(err).toEqual('fileid3 is missing from the response');
      });

    // Should return [{id:”fileid1”}}]
    const fourthRequest = apiClient
      .get(batchUrl, {
        params: {ids: ['fileid1', 'fileid3']},
      })
      .then(({items}) => {
        expect(items).toEqual([{id: 'fileid1'}]);
      });

    await Promise.all([
      firstRequest,
      secondRequest,
      thirdRequest,
      fourthRequest,
    ]);
    expect.assertions(4);
  });
});
