function AutoSizeTextArea({
  disabled = false,
  updateVerse,
  index,
  verseObject,
  defaultValue = '_'.repeat(50),
}) {
  return (
    <div
      key={index}
      contentEditable={!disabled}
      defaultValue={defaultValue}
      suppressContentEditableWarning={true}
      onBlur={(el) => {
        updateVerse(index, el.target.innerText)
      }}
      className={`block w-full mx-3 focus:outline-none focus:inline-none focus:bg-white  ${
        verseObject.verse || disabled ? '' : 'bg-gray-300'
      }`}
    >
      {verseObject.verse}
    </div>
  )
}

export default AutoSizeTextArea
