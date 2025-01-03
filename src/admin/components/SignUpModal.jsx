import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignUpModal = ({ show, onHide, prospect, onConfirm, programs }) => {
  const [formData, setFormData] = useState({
    parent_id: prospect?.id,
    program_id: prospect?.id_program,
    num_children: 1, // Default minimal 1
    total: 0, // Default minimal 0
    payment_status: prospect?.status, // Default 0 (Pending)
    payment_method: "",
    ...(prospect.id_payment ? { payment_id: prospect.id_payment } : {}),
  });

  // Update formData when prospect changes
  useEffect(() => {
    if (prospect) {
      setFormData({
        parent_id: prospect.id || 0,
        program_id: prospect.id_program || 0,
        // Menggunakan prospect.num_children dan prospect.total jika tidak null
        num_children: prospect.jumlah_anak ?? formData.num_children, // Jika prospect.num_children tidak null, gunakan nilainya
        total: prospect.total ?? formData.total, // Jika prospect.total tidak null, gunakan nilainya
        payment_status: formData.payment_status,
        payment_method: formData.payment_method ?? "",
        ...(prospect.id_payment ? { payment_id: prospect.id_payment } : {}), // Menambahkan id_payment jika ada
      });
    }
    console.log("Num Children :", prospect?.jumlah_anak);
    console.log("TOtal :", prospect?.total);
  }, [prospect, formData]); // Pastikan effect ini dipicu jika prospect atau formData berubah
  

  useEffect(() => {
    // Hitung harga, diskon, dan total berdasarkan program yang dipilih
    if (programs && programs.price) {
      const price = parseInt(programs.price); // Harga per anak
      const quantity = formData.num_children;

      const calculatedPrice = price * quantity;
      let discount = 0;

      // Menghitung diskon jika ada dan jumlah anak lebih dari 1
      if (quantity >= 2) {
        discount = (price / programs.discount) * (quantity - 1);
      }

      const calculatedTotal = calculatedPrice - discount;
      setFormData((prev) => ({
        ...prev,
        total: calculatedTotal,
      }));
    }
    console.log("Total :", programs?.price);
  }, [formData.num_children, programs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "payment_status" ||   name === "total" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = () => {
    onConfirm(formData);
    onHide();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const isReadOnly = prospect?.user_email !== null ;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isReadOnly ? "Edit Pembayaran Manual" : "Pembayaran Manual"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group hidden controlId="formParentId">
            <Form.Label>Parent ID</Form.Label>
            <Form.Control
              type="number"
              name="parent_id"
              value={formData.parent_id}
            
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
             <Form.Control
            type="text" // Mengubah menjadi text agar dapat menampilkan format mata uang
            name="name"
            value={prospect?.name} // Menampilkan total dengan format mata uang
            readOnly // Menambahkan kondisi readonly jika payment_id ada
          />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Email</Form.Label>
             <Form.Control
            type="text" // Mengubah menjadi text agar dapat menampilkan format mata uang
            name="name"
            value={prospect?.email} // Menampilkan total dengan format mata uang
            readOnly // Menambahkan kondisi readonly jika payment_id ada
          />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Phone Number</Form.Label>
             <Form.Control
            type="text" // Mengubah menjadi text agar dapat menampilkan format mata uang
            name="name"
            value={prospect?.phone} // Menampilkan total dengan format mata uang
            readOnly // Menambahkan kondisi readonly jika payment_id ada
          />
          </Form.Group>

          <Form.Group controlId="formNumChildren">
            <Form.Label>Jumlah Anak</Form.Label>
            <Form.Control
              type="number"
              name="num_children"
              value={formData.num_children}
              min={1}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
            
          </Form.Group>

          <Form.Group controlId="formTotal">
            <Form.Label>Total</Form.Label>
            {/* <Form.Control
              type="number"
              name="total"
              value={formData.total}
              min={1}
              readOnly
            /> */}
             <Form.Control
            type="text" // Mengubah menjadi text agar dapat menampilkan format mata uang
            name="total"
            value={formatCurrency(formData.total)} // Menampilkan total dengan format mata uang
            readOnly // Menambahkan kondisi readonly jika payment_id ada
          />
          </Form.Group>

          <Form.Group controlId="formPaymentStatus">
            <Form.Label>Status Pembayaran</Form.Label>
            <Form.Control
              as="select"
              name="payment_status"
              value={formData.payment_status}
              onChange={handleChange}
            >
              <option value={0}>Pending</option>
              <option value={1}>Paid</option>
            </Form.Control>
          </Form.Group>

          {/* Tampilkan Payment Method hanya jika payment_status adalah "1" */}
          {formData.payment_status === 1 && (
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>Metode Pembayaran</Form.Label>
              <Form.Control
                as="select"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              >
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit Card</option>
              </Form.Control>
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;