import React, { useRef, useEffect } from 'react';

const SideComponent = ({ isOpen, closeSideComponent }) => {
  const sideComponentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideComponentRef.current && !sideComponentRef.current.contains(event.target)) {
        closeSideComponent();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeSideComponent]);

  return (
    <div
      ref={sideComponentRef}
      className={`side-component ${isOpen ? 'open' : 'closed'}`}
    >
      <button className="close-button" onClick={closeSideComponent} title='Fermer le chat' ><span className="material-symbols-outlined">arrow_forward_ios</span></button>
      <div className="chat-lines">
        <p>Chat Line 1</p>
        <p>Chat Line 2</p>
        <p>Chat Line 3</p>
      </div>
    </div>
  );
};

export default SideComponent;
