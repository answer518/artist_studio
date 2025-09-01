export const getArticle = async (title: string) => {
  let aid = `article-${title}`;
  return localStorage.getItem(aid);
};
export const saveArticle = async (title: string, content: string) => {
  let aid = `article-${title}`;
  localStorage.setItem(aid, content);
};
export const deleteArticle = async (title: string) => {
  let aid = `article-${title}`;
  localStorage.removeItem(aid);
  return getArticleList();
};
export const getArticleList = async () => {
  let length = localStorage.length;
  let rst = [];
  let index = 0;
  for (let i = 0; i < length; i++) {
    let aid = localStorage.key(i);
    if (aid?.startsWith("article-")) {
      let title = aid.split("-")[1];
      index++;
      rst.push({
        index,
        title,
        content: localStorage.getItem(aid),
      });
    }
  }

  return rst;
};
