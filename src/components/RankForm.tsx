import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import type { FormItemProps } from 'antd';
import DialogCard from './DialogCard';
import { getBranchRank, getCollegeRank } from '@/pages/api/api';

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
  children: React.ReactNode;
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const RankForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [student, setStudent] = useState({});
  const key = 'updatable';

  const onFinish = async (value: { college: string, branch: string, reg_no: string }) => {
    let res: any;
    if (value.reg_no !== undefined && value.reg_no.length === 11) {
      if (value.branch && value.branch !== "NA") {
        try {
          res = await getBranchRank(value.reg_no, value.college, value.branch)
        } catch (err: any) {
          messageApi.open({
            type: 'error',
            content: err.response && err.response.data.message || "Server Error",
          });
          console.log(err)
        }
      }
      else {
        try {
          res = await getCollegeRank(value.reg_no, value.college)
        } catch (err: any) {
          messageApi.open({
            type: 'error',
            content: err.response && err.response.data.message || "Server Error",
          });
          console.log(err)
        }
      }
      if (res && res.data) {
        setStudent(res.data);
        messageApi.open({
          key,
          type: 'loading',
          content: 'Loading...',
        });
        setTimeout(() => {
          messageApi.open({
            key,
            type: 'success',
            content: 'Loaded!',
            duration: 2,
          });
        }, 1000);
        setIsModalOpen(true)
      }
      console.log(value, res && res.data);
    }
    else if (value.reg_no && value.reg_no.length != 11) {
      messageApi.open({
        type: 'error',
        content: 'Please Enter valid Registration No.!',
      });
    }
    else {
      messageApi.open({
        type: 'warning',
        content: 'Registration No. required!',
      });
    }

  };



  return (
    <>
      {contextHolder}
      <DialogCard isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} student={student} />
      <Form
        name="form_item_path"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ college: '110', branch: "105", }}
      >
        <MyFormItemGroup prefix={[]}>
          <MyFormItem name="college" label="Select your college: " style={{ fontWeight: 500 }}>
            <Select
              options={[
                { value: '110', label: 'Gaya College of Engineering, Gaya' }
              ]}
            />
          </MyFormItem>
          <MyFormItem name="branch" label="Select your branch: " style={{ fontWeight: 500 }}>
            <Select
              options={[
                { value: 'NA', label: '--- Not Selected ---' },
                { value: '105', label: 'Computer Science and Engineering' },
                { value: '110', label: 'Electrical and Electronics Engineering' },
                { value: '102', label: 'Mechanical Engineering' },
                { value: '101', label: 'Civil Engineering' },
              ]}
            />
          </MyFormItem>
          <MyFormItem name="reg_no" label="# Enter Your Registration No: " style={{ fontWeight: 500 }} required>
            <Input />
          </MyFormItem>
        </MyFormItemGroup>
        <Button type="primary" htmlType="submit" block>
          Know Your Rank
        </Button>
      </Form>
    </>
  );
};

export default RankForm;