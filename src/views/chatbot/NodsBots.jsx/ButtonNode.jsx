const ButtonNode = ({ buttons, handleFormSubmit }) => (
    <div className="button_container_node mt-4 flex">
      {buttons?.length > 0 ? (
        buttons.map((button, idx) => (
          <button
            key={idx}
            onClick={() => handleFormSubmit(null, button.text, null, button.id)}
            className="node_ins_btn button-style p-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
          >
            {button.text}
          </button>
        ))
      ) : (
        <p>No buttons available</p>
      )}
    </div>
  );
  
  export default ButtonNode;
  