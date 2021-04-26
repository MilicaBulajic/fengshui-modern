import React, { Component, Fragment } from 'react'
import { GatsbyImage } from "gatsby-plugin-image"

const Lightbox = ({ gridItems }) => (
        <div className="columns is-10 is-offset-1">
          {gridItems.map((item) => (
            <div className="column is-one-third">
              <GatsbyImage
                  image={item.image.childImageSharp.gatsbyImageData}
                  alt={item.alt}
                />
            </div>
          ))}
        </div>
    );


export default Lightbox