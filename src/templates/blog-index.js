import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import BlogRoll from "../components/BlogRoll";
import SEO from "../components/SEO/SEO";
import { FormattedMessage } from "react-intl";
import { graphql } from "gatsby";
import blog from "../../public/img/blog.jpg"

export default class BlogIndexPage extends React.Component {
  render() {
    const data = this.props.data;
    const location = this.props.location;
    const jsonData = data.allArticlesJson.edges[0].node.articles;

    return (
      <Layout data={data} jsonData={jsonData} location={location}>
        <SEO frontmatter={data.markdownRemark.frontmatter} />
        <section className="content">
            <div
                className="full-width-image-container margin-top-0 blog-mob"
                style={{
                  backgroundImage: `url(${blog})`,
                  backgroundPosition: 'top',
                }}
              >
              </div>
              <div className="column is-10 is-offset-1 blog">
                <h3>LAST NEWS</h3>
                 <BlogRoll />
            </div>
        </section>
      </Layout>
    );
  }
}

BlogIndexPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogIndex($id: String!) {
    site {
      siteMetadata {
        title
        languages {
          langs
          defaultLangKey
        }
      }
    }
    allArticlesJson(filter: { title: { eq: "home" } }) {
      edges {
        node {
          articles {
            en
            sr
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        id
        date
        title
        description
        tags
        lang
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
      }
    }
  }
`;
