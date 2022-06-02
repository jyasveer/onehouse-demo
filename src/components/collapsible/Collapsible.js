import "./Collapsible.css";

const Collapsible = ({ isOpen, children }) => {
  const height = isOpen ? "auto" : "0";

  return (
    <div style={{ height }} className="collapsible-container">
      {children}
    </div>
  );
};

export default Collapsible;
