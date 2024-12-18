import React, { useState } from "react";
import { FaUserGraduate, FaWallet, FaRedo } from "react-icons/fa";  
import { MdPaid } from "react-icons/md";
// import EditDashboard from "./EditDashboard";

const initialFilters = {
  startDate: "",
  endDate: "",
//   branch: "",
//   program: "",
//   class: "",
  statusPembayaran: "",
};

// Fungsi untuk memisahkan nama properti menjadi label yang lebih mudah dibaca
const formatLabel = (key) => {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Menambahkan spasi antara huruf kecil dan kapital
      .replace(/^./, str => str.toUpperCase()); // Membuat huruf pertama kapital
  };
  
  const filterKeys = Object.keys(initialFilters);

// const tableData = [
//   { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", class: "A", invitationCode: "ABC123", status: "Active", FU: "FU1", date: "2022-01-01" },
//   { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", class: "B", invitationCode: "DEF456", status: "Active", FU: "FU2", date: "2022-02-01" },
//   { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", class: "A", invitationCode: "GHI789", status: "Pending", FU: "FU3", date: "2022-03-01" },
//   { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", class: "B", invitationCode: "JKL012", status: "Pending", FU: "FU4", date: "2022-04-01" },
//   { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", class: "A", invitationCode: "MNO345", status: "Expired", FU: "FU5", date: "2022-05-01" },
//   { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", class: "B", invitationCode: "PQR678", status: "Expired", FU: "FU6", date: "2022-06-01" },
//   { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", class: "A", invitationCode: "STU901", status: "Paid", FU: "FU7", date: "2022-07-01" },
//   { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", class: "B", invitationCode: "VWX234", status: "Paid", FU: "FU8", date: "2022-08-01" },
// ];

const tableData = [
    { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "LifeCamp", invitationCode: "ABC123", status: "Re.Attendance" },
    { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "LifeCamp", invitationCode: "DEF456", status: "DP" },
    { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LifeCamp", invitationCode: "GHI789", status: "Re.Attendance" },
    { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "LifeCamp", invitationCode: "JKL012", status: "Re.Attendance" },
    { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "LifeCamp", invitationCode: "MNO345", status: "DP" },
    { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "LifeCamp", invitationCode: "PQR678", status: "DP" },
    { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "LifeCamp", invitationCode: "STU901", status: "Lunas" },
    { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "LifeCamp", invitationCode: "VWX234", status: "Lunas" },
  ];

const AdminDashboard = () => {
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
        {["No", "Name", "HP", "Email", "Program",  "Invitation Code", "Status Pembayaran", "Action"].map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = (data) => (
    <tbody>
      {data.map(({ id, name, hp, email, program, invitationCode, status, FU }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{hp}</td>
          <td>{email}</td>
          <td>{program}</td>
          <td>{invitationCode}</td>
          <td>{status}</td>
          {/* <td> <select className="form-select" defaultValue="">
        {["W", "V", "X","1", "2", "3"].map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select></td> */}
          <td>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-cog"></i>
              </button>
              <ul className="dropdown-menu">
                {["Detail", "Edit", "Delete"].map(action => (
                  <li key={action} className="dropdown-item">
                    <a
                      href="#"
                      onClick={() => action === "Edit" && handleEditClick({ id, name, hp, email, program,  invitationCode, status, FU })}
                      className={`text-primary d-flex align-items-center ${action === "Edit" ? "fw-bold" : ""}`}
                    >
                      <i className={`fas fa-${action === "Edit" ? "pencil-alt" : action === "Delete" ? "trash-alt" : "eye"}`} style={{ marginRight: "8px" }}></i> 
                      <span>{action}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );

  const cardData = [
    { id: "totalLifers", icon: <FaUserGraduate style={{ fontSize: "28px", color: "#697a8d" }} />, title: "Total Lifers", count: "12,628" },
    { id: "lunas", icon: <MdPaid style={{ fontSize: "28px", color: "#388e3c" }} />, title: "Lunas", count: "1,234" },
    { id: "dp", icon: <FaWallet style={{ fontSize: "28px", color: "#6A5ACD" }} />, title: "DP", count: "1,025" },
    { id: "ra", icon: <FaRedo  style={{ fontSize: "28px", color: "#FF9800" }} />, title: "Re.Attendance", count: "980" }
  ];

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
                        {/* {filterKey === "program" && ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"].map(option => <option key={option} value={option}>{option}</option>)}
                        {filterKey === "branch" && ["KG", "BSD", "PI"].map(option => <option key={option} value={option}>{option}</option>)}
                        {filterKey === "class" && ["A", "B"].map(option => <option key={option} value={option}>{option}</option>)} */}
                    {filterKey === "statusPembayaran" && ["Lunas", "DP", "Re.Attendance"].map(option => <option key={option} value={option}>{option}</option>)}
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
          <h5 className="mb-0">Detail Total Student</h5>
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

export default AdminDashboard;
