const PictureChoice = ({ cards, handleFormSubmit }) => (
    <div className="image_carsule_container mt-4 flex">
      {cards?.length > 0 ? (
        cards.map((card, idx) => (
          <div key={idx}>
            <h4>{card.text}</h4>
            <img
              onClick={() => handleFormSubmit(null, card.image, null, card.id)}
              className="button-style p-2 bg-gray-300 text-gray-800 rounded-lg mr-2"
              src={card.image}
              alt="Choice"
            />
          </div>
        ))
      ) : (
        <p>No Cards available</p>
      )}
    </div>
  );
  
  export default PictureChoice;
  