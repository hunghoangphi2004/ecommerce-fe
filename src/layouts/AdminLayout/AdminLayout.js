import { Layout } from "antd";
import { Outlet, Link } from "react-router-dom";
import {
    SettingOutlined,
    ProductOutlined,
    TagsOutlined,
    DashboardOutlined,
    AccountBookOutlined,
    UserOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Divider, Menu, Input, Avatar, Dropdown } from 'antd';
import { useState } from "react";
import "./AdminLayout.scss";
import logo from "../../assets/images/logo.png";

const { Header, Sider, Content } = Layout;
const { Search } = Input;

function LayoutAdmin() {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [search, setSearch] = useState("");

    const menuItems = [
        {
            type: "group",
            label: "GENERAL",
            children: [
                {
                    key: "dashboard",
                    icon: <DashboardOutlined />,
                    label: <Link to="/admin">Tổng quan</Link>,
                },
                {
                    key: "product",
                    icon: <ProductOutlined />,
                    label: <Link to="/admin/products">Sản phẩm</Link>,
                },
                {
                    key: "inventory",
                    icon: <TagsOutlined />,
                    label: <Link to="/admin/categories">Danh mục</Link>,
                },
            ],
        },
        {
            type: "group",
            label: "ACCOUNT",
            children: [
                {
                    key: "settings",
                    icon: <SettingOutlined />,
                    label: "Cài đặt chung",
                },
                {
                    key: "users",
                    icon: <AccountBookOutlined />,
                    label: "Quản lý tài khoản",
                },
            ],
        },
    ];

    const AuthItems = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "Hồ sơ",
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Cài đặt",
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
        },
    ];

    const handleSearch = (value) => {
        setSearch(value)
    }

    return (
        <Layout className="admin-layout">

            <Sider width={300} className="admin-layout__sider">
                <>
                    <div className="admin-layout__logo">
                        <img src={logo} alt="logo"></img>
                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        defaultOpenKeys={['sub1']}
                        items={menuItems}
                    />
                </>
            </Sider>

            <Layout>

                <Header className="admin-layout__header">
                    <Search placeholder="Search" loading={loadingSearch} onSearch={handleSearch} />
                    <Dropdown menu={{ items: AuthItems }} placement="bottomRight">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <Avatar src="https://i.pravatar.cc/150" />
                            <span>Admin</span>
                        </div>
                    </Dropdown>
                </Header>
                <Divider />

                <Content className="admin-layout__content">
                    <Outlet context={{ search }}/>
                </Content>

            </Layout>

        </Layout>
    );
}

export default LayoutAdmin;