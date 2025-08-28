import { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const columns = [
    { title: "序号", dataIndex: "index", width: 80 },
    { title: "ID", dataIndex: "author", width: 100 },
    {
      title: "标题",
      dataIndex: "title",
      width: 500,
      render: (text: string) => (
        <Link to={`/article/${text}`} target="_blank">
          {text}
        </Link>
      ),
    },
    { title: "内容", dataIndex: "content" },
  ];

  useEffect(() => {
    loadArticleList();
  }, []);

  async function loadArticleList() {
    setArticleList([]);
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

export default ArticleList;
