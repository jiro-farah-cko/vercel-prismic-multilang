import Client from "../../prismic-config"; // import from wherever this is set
import linkResolver from "../../utils/linkResolver"; // import from wherever this is set

const Preview = async (req, res) => {
  const { token: localPrismicRef, documentId } = req.query;
  const redirectUrl = await Client(req)
    .getPreviewResolver(localPrismicRef, documentId)
    .resolve(linkResolver, "/");

  if (!redirectUrl) {
    return res.status(401).json({ message: "Invalid token" });
  }

  res.setPreviewData({ localPrismicRef });
  res.writeHead(302, { Location: `${redirectUrl}` });
  res.end();
};

export default Preview;
