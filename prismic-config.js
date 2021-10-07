import Prismic from "prismic-javascript";
const apiEndpoint = "https://vercel-prismic-multilang.prismic.io/api/v2";

const Client = (req = undefined) => {
  return Prismic.client(apiEndpoint, { req });
};

export default Client;
