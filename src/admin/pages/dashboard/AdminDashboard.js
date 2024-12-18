import React, { useState } from "react";
import { FaUserGraduate, FaMicrophoneAlt, FaBrain, FaRocket, FaChalkboardTeacher, FaUserTie, FaPlane, FaVideo } from "react-icons/fa";
// import EditDashboard from "./EditDashboard";

const initialFilters = {
  startDate: "",
  endDate: "",
  branch: "",
  program: "",
  class: "",
  status: "",
};

const tableData = [
  { id: 1, name: "Alice", hp: "1234567890", email: "alice@example.com", program: "PS", branch: "PI", class: "A", invitationCode: "ABC123"},
  { id: 2, name: "Bob", hp: "2345678901", email: "bob@example.com", program: "SL", branch: "BSD", class: "B", invitationCode: "DEF456"},
  { id: 3, name: "Charlie", hp: "3456789012", email: "charlie@example.com", program: "LS", branch: "KG", class: "A", invitationCode: "GHI789"},
  { id: 4, name: "David", hp: "4567890123", email: "david@example.com", program: "PSA", branch: "PI", class: "B", invitationCode: "JKL012"},
  { id: 5, name: "Eve", hp: "5678901234", email: "eve@example.com", program: "PCPS", branch: "BSD", class: "A", invitationCode: "MNO345"},
  { id: 6, name: "Frank", hp: "6789012345", email: "frank@example.com", program: "HP", branch: "KG", class: "B", invitationCode: "PQR678"},
  { id: 7, name: "Grace", hp: "7890123456", email: "grace@example.com", program: "IAY", branch: "PI", class: "A", invitationCode: "STU901"},
  { id: 8, name: "Hank", hp: "8901234567", email: "hank@example.com", program: "PS", branch: "BSD", class: "B", invitationCode: "VWX234"},
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
        {["No", "Name", "HP", "Email", "Program", "Branch", "Class", "Invitation Code", "Status", "FU", "Action"].map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = (data) => (
    <tbody>
      {data.map(({ id, name, hp, email, program, branch, class: className, invitationCode, status, FU }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{hp}</td>
          <td>{email}</td>
          <td>{program}</td>
          <td>{branch}</td>
          <td>{className}</td>
          <td>{invitationCode}</td>
          <td>{status}</td>
          <td>{FU}</td>
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
                      onClick={() => action === "Edit" && handleEditClick({ id, name, hp, email, program, branch, class: className, invitationCode, status, FU })}
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
    { id: "totalStudentActive", icon: <FaUserGraduate style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Total Student Active", count: "12,628" },
    { id: "ps", icon: <FaMicrophoneAlt style={{ fontSize: "28px", color: "#FF5733" }} />, title: "Public Speaking", count: "1,234" },
    { id: "sl", icon: <FaBrain style={{ fontSize: "28px", color: "#6A5ACD" }} />, title: "Smart Learning", count: "1,025" },
    { id: "ls", icon: <FaRocket style={{ fontSize: "28px", color: "#FF9800" }} />, title: "Life & Success", count: "980" },
    { id: "psa", icon: <FaChalkboardTeacher style={{ fontSize: "28px", color: "#4CAF50" }} />, title: "Public Speaking Academy", count: "650" },
    { id: "pcps", icon: <FaUserTie style={{ fontSize: "28px", color: "#2196F3" }} />, title: "Private Coaching Public Speaking", count: "450" },
    { id: "hp", icon: <FaPlane style={{ fontSize: "28px", color: "#FFC107" }} />, title: "Holiday Program", count: "325" },
    { id: "iam", icon: <FaVideo style={{ fontSize: "28px", color: "#E91E63" }} />, title: "I Am YouTuber", count: "280" },
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
                <label className="form-label">{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}</label>
                {filterKey.includes("Date") ? (
                  <input type="date" className="form-control" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange} />
                ) : (
                  <select className="form-select" name={filterKey} value={filters[filterKey]} onChange={handleFilterChange}>
                    <option value="">All</option>
                    {filterKey === "program" && ["PS", "SL", "LS", "PSA", "PCPS", "HP", "IAY"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "branch" && ["KG", "BSD", "PI"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "class" && ["A", "B"].map(option => <option key={option} value={option}>{option}</option>)}
                    {filterKey === "status" && ["Active", "Pending", "Expired", "Paid"].map(option => <option key={option} value={option}>{option}</option>)}
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
