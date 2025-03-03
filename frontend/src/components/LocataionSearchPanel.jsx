import React from 'react';

const LocataionSearchPanel = ({ 
  suggestions, 
  setVehiclePanel, 
  setPanelOpen, 
  setPickup, 
  setDestination, 
  activeField 
}) => {  

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      
      setPickup(suggestion.description); 
    } else if (activeField === 'destination') {
      setDestination(suggestion.description); 
    }
    setPanelOpen(false);  
    setVehiclePanel(true);
  };
  return (
    <div className='flex flex-col justify-start items-start gap-5'>
         {
      Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div  key={idx} onClick={() => handleSuggestionClick(elem)} 
            className='flex w-full justify-start items-center gap-4 active:border-[#222] border p-2 rounded-lg '
          >
            <h2 className='bg-[#eee]  rounded-full px-3 py-2 flex justify-center items-center'>
              <i className="ri-map-pin-line text-[5vw]"></i>
            </h2>
            <h4 className='font-medium tracking-tighter leading-tight'>{elem.description}</h4>  {/* ✅ Corrected */}
          </div>
        ))
      ) : (
        <p className="font-medium tracking-tighter leading-tight">No suggestions available</p>
      )
    }
    </div>
  );
};

export default LocataionSearchPanel;
