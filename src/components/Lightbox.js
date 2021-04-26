import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from "gatsby-plugin-image"

class Lightbox extends Component {
  render() {
    const { images } = this.props;
    const imageStyle = { borderRadius: "5px" };
    return (
      <section className="section">
        <div className="columns is-10 is-offset-1">
          {images.map((img) => (
            <div className="column is-one-third">
              <GatsbyImage
                image={img.image.childImageSharp.fluid}
                alt={img.alt}
                style={imageStyle}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Lightbox