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
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROW_GUTTER } from "constants/ThemeConstant";
import Flex from "components/shared-components/Flex";
import "./index.css";

export class EditProfile extends Component {
  state = {
    avatarUrl: "/img/avatars/thumb-6.jpg",
    name: "Charlie Howard",
    email: "charlie.howard@themenate.com",
    userName: "Charlie",
    dateOfBirth: null,
    phoneNumber: "+44 (1532) 135 7921",
    website: "",
    address: "",
    city: "",
    postcode: "",
    isSaving: false,
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  render() {
    const onFinish = (values) => {
      this.setState({ isSaving: true });

      setTimeout(() => {
        this.setState({
          name: values.name,
          email: values.email,
          userName: values.userName,
          dateOfBirth: values.dateOfBirth,
          phoneNumber: values.phoneNumber,
          website: values.website,
          address: values.address,
          city: values.city,
          postcode: values.postcode,
        });

        this.setState({ isSaving: false });
        notification.success({ message: "Данные сохранены.", duration: 2 });
      }, 1000);
    };

    // TODO: remove ?
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
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
    } = this.state;

    return (
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
    );
  }
}

export default EditProfile;
