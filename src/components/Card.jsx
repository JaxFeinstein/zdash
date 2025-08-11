import './Card.css';

export default function Card({ card, currency, exchangeRate, onOpenModal }) {
  const {
    id,
    title,
    date,
    raised,
    target,
    progress,
    creators,
    status,
    wallet_addresses,
    description,
    tags,
    priority,
    milestones
  } = card;

  const formatAmount = () => {
    const amt = currency === 'USD'
      ? `$${(raised * exchangeRate).toFixed(2)} of $${(target * exchangeRate).toFixed(2)} USD`
      : `${raised.toFixed(3)} of ${target.toFixed(3)} ZEC`;
    return `Raised ${amt}`;
  };

  const statusClass = {
    'COMPLETED': 'status-completed',
    'IN PROGRESS': 'status-inprogress',
    'BLOCKED': 'status-blocked',
    'NOT STARTED': 'status-notstarted',
  }[status] || '';

  const openDetails = () => {
    onOpenModal('details', { title, description, tags, priority, milestones });
  };

  const openQR = () => {
    onOpenModal('qr', { address: wallet_addresses });
  };

  const stages = ['Analyze', 'Design', 'Develop', 'Deploy', 'Maintain'];
  const stagePercents = [0, 25, 50, 75, 100];

  return (
    <div className="card">
      <button
        className="menu-button"
        aria-label="Open details menu"
        title="Details"
        onClick={openDetails}
      >
        ⋯
      </button>
      <div className={`status-badge ${statusClass}`}>{status}</div>
      <div className="card-left">
        <div className="thumbnail"></div>
        <button className="fund-btn" onClick={openQR}>CONTRIBUTE</button>
      </div>
      <div className="card-right">
        <h3 className="title">{title}</h3>
        <div className="authors">👤 {creators} &nbsp; 📅 {date}</div>

        <div className="tags">
          {tags && tags.map((tag, i) => <span key={i}>{tag}</span>)}
        </div>

        <p className="description">{description}</p>

        <div className="tiers">
          <div className="tier">
            <span>PRIORITY: {priority}</span>
            <span>{formatAmount()}</span>
          </div>
        </div>

        <div className="progress">
          <div className="bar">
            <div className="filled" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="milestones">
            {stages.map((stage, i) => {
              const active = progress >= stagePercents[i];
              return (
                <div
                  className={`step ${active ? 'active' : ''}`}
                  key={stage}
                  onClick={() => onOpenModal('milestone', { name: stage })}
                >
                  {stage}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}  
