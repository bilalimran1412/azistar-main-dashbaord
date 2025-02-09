export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
    color: 'white',
  },
};

export const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  switch (type) {
    case 'blockQuote':
      return 'draft-editor-quote-block';
    case 'CODEBLOCK':
      return 'draft-editor-code-block';
    case 'leftAlign':
      return 'leftAlign';
    case 'rightAlign':
      return 'rightAlign';
    case 'centerAlign':
      return 'centerAlign';
    case 'justifyAlign':
      return 'justifyAlign';
    default:
      break;
  }
};
