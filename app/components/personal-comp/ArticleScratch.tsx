'use client';

import { Table } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getArticle, getArticleList } from "../../service/article-service";

function ArticleScratch() {
  const router = useRouter();
  const [articleList, setArticleList] = useState<any[]>([]);
  const columns = [
    { title: "序号", dataIndex: "index", width: 80 },
    {
      title: "标题",
      dataIndex: "title",
      width: 500,
      render: (text: string) => (
        <a href="#" onClick={(e) => edit(text, e)}>
          {text}
        </a>
      ),
    },
    { title: "内容", dataIndex: "content" },
  ];

  const edit = async (title: string, e: any) => {
    e.preventDefault();
    let content = await getArticle(title);
    router.push("/personal?selectedKey=article-write", { state: { title, content } });
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