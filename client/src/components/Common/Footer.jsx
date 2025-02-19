import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h2 className="text-lg text-gray-800 mb-4">News Letter</h2>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p>Sign up and get 10% off on your first order.</p>
          {/* Newsletter Form  */}
          <form className="flex">
            <input type="email" placeholder="Enter your email" className=""/>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
