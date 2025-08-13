import React from 'react'
import { set } from 'sanity'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '5px', 
  },
  option: {
    border: '1px solid #ccc',
    padding: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'border-color 0.2s ease',
    borderRadius: '3px',
  },
  optionSelected: {
    borderColor: '#36f',
    boxShadow: '0 0 0 1px #36f',
  },
  image: {
    maxWidth: '350px', 
    maxHeight: '150px',
    display: 'block',
    marginBottom: '5px',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: '0.8em',
    color: '#666', 
  }
}

const ImageRadioInput = React.forwardRef((props, ref) => {
  const {
    schemaType,
    value,
    readOnly,
    onChange,
  } = props

  const options = schemaType.options?.list || []

  const handleSelect = (optionValue) => {
    if (!readOnly) {
      onChange(set(optionValue))
    }
  }

  return (
    <div style={styles.container} ref={ref}>
      {options.map((option) => {
        const isSelected = value === option.value
        return (
          <div
            key={option.value}
            style={{
              ...styles.option,
              ...(isSelected ? styles.optionSelected : {}),
            }}
            onClick={() => handleSelect(option.value)}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
          >
            {option.imageSrc && (
               <img src={option.imageSrc} alt={option.title} style={styles.image} />
            )}
            <div style={styles.title}>{option.title}</div>
          </div>
        )
      })}
    </div>
  )
})

export default ImageRadioInput