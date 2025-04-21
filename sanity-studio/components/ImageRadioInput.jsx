// sanity-studio/components/ImageRadioInput.jsx
import React from 'react'
// 1. Correct import for 'set' patch helper in Sanity v3
import { set } from 'sanity'
// 2. FormField might not be needed or available at the old path.
//    We'll remove it and rely on the Studio to render the title/description around our input.
// import FormField from '@sanity/base/components/FormField' // REMOVE or COMMENT OUT

// Basic styling (customize as needed)
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '5px', // Add some space if FormField wrapper is removed
  },
  option: {
    border: '1px solid #ccc',
    padding: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'border-color 0.2s ease',
    borderRadius: '3px', // Optional: softer corners
  },
  optionSelected: {
    borderColor: '#36f', // Use Sanity UI blue for consistency
    boxShadow: '0 0 0 1px #36f', // Add focus ring effect
  },
  image: {
    maxWidth: '350px', // Adjust size as needed
    maxHeight: '150px', // Adjust size as needed
    display: 'block',
    marginBottom: '5px',
    backgroundColor: '#eee', // Add a light background for images
  },
  title: {
    fontSize: '0.8em',
    color: '#666', // Slightly dimmer text color
  }
}

const ImageRadioInput = React.forwardRef((props, ref) => {
  const {
    // schemaType replaces type in v3 for accessing schema definition
    schemaType,
    value, // The current value of the field
    readOnly,
    // markers, // We get these but won't explicitly render them without FormField
    // presence, // We get these but won't explicitly render them without FormField
    onChange, // Function to call when the value changes
  } = props

  // 3. Access options list via schemaType
  const options = schemaType.options?.list || []

  const handleSelect = (optionValue) => {
    if (!readOnly) {
      // 4. Use 'set' directly from the 'sanity' import
      onChange(set(optionValue))
    }
  }

  // 5. Render the container directly, without the FormField wrapper.
  //    The Studio will typically render the title/description defined in the schema.
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
            tabIndex={0} // Make it focusable
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option.value);
                }
            }}
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