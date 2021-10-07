import Client from "../prismic-config";

export const getSingleTypeData = async (type, ref, locale) => {
  try {
    return await Client().getSingle(type, { ref, lang: locale });
  } catch (error) {
    console.error(error);
  }
};
