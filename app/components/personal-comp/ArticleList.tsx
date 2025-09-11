'use client';

import { useEffect, useState } from "react";
import { Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { readArticle } from "../../service/ipfs-service";
import { owned } from "../../service/nft-service";

function ArticleList() {
  const router = useRouter();
  const [articleList, setArticleList] = useState<any[]>([]);
  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      width: 500,
      render: (text: string) => (
        <Link href={`/article/${text}`} target="_blank">
          {text}
        </Link>
      ),
    },
    {
      title: "内容",
      dataIndex: "entity",
      width: 500,
      render: (entity: any) => (
        <a href="#" target="_self" onClick={(e) => view(entity)}>
          阅读
        </a>
      ),
    },
  ];

  useEffect(() => {
    loadArticleList();
  }, []);

  async function loadArticleList() {
    let { success, data } = await owned("article");
    if (success) {
      let rdata = data.map((e, i) => ({ index: i, entity: e, ...e }));
      setArticleList(rdata);
    }
  }

  const view = async (entity: any) => {
    let content = await readArticle(entity.uri);
    router.push("/personal?selectedKey=article-read", {
      state: { title: entity.name, content },
    });
  };

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