import React, { useEffect, useState } from "react";
import Timer from "../Timer/Timer";

const ServiceTable = ({ service }) => {
  return (
    <div>
      <h1>{service.id}</h1>
      <div className="card">
        {Array.from({ length: service.count }).map((_, index) => (
          <div key={index}>
            <h3>
              {service.id} #{index + 1}
            </h3>

            <Timer rate={service.hourlyRate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTable;
