const ResolutionRate = ({Title, Icon, buttonText, percentage = "0%", isButtonDisabled = true }) => {
    return (
      <div className="resolution-rate-container">
        <div className="resolution-rate-header">
          <div className="resolution-rate-title">
            <p className="resolution-rate-label">{Title}</p>
            <div className="resolution-rate-icon">
              {Icon}
            </div>
          </div>
          <div className="resolution-rate-value-container">
            <div aria-label="Resolution rate value" className="resolution-rate-value">
              <h2 className="resolution-rate-percentage">{percentage}</h2>
            </div>
            <button type="button" className="resolution-rate-button" disabled={isButtonDisabled}>
              <span>{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResolutionRate;
  