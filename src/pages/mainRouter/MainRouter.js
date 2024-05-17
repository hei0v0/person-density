import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCache, setCache } from "../../utils/cache";
import FullScreenImage from "../bgiCover/bgiCover";
import MainBox from "../mainBox/MainBox";
import "./index.css";

const { Header, Content } = Layout;
const items = [
  {
    key: "/welcome",
    label: "主页",
  },
  {
    key: "/detection",
    label: "密度监测",
  },
];

export default function MainRouter() {
  const navigate = useNavigate();
  const [item, setItem] = useState({ key: "/welcome", label: "欢迎" });
  const isGraph = getCache("isGraph");

  useEffect(() => {
    if (item.key !== "/detection") {
      setCache("isGraph", false);
    }
    navigate(item.key);
  }, [item, navigate, isGraph]);

  const handleClick = (idx) => {
    setItem(idx);
    navigate(idx.key, { replace: false });
  };

  return (
    <div>
      <FullScreenImage />
      <Layout className={"active"}>
        {/* 标题 */}
        <Header
          style={{
            
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={item.key}
            selectedKeys={item.key}
            onClick={(idx) => handleClick(idx)}
            items={items}
          />
          <div
            style={{
              color: "white",
              margin: "0 auto",
              width: "550px",
              textAlign: "center",
              marginTop: "-64px",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            “集”中生智——密集人群态势智能感知平台
          </div>
        </Header>

        {/* 内容 */}
        <Content className={"site-layout"}>
          <div className="site-layout-background">
            <MainBox item={item} />
          </div>
        </Content>
      </Layout>
    </div>
  );
}
