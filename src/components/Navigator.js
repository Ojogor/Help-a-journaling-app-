import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function Navigator({ handlePreviousEntry, handleNextEntry }) {
  return (
    <div className="navigator">
      <button className="navigator__prev" onClick={handlePreviousEntry}>
        <BsChevronLeft className="navigator__icon" />
      </button>
      <button className="navigator__next" onClick={handleNextEntry}>
        <BsChevronRight className="navigator__icon" />
      </button>
    </div>
  );
}
