import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, Button, notification } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { usersAdapter } from "./adapters";
import { NO_DATA } from "constants/ViewConstant";
import userService from "services/UserService";
import "./index.css";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import Utils from "utils";

export class UserList extends Component {
  state = {
    users: [],
    userProfileVisible: false,
    selectedUser: null,
    isLoading: false,
  };

  componentDidMount = async () => {
    try {
      this.setState({ isLoading: true });

      const users = await userService.getUsers();

      if (!users || !Array.isArray(users)) {
        throw new Error(`Received invalid users: ${users}.`);
      }

      this.setState({
        users: usersAdapter(users),
      });
    } catch (e) {
      Utils.handleError(
        e,
        "Не удалось получить список клиентов. Попробуйте перезагрузить страницу."
      );
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.id !== userId),
    });
    notification.success({
      message: `Пользователь с id ${userId} удален.`,
      duration: 2,
    });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  handleUserClick = (id) => {
    this.props.history.push(`${APP_PREFIX_PATH}/main/users/${id}/edit`);
  };

  render() {
    const { users, userProfileVisible, selectedUser, isLoading } = this.state;

    const tableColumns = [
      {
        title: "Клиент",
        dataIndex: "name",
        render: (_, record) => (
          <div
            className="d-flex user-list__user-cell"
            onClick={() => this.handleUserClick(record.id)}
          >
            <AvatarStatus
              src={record.img}
              name={record.name}
              subTitle={record.email}
            />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Роль",
        dataIndex: "role",
        render: (role) => role || NO_DATA,
        sorter: {
          compare: (a, b) => a.role?.length - b.role?.length,
        },
      },
      {
        title: "Был в сети",
        dataIndex: "lastOnline",
        render: (date) => (
          <span>
            {date ? moment.unix(date).format("MM/DD/YYYY") : NO_DATA}{" "}
          </span>
        ),
        sorter: (a, b) =>
          a && b
            ? moment(a.lastOnline).unix() - moment(b.lastOnline).unix()
            : 0,
      },
      {
        title: "Статус",
        dataIndex: "status",
        render: (status) => (
          <>
            {status ? (
              <Tag
                className="text-capitalize"
                color={status === "active" ? "cyan" : "red"}
              >
                {status}
              </Tag>
            ) : (
              NO_DATA
            )}
          </>
        ),
        sorter: {
          compare: (a, b) => a.status?.length - b.status?.length,
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right">
            <Tooltip title="Просмотр">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Удалить">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <Table
          columns={tableColumns}
          dataSource={users}
          rowKey="id"
          loading={isLoading}
        />
        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            this.closeUserProfile();
          }}
        />
      </Card>
    );
  }
}

export default withRouter(UserList);
