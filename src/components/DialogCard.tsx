import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Modal, Table } from 'antd';
import AwardImg from "../imgs/award.webp";

interface Props {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  student: any
}




const DialogCard: React.FC<Props> = ({ isModalOpen, setIsModalOpen, student }: Props) => {

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Stundent Information" open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <div className="modal-body">
          <table className="table table-striped border px-3" id="show">
            <tbody style={{ textAlign: "left" }}>
              <tr>
                <th scope="row">Name :</th>
                <td id="Name" className="text-capitalize">{student.name}</td>
              </tr>
              <tr>
                <th scope="row">Reg. No. :</th>
                <td id="reg_no">{student.reg_no}</td>
              </tr>
              <tr>
                <th scope="row">College :</th>
                <td id="college">{student.college}</td>
              </tr>
              <tr>
                <th scope="row">Branch :</th>
                <td id="branch">{student.branch}</td>
              </tr>
              <tr>
                <th scope="row">CGPA :</th>
                <td id="CGPA">{student.cgpa}</td>
              </tr>
              <tr style={{ fontSize: "" }}>
                <th scope="row">{student && student.college_rank ? "College Rank :" : "Branch Rank :"}</th>
                <th><span id="Rank">{student && student.college_rank ? student.college_rank : student.branch_rank}</span>&ensp;
                  <Image src={AwardImg} alt="" />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default DialogCard;