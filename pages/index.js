import { getSingleTypeData } from "../utils/prismic";
import { RichText } from "prismic-reactjs";
import useUpdatePreviewRef from "../utils/useUpdatePreviewRef";

export default function Home({ data, previewRef, id }) {
  useUpdatePreviewRef(previewRef, id);
  if (data) {
    return <>{RichText.asText(data.title)}</>;
  }
  return <h1>homepage -</h1>;
}

export async function getStaticProps(context) {
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
