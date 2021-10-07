export default function linkResolver(doc) {
  if (doc.type === "home") {
    return `/${doc.lang}/`;
  }

  if (doc.type === "about") {
    return `/${doc.lang}/about`;
  }

  return "/";
}

//  if (doc.type === "page") {
//    return `/${doc.lang}/${doc.uid}`;
//  }
