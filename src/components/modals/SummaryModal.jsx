import '../Modals.css';

const DESCRIPTIONS = {
  available: "Funds currently available in the wallet.",
  requested: "Total $ that has been requested across all proposals.",
  received: "Total $ received through donations or other contributions.",
  spent: "Total $ that has already been allocated or spent.",
  earned: "Total $ earned through completed work or milestones."
};

export default function SummaryModal({ data, onClose }) {
  const title = data.charAt(0).toUpperCase() + data.slice(1);
  const description = DESCRIPTIONS[data] || 'No description available.';

  return (
    <div className="modal">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
