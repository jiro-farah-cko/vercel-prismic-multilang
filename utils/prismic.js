import Client from "../prismic-config";
import Prismic from "prismic-javascript";

export const getSingleTypeData = async (type, ref, locale) => {
  try {
    return await Client().getSingle(type, { ref, lang: locale });
  } catch (error) {
    console.error(error);
  }
};

export const getDataByUID = async (type, uid, ref, locale, params) => {
  try {
    return await Client().getByUID(type, uid, {
      ref,
      lang: locale,
      ...params,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

async function fetchDocs(type, page = 1, routes = []) {
  const response = await Client().query(
    Prismic.Predicates.at("document.type", type),
    { pageSize: 100, page }
  );
  const { results, results_size, total_results_size } = response;
  const allRoutes = routes.concat(results);
  if (results_size + routes.length < total_results_size) {
    return fetchDocs(type, page + 1, allRoutes);
  }
  return [...new Set(allRoutes)];
}

/**
 *
 * @param {prismic custom_type} type
 * @param {parameters that need to be passed to the api call i.e pagination} filters
 * @returns {all routes for that custom type}
 */
export const queryRepeatableDocuments = async (type) => {
  const allRoutes = await fetchDocs(type);
  return allRoutes;
};
