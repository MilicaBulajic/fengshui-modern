import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';

const Instagram = () => (
  <StaticQuery
    query={graphql`
      query InstagramPosts {
        allInstagramContent(limit: 4) {
          edges {
            node {
              permalink
                localImage {
                  childImageSharp {
                    fluid(maxHeight: 500, maxWidth: 500 quality: 50) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <div style={{
        marginBottom: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {
          data.allInstagramContent.edges.map((item, i) => (
            item.node.localImage ? (

              <div key={i}>
                <a
                  href={item.node.permalink}
                  target='_blank'
                  rel='noopener'
                >
                  <Image
                    fluid={item.node.localImage.childImageSharp.fluid}
                  />
                </a>
              </div>
            ) : (<div></div>)
          ))
        }
      </div>
    )}
  />
);

export default Instagram; 
