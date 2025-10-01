import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that enables the buying
          and selling of products or services over the internet. It acts as a
          virtual marketplace where businesses and individuals can showcase
          their offerings, interact with customers, and carry out secure
          transactions without the need for a physical store.
        </p>
        <p>
          These websites have become increasingly popular due to their
          convenience, accessibility, and global reach. A typical e-commerce
          site displays products or services along with detailed descriptions,
          images, prices, and available variations such as sizes or colors. Each
          product usually has its own dedicated page providing relevant
          information to help customers make informed purchasing decisions.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
