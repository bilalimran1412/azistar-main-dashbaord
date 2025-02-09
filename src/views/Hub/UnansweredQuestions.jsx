const UnansweredQuestions = ({title,  subText, text, buttonLabel = "Manage", Icon }) => {
    return (
      <div className="unanswered-questions-container">
        <div className="unanswered-questions-header">
          <div className="unanswered-questions-icon">
            {Icon}
          </div>
          <div>
            <p className="unanswered-questions-title">{title}</p>
            <p className="unanswered-questions-description">{subText}</p>
          </div>
        </div>
        <p className="unanswered-questions-count">{text}</p>
        <div className="unanswered-questions-footer">
          <div className="progress-bar"></div>
          <div className="hdr_deta manage-button-container">
            <button type="button" className="add_new_deta manage-button">
              <span>{buttonLabel}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UnansweredQuestions;
  