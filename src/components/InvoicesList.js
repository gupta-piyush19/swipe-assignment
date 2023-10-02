import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { addInvoice, deleteInvoice } from "../features/invoice/invoiceSlice";
import InvoiceForm from "./InvoiceForm";
import InvoiceModal from "./InvoiceModal";

function InvoicesList() {
  const invoices = useSelector((state) => state.invoice.invoices);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const dispatch = useDispatch();

  const handleCreateClick = () => {
    setShowCreateInvoice(true);
  };

  const handleEditClick = (invoice) => {
    setSelectedInvoice(invoice);
    setShowEditInvoice(true);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = (invoiceId) => {
    dispatch(deleteInvoice(invoiceId));
  };

  const handleClone = (invoice) => {
    dispatch(addInvoice({ ...invoice, id: maxId + 1 }));
  };

  let maxId;
  if (invoices?.length) {
    maxId = invoices.reduce(
      (max, invoice) => (invoice.id > max ? invoice.id : max),
      invoices[0].id
    );
  } else {
    maxId = 0;
  }

  const th = ["S.No.", "Name", "Email", "Date", "Items", "Total", "Actions"];

  return (
    <div>
      {showCreateInvoice || showEditInvoice ? (
        <InvoiceForm
          invoice={selectedInvoice}
          onHide={() => {
            setShowCreateInvoice(false);
            setShowEditInvoice(false);
            setSelectedInvoice(null);
          }}
          id={showEditInvoice ? selectedInvoice.id : maxId + 1}
        />
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h2 className="py-2">Invoices</h2>
            <Button onClick={handleCreateClick} className="mb-2">
              Create Invoice
            </Button>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                {th.map((t, index) => (
                  <th key={index} className="text-center">
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={`${index % 2 && "text-black bg-white"}`}
                >
                  <td className="text-center">{invoice.id}</td>
                  <td className="text-center">{invoice.billTo}</td>
                  <td className="text-center">{invoice.billToEmail}</td>
                  <td className="text-center">{invoice.dateOfIssue}</td>
                  <td className="text-center">{invoice.items.length}</td>
                  <td className="text-center">{invoice.total}</td>
                  <td className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      className="button-container"
                      onClick={() => openModal(invoice)}
                    >
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      className="button-container"
                      onClick={() => handleEditClick(invoice)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="success"
                      className="button-container"
                      onClick={() => handleClone(invoice)}
                    >
                      Clone
                    </Button>
                    <Button
                      variant="danger"
                      className="button-container"
                      onClick={() => handleDelete(invoice.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {isOpen && (
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={selectedInvoice}
              items={selectedInvoice.items}
              currency={selectedInvoice.currency}
              subTotal={selectedInvoice.subTotal}
              taxAmmount={selectedInvoice.taxAmmount}
              discountAmmount={selectedInvoice.discountAmmount}
              total={selectedInvoice.total}
            />
          )}
        </>
      )}
    </div>
  );
}

export default InvoicesList;
