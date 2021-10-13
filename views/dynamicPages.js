import { queryRepeatableDocuments, getDataByUID } from "../utils/prismic";
import { RichText } from "prismic-reactjs";
import useUpdatePreviewRef from "../utils/useUpdatePreviewRef";

export default function Dyanimic({ data, previewRef, id }) {
  useUpdatePreviewRef(previewRef, id);
  if (data) {
    return <>{RichText.asText(data.title)}</>;
  }
  return null;
}

export async function getStaticProps(context) {
  const { uid } = context.params;
  const { previewData, locale } = context;
  const previewRef = previewData ? previewData.ref : null;
  const dynamicRouteData = await getDataByUID(
    "dynamic",
    uid,
    previewRef,
    locale
  );

  if (!dynamicRouteData) {
    context.statusCode = 404;
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      data: dynamicRouteData?.data || null,
      previewRef,
      id: dynamicRouteData?.id || null,
      revalidate: 1,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments("dynamic");
  return {
    paths: documents.map((doc) => ({ params: { uid: doc.uid } })),
    fallback: "blocking",
  };
}
