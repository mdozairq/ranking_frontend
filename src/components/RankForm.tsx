import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import type { FormItemProps } from 'antd';
import DialogCard from './DialogCard';
import { getAllColleges, getBranchRank, getBranchRankerList, getCollegeRank, getCollegeRankerList } from '@/pages/api/api';


const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface Props {
  setData: any
}

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

const RankForm: React.FC<Props> = ({setData}: Props) => {
  const { Option } = Select
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [student, setStudent] = useState({});
  const [colleges, setColleges] = useState([]);
  const key = 'updatable';
  const [selectedGroup, setSelectedGroup] = useState(110);
  const [innerOptions, setInnerOptions] = useState([]);

  const handleOuterSelect = (value: any) => {
    setSelectedGroup(value);
    const selectedData: any = colleges && colleges?.find((item: any) => {
      console.log(item)
      return item?.college_code === value
    });
    setInnerOptions(selectedData?.branch);
  };

  const collegeList = async () => {
    let res;
    try {
      res = await getAllColleges()
    } catch (err: any) {
      messageApi.open({
        type: 'error',
        content: err.response && err.response.data.message || "Server Error",
      });
      console.log(err)
    }
    setColleges(res?.data);
  }

  useEffect(() => {
    if (!colleges.length) {
      collegeList();
      setSelectedGroup(110);
    }
  }, [])

  const onFinish = async (value: { college: string, branch: string, reg_no: string }) => {
    let res: any, ranker_res: any;
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
        try {
          ranker_res = await getBranchRankerList(value.college, value.branch)
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
        try {
          ranker_res = await getCollegeRankerList(value.college)
        } catch (err: any) {
          messageApi.open({
            type: 'error',
            content: err.response && err.response.data.message || "Server Error",
          });
          console.log(err)
        }
      }
      if (res && ranker_res && res.data) {
        setStudent(res.data);
        setData(ranker_res?.data)
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
      if (ranker_res && ranker_res.data) {
        setData(ranker_res?.data)
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
        initialValues={{ college: null, branch: 'NA' }}
      >
        <MyFormItemGroup prefix={[]}>
          <MyFormItem name="college" label="Select your college: " style={{ fontWeight: 500 }}>
            <Select onChange={handleOuterSelect}>
              {colleges && [].concat(...colleges).map((l: any) => <Option value={l?.college_code} key={l?.college_code}>{l?.college_name}</Option>)}
            </Select>
          </MyFormItem>
          <MyFormItem name="branch" label="Select your branch: " style={{ fontWeight: 500 }}>
            <Select>
              <Option value={"NA"}>{"--- Not Selected ---"}</Option>
              {innerOptions && [].concat(...innerOptions).map((l: any) => <Option value={l?.branch_code} key={l?.branch_code}>{l?.branch_name}</Option>)}
            </Select>
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