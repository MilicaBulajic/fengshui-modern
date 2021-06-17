import React from "react";
import * as PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import Content, { HTMLContent } from "../components/Content";


const SuccessPageTemplate = ({ title, content, contentComponent, image, tags, langKey }) => {
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
                    <PageContent className="content" content={content} />
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child">
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
      className="full-width-image margin-top-0 about-mob"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
      }}
    >
      <h1
        className="has-text-weight-bold is-size-1"
        style={{
          fontFamily: "Caveat,cursive",
          color: "#4a4a4a",
          padding: "1rem",
        }}
      >
      </h1>
    </div>
    </div>
  );
};
  

SuccessPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  tags: PropTypes.array,
  langKey: PropTypes.string,
};

class SuccessPage extends React.Component {
  render() {
    var dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
    const { frontmatter } = dataMarkdown;
    const image = frontmatter.image.childImageSharp.fluid.src;
    const langKey = dataMarkdown.frontmatter.lang;
    const tags = frontmatter.tags;
    return (
      <Layout
        className="container"
        data={this.props.data}
        jsonData={jsonData}
        location={this.props.location}
      >
        <div>
          <SuccessPageTemplate
            image={dataMarkdown.frontmatter.image}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            tags={tags}
            langKey={langKey}
          />
        </div>
      </Layout>
    );
  }
}

SuccessPage.propTypes = {
  data: PropTypes.object.isRequired,
  langKey: PropTypes.string,
};

export default SuccessPage;

export const pageQuery = graphql`
  query SuccessPageQuery($id: String!) {
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
