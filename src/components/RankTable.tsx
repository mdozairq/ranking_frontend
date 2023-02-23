import React, { useState } from 'react';
import { Table, Select } from 'antd';

const { Option } = Select;

interface User {
  rank: number
  name: string;
  reg_no: string;
  college: string;
  branch: string;
  cgpa: number;
}

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Reg. No.',
    dataIndex: 'reg_no',
    key: 'reg_no',
  },
  {
    title: 'College',
    dataIndex: 'college',
    key: 'college',
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    key: 'branch',
  },
  {
    title: 'CGPA',
    dataIndex: 'cgpa',
    key: 'cgpa',
  },
];

interface Props {
  data: User[]
}


const RankTable: React.FC<Props> = ({data}: Props) => {
  const [selectedHeader, setSelectedHeader] = useState<keyof User | undefined>(undefined);

  const handleHeaderChange = (header: keyof User) => {
    setSelectedHeader(header);
  };

  let filteredData = data;
  if (selectedHeader) {
    filteredData = data.filter(item => item[selectedHeader] !== undefined);
  }

  return (
    <>
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default RankTable;
