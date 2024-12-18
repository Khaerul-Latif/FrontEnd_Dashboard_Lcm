import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdPaid } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
// import EditDashboard from "./EditDashboard";


const initialFilters = {
  startDate: "",
  endDate: "",
  // branch: "",
  // class: "",
  statusPembayaran: "",
  source: "",
};

const cardData = [
  { id: "totalProspect", icon: <FaUserGraduate style={{ fontSize: "28px", color: "#697a8d" }} />, title: "Total Peserta", count: "1,356" },
  { id: "pending", icon:  <MdPending style={{ fontSize: "28px", color: "#ffff00" }} />, title: "Pending", count: "231" },
  { id: "expired", icon: <IoMdCloseCircle style={{ fontSize: "28px", color: "#FF0000" }} />, title: "Expired", count: "145" },
  { id: "paid", icon: <MdPaid style={{ fontSize: "28px", color: "#388e3c" }} />, title: "Paid", count: "980" }
];

// const tableData = [
//   { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "LifeCamp", tanggalSP: "11 Des 2024", status: "Paid", FU: "W"},
//   { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "LifeCamp", tanggalSP: "", status: "Pending", FU: "1"},
//   { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LifeCamp", tanggalSP: "09 Des 2024", status: "Pending", FU: "V"},
//   { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "LifeCamp", tanggalSP: "", status: "Pending", FU: "1"},
//   { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "LifeCamp", tanggalSP: "08 Des 2024", status: "Expired", FU: "3"},
//   { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "LifeCamp", tanggalSP: "", status: "Expired", FU: "W"},
//   { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "LifeCamp", tanggalSP: "", status: "Paid", FU: "X",},
//   { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "LifeCamp", tanggalSP: "01 Des 2024", status: "Paid", FU: "V"},
// ];

const tableData = [
  { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "LifeCamp",invitationCode:"ABC123", tanggalSP: "10 Ds 2024", status: "Expired", FU: "W", source: "MR" },
  { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "LifeCamp", invitationCode:"DEF456",tanggalSP: "", status: "Pending", FU: "1", source: "IG" },
  { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LifeCamp",invitationCode:"GHI789", tanggalSP: "07 Des 2024", status: "Pending", FU: "V", source: "Iklan" },
  { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "LifeCamp",invitationCode:"JKL012", tanggalSP: "", status: "Pending", FU: "1", source: "WA" },
  { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "LifeCamp", invitationCode:"MNO345",tanggalSP: "1 Des 2024", status: "Expired", FU: "3", source: "Email" },
  { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "LifeCamp",invitationCode:"PQR345", tanggalSP: "", status: "Expired", FU: "W", source: "Other" },
  { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "LifeCamp", invitationCode:"RST865",tanggalSP: "", status: "Paid", FU: "X", source: "MR" },
  { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "LifeCamp", invitationCode:"JIH134",tanggalSP: "25 Nov 2024", status: "Paid", FU: "V", source: "IG" },
];





const AdminDaftarPerserta = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState({});
  const [data, setData] = useState(tableData);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleEditClick = (participant) => {
    setSelectedParticipant(participant);
    setEditModalOpen(true);
  };

  const handleSave = (updatedParticipant) => {
    setData(prevData => prevData.map(participant => 
      participant.id === updatedParticipant.id ? updatedParticipant : participant
    ));
    setEditModalOpen(false);
  };

  const handleCancel = () => setEditModalOpen(false);

  const handleFilterChange = ({ target: { name, value } }) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = () => {
    setActiveFilters(filters);
    setFilters(initialFilters);
  };
  
  const formatLabel = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Menambahkan spasi antara huruf kecil dan kapital
      .replace(/^./, str => str.toUpperCase()); // Membuat huruf pertama kapital
  };



  const filterData = (data) => {
    return data.filter(item => {
      const isWithinDateRange = (!activeFilters.startDate || new Date(item.date) >= new Date(activeFilters.startDate)) &&
                                (!activeFilters.endDate || new Date(item.date) <= new Date(activeFilters.endDate));
      return isWithinDateRange && Object.keys(activeFilters).every(key => 
        !activeFilters[key] || item[key] === activeFilters[key]
      );
    });
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {["No", "Name", "HP", "Email", "Program", "Invitation Code", "Status Pembayaran","Source" ].map(header => (
        // {["No", "ID", "Name", "HP", "Email", "City", "Program", "Source", "Created At"].map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );


  const renderTableBody = (data) => (
    <tbody>
      {data.map(({ id, name, hp, email, program, tanggalSP,status,source }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{hp}</td>
          <td>{email}</td>
          <td>{program}</td>
          <td>{tanggalSP != "" ? tanggalSP : "-"}</td>
          <td>{status}</td>
          <td>{source}</td>
          {/* <td>
      <select className="form-select" defaultValue="">
        {["W", "V", "X","1", "2", "3"].map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </td>
          <td> <button
          className="btn btn-primary"
          disabled={tanggalSP != ""} // Tombol akan dinonaktifkan jika `tanggalSP` kosong
        >Check In</button></td> <td>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-cog"></i>
              </button>
              <ul className="dropdown-menu">
                {["Detail", "Edit", "Delete"].map(action => (
                  <li key={action} className="dropdown-item">
                    <a
                      href="#"
                      onClick={() => action === "Edit" && handleEditClick({ id, name, hp, email, program, tanggalSP, checkIn })}
                      className={`text-primary d-flex align-items-center ${action === "Edit" ? "fw-bold" : ""}`}
                    >
                      <i className={`fas fa-${action === "Edit" ? "pencil-alt" : action === "Delete" ? "trash-alt" : "eye"}`} style={{ marginRight: "8px" }}></i> 
                      <span>{action}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </td> */}
        </tr>
      ))}
    </tbody>
  );



  const Card = ({ card }) => (
    <div className="col-6 col-sm-4 col-md-3 mb-3">
      <div className="card h-100 shadow-sm text-center" style={{ cursor: "pointer", borderRadius: "10px" }}>
        <div className="card-body d-flex flex-column align-items-center p-3">
          <div className="icon mb-2">{card.icon}</div>
          <h6 className="card-title mb-1" style={{ fontSize: "14px", fontWeight: "500" }}>{card.title}</h6>
          <p className="fw-bold mb-0" style={{ fontSize: "18px" }}>{card.count}</p>
        </div>
      </div>
    </div>
  );

  const ProgramDashboard = () => (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row g-3">
        {cardData.map(card => <Card key={card.id} card={card} />)}
      </div>
    </div>
  );

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <ProgramDashboard />
      <div className="card mt-4" style={{ marginLeft: "15px", marginRight: "15px" }}>
        <div className="card-header">
          <h5>Filter</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {Object.keys(initialFilters).map(filterKey => (
              <div className="col-md-2" key={filterKey}>
                <label className="form-label">{formatLabel(filterKey)}</label>
                {filterKey.includes("Date") ? (
                  <input type="date" className="form-control" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange} />
                ) : (
                  <select className="form-select" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterKey === "fu" && ["WA", "V", "1", "2", "3"].map(option => <option key={option} value={option}>{option}</option>)}
                    {/* {filterKey === "branch" && ["KG", "BSD", "PI"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "class" && ["A", "B"].map(option => <option key={option} value={option}>{option}</option>)} */}
                    {filterKey === "statusPembayaran" && [ "Pending", "Expired", "Paid"].map(option => <option key={option} value={option}>{option}</option>)}
                  </select>
                )}
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilterSubmit}>
            Filter
          </button>
        </div>
      </div>
      <div className="card mt-4 shadow-sm" style={{ marginLeft: "15px", marginRight: "15px" }}>
        <div className="card-header text-white">
          <h5 className="mb-0">Total Perserta</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
            {renderTableHeader()}
            {renderTableBody(filterData(data))}
          </table>
          </div>
          <nav aria-label="Page navigation">
  <ul class="my-2 inset-x-0 top-0 pagination pagination-rounded pagination-outline-primary">
    <li class="page-item first">
      <a class="page-link" href="#"><i class="bx bx-chevrons-left bx-sm"></i></a>
    </li>
    <li class="page-item prev">
      <a class="page-link" href="#"><i class="bx bx-chevron-left bx-sm"></i></a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">1</a>
    </li>
    <li class="page-item active">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">3</a>
    </li>
    <li class="page-item next">
      <a class="page-link" href="#"><i class="bx bx-chevron-right bx-sm"></i></a>
    </li>
    <li class="page-item last">
      <a class="page-link" href="#"><i class="bx bx-chevrons-right bx-sm"></i></a>
    </li>
  </ul>
</nav>
        </div>
      </div>
      {/* {isEditModalOpen && (
        <EditDashboard
          participant={selectedParticipant}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )} */}
    </div>
  );
};

export default AdminDaftarPerserta;
