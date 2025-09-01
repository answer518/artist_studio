/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { readArticle } from "../../service/ipfs-service";
import { ownedTypeNFT } from "../../service/nft-service";

function ArticleList() {
  const navigator = useNavigate();
  const [articleList, setArticleList] = useState<any[]>([]);
  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      width: 500,
      render: (text: string) => (
        <Link to={`/article/${text}`} target="_blank">
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
    let { success, data } = await ownedTypeNFT("article");
    if (success) {
      let rdata = data.map((e, i) => ({ index: i, entity: e, ...e }));
      setArticleList(rdata);
    }
  }

  const view = async (entity: any) => {
    let content = await readArticle(entity.uri);
    navigator("/personal/article-read", {
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
