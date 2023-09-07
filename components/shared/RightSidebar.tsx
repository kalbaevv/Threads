import React from "react";

export default function RightSidebar() {
  return (
    <section className="custom-scroll-bar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested communities
        </h3>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested users</h3>
      </div>
    </section>
  );
}
