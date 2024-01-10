import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 37b0fc0492msha5063358914a3a9p1ce51fjsnca84da35208f
const cryptoNewsHeaders = {
  "X-RapidAPI-Key": "ca921f9a9amsh179c0d383e5d267p1f029djsn9a131afe310a",
  "X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
};

const baseUrl = "https:cryptocurrency-news2.p.rapidapi.com/v1/coindesk";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count }) => createRequest(`?limit=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
