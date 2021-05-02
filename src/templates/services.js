import React from "react"
import * as PropTypes from "prop-types"
import TagList from '../components/TagList'
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import Slider from '../components/Slider'
import Features from '../components/Features'
import Testimonials from "../components/Testimonials"

const ServiceTemplate = ({
  title,
  content,
  contentComponent,
  image,
  intro,
  heading,
  description,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
    <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top`,
        height: `720px`,
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
        {heading}
      </h1>
    </div>
    <section className="section services">
        <h3>DESIGN YOUR HOME = DESIGN YOUR LIFE </h3>
        <PageContent className="container content" content={content} />
      </section>
      <div className="column is-10 is-offset-1">
      <Features gridItems={intro.blurbs} />
      <p>{description}</p>
      </div>
    </div>
    )
}

ServiceTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  tags: PropTypes.array,
  langKey: PropTypes.string
}

class ServicesPage extends React.Component {

render() {
  var dataMarkdown = [];
  if (this.props.data !== null) {
    dataMarkdown = this.props.data.markdownRemark;
  }
  const data = this.props.data;
  const { frontmatter } = data.markdownRemark;
  const description = frontmatter.headingDesc;
  const jsonData = data.allArticlesJson.edges[0].node.articles;
  const image = frontmatter.image.childImageSharp.fluid.src;
  const langKey = frontmatter.lang;
  const tags = frontmatter.tags;
    return (
      <Layout className="container" data={data} jsonData={jsonData} location={this.props.location}>
        <SEO
          frontmatter={frontmatter}
          postImage={image}
        />
        <div>
            <ServiceTemplate
            contentComponent={HTMLContent}
            heading={frontmatter.heading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            description={description}
            tags={tags}
            langKey={langKey}
            image={dataMarkdown.frontmatter.image}
            />
        </div>
      </Layout>
    )
  }
}

ServicesPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ServicesPage

export const pageQuery = graphql`query ServicesQuery($id: String!) {
  site {
    siteMetadata {
      languages {
        defaultLangKey
        langs
      }
    }
  }
  allArticlesJson(filter: {title: {eq: "home"}}) {
    edges {
      node {
        articles {
          en
          sr
        }
      }
    }
  }
  markdownRemark(id: {eq: $id}) {
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
      heading
      description
      intro {
        blurbs {
          image {
            childImageSharp {
              gatsbyImageData(width: 360, quality: 64, layout: CONSTRAINED)
            }
          }
          heading
          link
          text
        }
      }
    }
  }
}
`
