function batchInterceptor(instance) {
  instance.interceptors.request.use(
    (request) => {
      //The ids param allows array or comma separated list of ids
      request.params.ids = Array.isArray(request.params.ids)
        ? request.params.ids.join(',')
        : request.params.ids;

      return request;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => {
      const {config, data} = response;
      const ids = config.params.ids.split(',');

      //does not need to check for all items because it's handled by Happeo JS library
      const atLeastOneItemExist = data.items.some((item) =>
        ids.includes(item.id)
      );

      if (!atLeastOneItemExist) {
        return Promise.reject(
          `${config.params.ids} is missing from the response`
        );
      }

      return data;
    },
    (error) => Promise.reject(error)
  );
}

export default batchInterceptor;
