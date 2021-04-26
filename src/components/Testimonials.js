import React from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import { GatsbyImage } from "gatsby-plugin-image";

const Testimonials = ({ testimonials }) => (
  <div className="columns is-multiline">
    {testimonials.map((testimonial) => (
      <article key={v4()} className="is-parent column is-4">
        <div
          style={{ paddingTop: "10%", paddingBottom: "10%", width: "auto", innerHeight: "auto" }}
          className="message-body testimonials"
        >
          <figure className="image is-128x128">
          <PreviewCompatibleImage
            
            imageInfo={testimonial.image}
            alt={testimonial.alt}
          />
          </figure>
          {testimonial.quote}
          <br />
          <cite> – {testimonial.author}</cite>
        </div>
      </article>
    ))}
  </div>
);

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
        .isRequired,
      quote: PropTypes.string,
      author: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
};

export default Testimonials;
