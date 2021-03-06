import React from "react";
import { Form, Icon, Input, Select } from "antd";
import $ from 'jquery'


class StuForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultData: "",
      major: ''
    }
  }
  componentDidMount() {
  }
  // 自定义校验器 
  checkUser = (rule, value, callback) => {
    // let url = "http://localhost:8083/stuUser/CheckUsername";
    // let url2 = "http://localhost:8083/major/FindById";
    let url = "http://203.195.219.213:8083/stuUser/CheckUsername";
    let url2 = "http://203.195.219.213:8083/major/FindById";
    setTimeout(() => {
      $.get(url, { username: value }, ({ status, message, data }) => {
        if (status !== 200 && data == null) {
          callback("用户不存在或服务器错误");
        } else {
          this.setState({ defaultData: data })
          $.get(url2, { id: data.majorId }, ({ data }) => {
            this.setState({ major: data })
          })
        }
        callback();

      })
    }, 1000);
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const studentNumberError = isFieldTouched('studentNumber') && getFieldError('studentNumber');
    const nameError = isFieldTouched('name') && getFieldError('name');
    const genderError = isFieldTouched('gender') && getFieldError('gender');
    const majorNameError = isFieldTouched('majorName') && getFieldError('majorName');
    const paymentNumberError = isFieldTouched('paymentNumber') && getFieldError('paymentNumber');
    const telephoneError = isFieldTouched('telephone') && getFieldError('telephone');
    const addressError = isFieldTouched('address') && getFieldError('address');
    const userIdError = isFieldTouched('userId') && getFieldError('userId');
    // 注册id属性
    getFieldDecorator("id")

    const { defaultData, major } = this.state;
    return (
      <div>
        <Form {...formItemLayout} layout="inline" hideRequiredMark>
          <Form.Item style={{ width: 458 }} label="学号" validateStatus={studentNumberError ? 'error' : ''} help={studentNumberError || ''}>
            {getFieldDecorator('studentNumber', {
              // initialValue:123,     //加默认值
              // 规则   表单验证规则
              rules: [{ required: true, message: '学号不能为空!' }, { validator: this.checkUser }],
            })(
              <Input
                prefix={<Icon type="contacts" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入学号"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ width: 458 }} label="姓名" validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
            {getFieldDecorator('name', {
              initialValue: defaultData.realname || '',     //加默认值
              rules: [{ required: true, message: '姓名不能为空!' }],
            })(
              <Input
                prefix={<Icon type="schedule" style={{ color: 'rgba(0,0,0,.25)' }} />}
                readOnly   //只读
                placeholder="请优先输入学号查看姓名"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ width: 458 }} label="性别" validateStatus={genderError ? 'error' : ''} help={genderError || ''}>
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: '性别不能为空!' }],
            })(
              <Select placeholder="请选择性别">
                <Select.Option value="男">男</Select.Option>
                <Select.Option value="女">女</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item style={{ width: 458 }} label="专业名称" validateStatus={majorNameError ? 'error' : ''} help={majorNameError || ''}>
            {getFieldDecorator('majorName', {
              initialValue: major.name,     //加默认值
              rules: [{ required: true, message: '专业不能为空!' }],
            })(
              <Input
                prefix={<Icon type="wallet" style={{ color: 'rgba(0,0,0,.25)' }} />}
                readOnly
                // readOnly   //只读
                placeholder="请优先输入学号查看专业"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ width: 458 }} label="缴费金额" validateStatus={paymentNumberError ? 'error' : ''} help={paymentNumberError || ''}>
            {getFieldDecorator('paymentNumber', {
              initialValue: major.paymentNumber,     //加默认值
              rules: [{ required: true, message: '不能为空!' }],
            })(
              <Input
                prefix={<Icon type="pay-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                readOnly
                // readOnly   //只读
                placeholder="请优先输入学号查看缴纳学费"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ width: 458 }} label="联系电话" validateStatus={telephoneError ? 'error' : ''} help={telephoneError || ''}>
            {getFieldDecorator('telephone', {
              //  initialValue:major.paymentNumber,     //加默认值
              rules: [{ required: true, message: '电话不能为空!' }],
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入常用联系电话"
              />,
            )}
          </Form.Item>
          <Form.Item style={{ width: 458 }} label="家庭住址" validateStatus={addressError ? 'error' : ''} help={addressError || ''}>
            {getFieldDecorator('address', {
              //  initialValue:major.paymentNumber,     //加默认值
              rules: [{ required: true, message: '地址不能为空!' }],
            })(
              <Input
                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                //  readOnly
                // readOnly   //只读
                placeholder="请输入常用家庭住址"
              />,
            )}
          </Form.Item>
          <Form.Item validateStatus={userIdError ? 'error' : ''} help={userIdError || ''}>
            {getFieldDecorator('userId', {
              initialValue: defaultData.id,     //加默认值
            })(
              <Input type="hidden" />,
            )}
          </Form.Item>
        </Form>

      </div>
    )
  }

}
const mapPropsToFields = (props) => {
  let obj = {};
  console.log("sss" + JSON.stringify(props))
  for (let key in props.Student) {
    obj[key] = Form.createFormField({
      value: props.Student[key]
    })
  }
  return obj;
}
export default Form.create({ mapPropsToFields })(StuForm);