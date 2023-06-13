import { DashboardOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

// TODO: add icons

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
          {
            key: "main-catalog-combo",
            path: `${APP_PREFIX_PATH}/main/catalog/combo`,
            title: "sidenav.main.catalog.combo",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "main-orders",
        path: `${APP_PREFIX_PATH}/main/orders`,
        title: "sidenav.main.orders",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "main-users",
        path: `${APP_PREFIX_PATH}/main/users`,
        title: "sidenav.main.users",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "main-users-list",
            path: `${APP_PREFIX_PATH}/main/users/list`,
            title: "sidenav.main.users.list",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "main-users-grups",
            path: `${APP_PREFIX_PATH}/main/users/groups`,
            title: "sidenav.main.users.groups",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "main-banners",
        path: `${APP_PREFIX_PATH}/main/banners`,
        title: "sidenav.main.banners",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "main-promo-codes",
        path: `${APP_PREFIX_PATH}/main/promo-codes`,
        title: "sidenav.main.promoCodes",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "main-offline-spots",
        path: `${APP_PREFIX_PATH}/main/offline-spots`,
        title: "sidenav.main.offlineSpots",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "main-offline-spots-addresses",
            path: `${APP_PREFIX_PATH}/main/offline-spots/addresses`,
            title: "sidenav.main.offlineSpots.addresses",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "main-offline-spots-geofences",
            path: `${APP_PREFIX_PATH}/main/offline-spots/geofences`,
            title: "sidenav.main.offlineSpots.geofences",
            icon: DashboardOutlined,
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "main-employees",
        path: `${APP_PREFIX_PATH}/main/employees`,
        title: "sidenav.main.employees",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "main-mailings",
        path: `${APP_PREFIX_PATH}/main/mailings`,
        title: "sidenav.main.mailings",
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...mainNavTree];

export default navigationConfig;
