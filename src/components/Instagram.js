import React, { useState, useEffect } from "react";

const url =
  'https://www.instagram.com/graphql/query/?query_hash=42323d64886122307be10013ad2dcc44&variables={"id":8675410194,"first":6}';


  const Instagram = () => {
  const [insta, setInsta] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        const photosArray = data.data.user.edge_owner_to_timeline_media.edges;
        setInsta(photosArray);
      });
  }, []);
  return (
    <div>
      {insta.map((photo) => (
        <img src={photo.node.display_url} key={photo.node.id} />
      ))}
    </div>
  );
};
export default Instagram;