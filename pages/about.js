import { getSingleTypeData } from "../utils/prismic";
import { RichText } from "prismic-reactjs";
import useUpdatePreviewRef from "../utils/useUpdatePreviewRef";

export default function About({ data, previewRef, id }) {
  useUpdatePreviewRef(previewRef, id);
  if (data) {
    return <>{RichText.asText(data.title)}</>;
  }
  return null;
}

export async function getStaticProps(context) {
  const { previewData, locale } = context;
  const previewRef = previewData ? previewData.ref : null;
  const aboutPageData = await getSingleTypeData("about", previewRef, locale);

  if (!aboutPageData) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      data: aboutPageData?.data || null,
      previewRef,
      id: aboutPageData?.id || null,
      revalidate: 1,
    },
  };
}
