"use client";
import { ConfigProvider, notification } from "antd";
import { createContext, useState } from "react";

export const AntContext = createContext();
const AntProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification({
    placement: "bottomRight",
  });
  const [collapsed, setCollapsed] = useState(false);
  return (
    <AntContext.Provider value={{ api, collapsed, setCollapsed }}>
      <ConfigProvider
      theme={{
        token:{
            colorPrimary:"#009667"
        }
      }}
      >
        {contextHolder}
        {children}
      </ConfigProvider>
    </AntContext.Provider>
  );
};

export default AntProvider;
