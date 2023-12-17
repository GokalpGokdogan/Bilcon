// DetailsPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const DetailsPage = ({ match }) => {
    const {itemType, itemId } = useParams();
  //const itemId = match.params.itemId; // Access the item ID from the URL parameter

  useEffect(() => {
    // Fetch details for the item using the itemId
    // Your API call or data fetching logic goes here
    console.log(`Fetching details for item with ID: ${itemId}`);
  }, [itemId]);

  return (
    <div>
      <h2>Details Page</h2>
      <p>Item ID: {itemId}</p>
      {/* Display other details here */}
    </div>
  );
};

export default DetailsPage;
