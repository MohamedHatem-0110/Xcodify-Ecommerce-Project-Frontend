import React from "react";

const Section = ({ title, content }) => {
  return (
    <section className="flex-col">
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="grid grid-cols-3 gap-5 md:grid-cols-4"></div>
    </section>
  );
};

export default Section;
