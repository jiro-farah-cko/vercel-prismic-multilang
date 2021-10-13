export default function linkResolver(doc) {
  if (doc.type === "home") {
    return `/${doc.lang}/`;
  }

  if (doc.type === "about") {
    return `/${doc.lang}/about`;
  }

  if (doc.type === "dynamic") {
    return `/${doc.lang}/${doc.uid}`;
  }

  return "/";
}
