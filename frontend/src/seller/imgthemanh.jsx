import React from 'react';

const ImageInput = ({ onChange, multiple }) => {
  return (
    <div>
            <input
      type="file"
      id="image"
      name="image"
      accept="image/*"
      multiple={multiple}
      onChange={onChange}
    />
    </div>

  );
};

export default ImageInput;
