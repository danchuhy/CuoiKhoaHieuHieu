import React, { useState } from "react";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import "../profile.scss";
import { Button } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import img from "../../../assets/pngwing.com (2).png";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@tanstack/react-query";
import { updataAvatarApi } from "../../../apis/userAPI";
import Swal from "sweetalert2";
const OrderAvatar = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setFile] = useState(null);
  const { mutate } = useMutation({
    mutationFn: (value) => updataAvatarApi(value),
    onSuccess: () => {
      Swal.fire({
        title: "Cập nhật avatar",
        text: "cập nhật thành công",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },
  });
  const handleUpload = () => {
    if (file != null) {
      handleClose();
      mutate(file);
    }
  };
  return (
    <div id="profile">
      <div className="profile-head">
        <img src={data.avatar == "" ? img : data.avatar} alt="" />
        <a href="#!" onClick={handleShow}>
          Cập nhật ảnh
        </a>
        <input style={{ display: "none" }} type="file" />
      </div>
      <div className="profile-body">
        <div className="profile-body-icon">
          <GppGoodOutlinedIcon />
        </div>
        <div className="profile-body-text">
          <h3>Xác thực danh tính</h3>
          <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
          <Button variant="outlined">Nhận huy hiệu</Button>
        </div>
      </div>
      <div className="profile-bot">
        <h3>{data.name} đã xác nhận </h3>
        <p>
          <CheckOutlinedIcon /> Địa chỉ email
        </p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderAvatar;
