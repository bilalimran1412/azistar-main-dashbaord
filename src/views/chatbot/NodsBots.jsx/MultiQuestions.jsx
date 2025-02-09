const MultiQuestions = ({ elements, handleFormSubmit }) => (
    <div className="question_container mt-4">
      <form onSubmit={(e) => e.preventDefault() || handleFormSubmit()}>
        {elements?.map((question) => (
          <div key={question.id} className="chatbot-input mb-4">
            <label htmlFor={`input-${question.id}`} className="question_label">{question.label}</label>
            <input
              id={`input-${question.id}`}
              type={
                question.config.type === 'askEmail' ? 'email' : 
                question.type === 'askPhone' ? 'tel' : 
                'text'
              }
              required={question.config.isRequired}
              placeholder={question.config.placeholder || 'Type your answer...'}
              className="form-input p-2 border rounded-lg"
            />
          </div>
        ))}
        <button type="submit" className="form-button p-2 bg-blue-500 text-white rounded-lg ml-2">
          Submit
        </button>
      </form>
    </div>
  );
  
  export default MultiQuestions;
  