import React from "react";
import * as PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import Content, { HTMLContent } from "../components/Content";
import Checkout from "../components/checkout.js";
import Book from "../components/Book";

const ShopPageTemplate = ({ title, content, contentComponent, image, description, langKey }) => {
  const PageContent = contentComponent || Content;
  return (
    <div>
      <section className="about">
        <div className="column is-10 is-offset-1">
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="tile is-child">
                    <h3>{description}</h3>
                    <Book />
                    <PageContent className="content" content={content} />
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child">
                    <p>Price €6</p>
                    <Checkout />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
  

ShopPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string,
};

class ShopPage extends React.Component {
  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
    const { frontmatter } = dataMarkdown;
    const image = dataMarkdown.frontmatter.imageCardSL;
    const langKey = frontmatter.lang;
    const tags = frontmatter.tags;
    return (
      <Layout
        className="container"
        data={this.props.data}
        jsonData={jsonData}
        location={this.props.location}
      >
        <GatsbySeo noindex={true} />
        <div>
          <ShopPageTemplate
            image={dataMarkdown.frontmatter.image}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            description={frontmatter.description}
            langKey={langKey}
          />
        </div>
      </Layout>
    );
  }
}

ShopPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ShopPage;

export const pageQuery = graphql`
  query ShopPageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
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
      html
      frontmatter {
        id
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
      fields {
        slug
      }
    }
  }
`;
