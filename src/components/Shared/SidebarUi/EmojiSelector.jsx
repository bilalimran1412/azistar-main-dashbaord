import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function EmojiSelector({ setEmoji }) {
  const handleEmojiSelect = (emoji) => {
    setEmoji(emoji.native);
  };

  return <Picker data={data} onEmojiSelect={handleEmojiSelect} perLine={8} />;
}

export default EmojiSelector;
