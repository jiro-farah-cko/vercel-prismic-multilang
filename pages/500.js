import { getSingleTypeData } from "../utils/prismic";

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}

export async function getStaticProps(context) {
  /* Making an api  request to mimic what we have on our error page */
  const { previewData, locale } = context;
  const previewRef = previewData ? previewData.ref : null;
  const homepageData = await getSingleTypeData("home", previewRef, locale);

  return {
    props: {
      data: homepageData?.data || null,
      previewRef,
      id: homepageData?.id || null,
      revalidate: 1,
    },
  };
}
