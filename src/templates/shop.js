import React from "react";
import * as PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO/SEO";
import Content, { HTMLContent } from "../components/Content";
import Buy from "../components/Buy";
import Book from "../components/Book";
import Slider from '../components/Slider'
import { FormattedMessage } from "react-intl";


const ShopPageTemplate = ({ title, content, contentComponent, display,
  array, description, langKey }) => {
  const PageContent = contentComponent || Content;
  return (
    <div>
      <section className="about">
        <div className="column is-12 is-offset-1">
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              <div className="tile">
                <div className="tile is-parent is-vertical">
                  <article className="shop">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <Slider array={array} display={display}/>
                    <PageContent className="content" content={content} />
                  </article>
                </div>
                <div className="tile is-parent">
                  <article className="tile is-child buy">
                    <FormattedMessage id="info-price" />
                    <Buy langKey={langKey} />
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
  display: PropTypes.shape({
    array: PropTypes.array,
  }),
};

class ShopPage extends React.Component {
  render() {
    let data;
    let dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark;
      data = this.props.data;
    }
    const jsonData = this.props.data.allArticlesJson.edges[0].node.articles;
    const { frontmatter } = dataMarkdown;
    const image = dataMarkdown.frontmatter.imageCardSL;
    const langKey = dataMarkdown.frontmatter.lang;
    const { display } = frontmatter.slider;
    const { array } = frontmatter.slider;
    const tags = frontmatter.tags;
    return (
      <Layout
        className="container"
        data={this.props.data}
        jsonData={jsonData}
        location={this.props.location}
      >
        <SEO frontmatter={frontmatter} postImage={image} />
        <div>
          <ShopPageTemplate
            image={dataMarkdown.frontmatter.image}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            description={frontmatter.description}
            tags={tags}
            langKey={langKey}
            heading={dataMarkdown.frontmatter.heading}
            display={display}
            array={array}
          />
        </div>
      </Layout>
    );
  }
}

ShopPage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        slider {
          display
            array {
              original 
              originalAlt
              thumbnail
            }
          }
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
