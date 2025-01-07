import React, { Component } from 'react';

class Pagination extends Component {
  handlePageChange = (page) => {
    const { totalPages, onPageChange } = this.props;
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);  // Call the parent's onPageChange function with the new page
    }
  };

  render() {
    const { currentPage, totalPages, filteredProspects } = this.props;
    
    // Menentukan rentang halaman yang ditampilkan
    const pageRange = 2; // Menampilkan 2 halaman sebelum dan setelah halaman aktif
    let startPage = Math.max(currentPage - pageRange, 1);
    let endPage = Math.min(currentPage + pageRange, totalPages);

    // Menyesuaikan rentang halaman jika berada di ujung halaman (misalnya halaman terakhir)
    if (currentPage <= pageRange) {
      endPage = Math.min(5, totalPages);  // Menampilkan halaman 1 hingga 5 jika halaman aktif dekat dengan awal
    }
    if (currentPage >= totalPages - pageRange) {
      startPage = Math.max(totalPages - 4, 1);  // Menampilkan halaman terakhir jika halaman aktif dekat dengan akhir
    }

    return (
      <nav className="d-flex justify-content-end mt-3 mx-3" aria-label="Page navigation">
        <ul className="pagination pagination-rounded pagination-outline-primary">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => this.handlePageChange(1)}>
              <i className="bx bx-chevrons-left"></i>
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => this.handlePageChange(currentPage - 1)}>
              <i className="bx bx-chevron-left"></i>
            </button>
          </li>

          {/* Menampilkan halaman dengan rentang yang terbatas */}
          {[...Array(endPage - startPage + 1)].map((_, index) => (
            <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? "active" : ""}`}>
              <button className="page-link" onClick={() => this.handlePageChange(startPage + index)}>
                {startPage + index}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages || filteredProspects.length === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => this.handlePageChange(currentPage + 1)}>
              <i className="bx bx-chevron-right"></i>
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages || filteredProspects.length === 0 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => this.handlePageChange(totalPages)}>
              <i className="bx bx-chevrons-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
