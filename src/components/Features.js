import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import { GatsbyImage } from "gatsby-plugin-image"


const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map((item) => (
      <div key={item.text} className="column is-6">
        <section className="section cards">
          <div className="box has-text-centered">
            <div className="services">
            <h4 className="title">{item.heading}</h4>
            <p className="features">{item.text}</p>
            <div className="bg-image">
   
                <PreviewCompatibleImage
                  style={{
                    backgroundImage: `url(${
                      !!item.childImageSharp
                        ? item.childImageSharp.fluid.src
                        : item
                    })`,
                  }}
                  imageInfo={item}
                />
                          
              </div>
            </div>
          </div>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
