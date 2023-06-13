import { DashboardOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const mainNavTree = [
  {
    key: "main",
    path: `${APP_PREFIX_PATH}/main`,
    title: "sidenav.main",
    icon: DashboardOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: "main-dashboard",
        path: `${APP_PREFIX_PATH}/main/dashboard`,
        title: "sidenav.main.dashboard",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "main-catalog",
        path: `${APP_PREFIX_PATH}/main/catalog`,
        title: "sidenav.main.catalog",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "main-catalog-products",
            path: `${APP_PREFIX_PATH}/main/catalog/products`,
            title: "sidenav.main.catalog.products",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "main-catalog-categories",
            path: `${APP_PREFIX_PATH}/main/catalog/categories`,
            title: "sidenav.main.catalog.categories",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "main-catalog-collections",
            path: `${APP_PREFIX_PATH}/main/catalog/collections`,
            title: "sidenav.main.catalog.collections",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const navigationConfig = [...mainNavTree];

export default navigationConfig;
