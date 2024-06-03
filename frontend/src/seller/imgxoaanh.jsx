import React from 'react';

const ImageInput = ({ imagePreview, onChange, onRemove }) => {
  return (
    <div className="d-flex align-items-center">
      <img
        src={imagePreview}
        alt="Preview"
        className="img-thumbnail m-1"
        style={{ maxWidth: '200px' }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <button
        type="button"
        className="btn btn-danger btn-sm ms-2"
        onClick={onRemove}
      >
        Xóa
      </button>
    </div>
  );
};

export default ImageInput;
