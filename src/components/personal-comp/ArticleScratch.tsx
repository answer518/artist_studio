import { Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getArticle, getArticleList } from "../../service/store-service";

function ArticleScratch() {
  const navigate = useNavigate();
  const [articleList, setArticleList] = useState([]);
  const columns = [
    { title: "序号", dataIndex: "index", width: 80 },
    {
      title: "标题",
      dataIndex: "title",
      width: 500,
      render: (text: string) => (
        <a
          href="javascript: void(0);"
          target="_blank"
          onClick={(e) => edit(text, e)}
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ),
    },
    { title: "内容", dataIndex: "content" },
  ];

  const edit = async (title: string, e: any) => {
    let content = await getArticle(title);
    navigate("/personal/article-write", { state: { title, content } });
  };

  useEffect(() => {
    loadArticleList();
  }, []);

  async function loadArticleList() {
    const list = await getArticleList();
    setArticleList(list);
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={articleList}
        onRow={(record) => {
          return {
            onClick: (event) => {
              console.log(record);
            },
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          };
        }}
        pagination={false}
        bordered
      />
    </div>
  );
}

export default ArticleScratch;
