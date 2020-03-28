import React, {useState, useEffect } from "react";
import WMSService from "./WMSService";
import ServicesModel from "../../Models/Services";

const Services = () => {
  const [visib, setVisib] = useState();  

  useEffect(() => {
    const handleVisib = isVisib => {
      setVisib(isVisib);
    };
    ServicesModel.on("setVisib", handleVisib);
    return () => {
      ServicesModel.off("setVisib", handleVisib);
    };
  }, [visib]);

  return (
      <WMSService visib={visib}/>    
  );
};

export default Services;
