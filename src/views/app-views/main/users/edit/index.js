import React, { Component } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  Upload,
  notification,
  Skeleton,
  Empty,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import "./index.css";
import userService from "services/UserService";
import { userAdapter } from "./adapters";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Utils from "utils";

export class EditProfile extends Component {
  state = {
    isLoading: false,
    isUserFound: true,
    isSaving: false,
    isError: false,
  };

  getId() {
    return this.props.match.params.id;
  }

  componentDidMount = async () => {
    try {
      this.setState({ isLoading: true });

      const id = this.getId();
      const user = await userService.getUserById(id);

      if (!user) {
        this.setState({ isUserFound: false });
        return;
      }

      this.setState({
        ...userAdapter(user),
        isUserFound: true,
        isError: false,
      });
    } catch (e) {
      Utils.handleError(
        e,
        "Не удалось получить данные о клиенте. Попробуйте перезагрузить страницу."
      );
      this.setState({ isError: true });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const onFinish = async (values) => {
      try {
        this.setState({ isSaving: true });

        const id = this.getId();
        await userService.putUser(id, values);

        this.props.history.push("..");
        notification.success({ message: "Данные сохранены.", duration: 2 });
      } catch (e) {
        Utils.handleError(e, "Не удалось сохранить данные. Попробуйте позже.");
        console.error(e);
      } finally {
        this.setState({ isSaving: false });
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.error("Failed:", errorInfo);
    };

    const onUploadAavater = (info) => {
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          avatarUrl: imageUrl,
        })
      );
    };

    const onRemoveAvater = () => {
      this.setState({
        avatarUrl: "",
      });
    };

    const {
      name,
      email,
      userName,
      dateOfBirth,
      phoneNumber,
      website,
      address,
      city,
      postcode,
      avatarUrl,
      isSaving,
      isLoading,
      isUserFound,
      isError,
    } = this.state;

    return (
      <>
        {isLoading ? (
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        ) : isError ? (
          <Empty description={<p>Нет данных.</p>} />
        ) : !isUserFound ? (
          <Empty description={<p>Пользователь не найден.</p>} />
        ) : (
          <>
            <Flex
              alignItems="center"
              mobileFlex={false}
              className="text-center text-md-left"
            >
              <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
              <div className="ml-md-3 mt-md-0 mt-3">
                <Upload onChange={onUploadAavater} showUploadList={false}>
                  <Button type="primary">Сменить фото</Button>
                </Upload>
                <Button className="ml-2" onClick={onRemoveAvater}>
                  Удалить
                </Button>
              </div>
            </Flex>
            <div className="mt-4">
              <Form
                name="basicInformation"
                layout="vertical"
                initialValues={{
                  name: name,
                  email: email,
                  username: userName,
                  dateOfBirth: dateOfBirth,
                  phoneNumber: phoneNumber,
                  website: website,
                  address: address,
                  city: city,
                  postcode: postcode,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="user-edit__form"
                validateTrigger="onSubmit"
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={20}>
                    <Row gutter={ROW_GUTTER}>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="ФИО"
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Укажите ФИО",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Имя пользователя"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Укажите имя пользователя",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              type: "email",
                              message: "Укажите корректный email",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Дата рождения" name="dateOfBirth">
                          <DatePicker className="w-100" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Номер телефона" name="phoneNumber">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Сайт" name="website">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <Form.Item label="Адрес" name="address">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Город" name="city">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Form.Item label="Почтовый индекс" name="postcode">
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" loading={isSaving}>
                      Сохранить
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </>
        )}
      </>
    );
  }
}

export default withRouter(EditProfile);
