import React from 'react';

interface NavbarProps {
  showArchivedNotes: boolean;
  setShowArchivedNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ showArchivedNotes, setShowArchivedNotes }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Solvers Note
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <div className="navbar-nav flex-row">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => setShowArchivedNotes(!showArchivedNotes)}
              >
                {showArchivedNotes ? "Ver Notas Activas" : "Ver Notas Archivadas"}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;