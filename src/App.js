import logo from './logo.svg';
import './App.css';
import { AutoComplete, Button, Col, Form, Input, Row, Select } from 'antd';
import "antd/dist/antd.css";
import { useState } from 'react';
import genders from './gender.json';

function App() {
  const [autoCompleteOptions, setAutoCompleteOptions] = useState(genders);

  const onSearch = (str) => {
    const regexFilter = new RegExp(str, 'i');
    const filter = genders.filter((gender) => {
      const genderFiltered = gender.value.search(regexFilter)
      return genderFiltered === -1 ? null : gender;
    });
    setAutoCompleteOptions(filter)
  }

  const { Option } = Select;

  const options = [
    {
      label: 'yes',
      value: 'so pro'
    },
    {
      label: 'no',
      value: 're gil este'
    }
  ];

  const handleFinishForm = (form) => {
    delete form.confirmPassword;
    console.log(form);
  };

  return (
    <div className='App'>
      <Row align='middle' style={{background: 'red', height: '3rem'}}>
        {/* <Col xl={6} lg={5} md={3} sm={5} style={{background: 'blue', height: '2rem', border: '1px black solid'}}>col-6</Col> */}
        {/* <Col xl={6} lg={9} md={9} sm={5} style={{background: 'blue', height: '2rem', border: '1px black solid'}}>col-6</Col> */}
        {/* <Col xl={6} lg={5} md={9} sm={5} style={{background: 'blue', height: '2rem', border: '1px black solid'}}>col-6</Col> */}
        {/* <Col xl={6} lg={5} md={3} sm={5} style={{background: 'blue', height: '2rem', border: '1px black solid'}}>col-6</Col> */}
      </Row>
      <div className='formContainer'>
        <div style={{}}>
          <Form onFinish={handleFinishForm} layout='vertical' className='antdForm'>
            <Row justify='space-around' align='middle'>
              <Col span={10}>
                <Form.Item
                  label='name'
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'pls complete this field'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='age'
                  name='age'
                  rules={[
                    {
                      required: true,
                      message: 'pls complete this field'
                    },
                    {
                      pattern: '^([-]?[1-9][0-9]*|0)$',
                      message: 'age must be a number'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-around' align='middle'>
              <Col span={10}>
                <Form.Item
                  label='password'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'pls complete this field'
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='confirm password'
                  name='confirmPassword'
                  rules={[
                    {
                      required: true,
                      message: 'pls complete this field'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
          
                        return Promise.reject(new Error('passwords do not match'));
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify='space-around' align='middle'>
              <Col span={10}>
                <Form.Item
                  label='do you have a toy duck?'
                  name='haveDuck'
                  rules={[
                    {
                      required: true,
                      message: 'answer this (⊙_⊙;)'
                    },
                    () => ({
                      validator(_, value) {
                        if (value === 'so pro') {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error('if u do not have a duck u can not register( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)'))
                      }
                    })
                  ]}
                >
                  <Select>
                    {options.map((opt) => <Option value={opt.value} >{opt.label}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  label='gender'
                  name='gender'
                  rules={[
                    {
                      required: true,
                      message: 'select gender'
                    }
                  ]}
                >
                  <AutoComplete 
                    options={autoCompleteOptions}
                    onSearch={onSearch}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row style={{marginBottom: '1rem'}}>
              <Col span={6} offset={18}>
                <Button htmlType='submit'>
                  save
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
