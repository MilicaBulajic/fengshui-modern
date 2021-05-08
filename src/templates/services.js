import React from "react"
import * as PropTypes from "prop-types"
import { graphql } from 'gatsby'
import Layout from "../components/Layout"
import SEO from '../components/SEO/SEO'
import Content, { HTMLContent } from "../components/Content"
import Features from '../components/Features'
import SubscribeForm from "../components/SubscribeForm";

const ServiceTemplate = ({
  title,
  content,
  contentComponent,
  image,
  intro,
  heading,
  subheading,
  description,
  link,
  tags,
  langKey
}) => {
  const PageContent = contentComponent || Content
  return (
    <div>
    <div
      className="full-width-image margin-top-0 services-mob"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`
      }}
    >
    </div>
    <section className="section services">
      <h3>{heading}</h3>
        <PageContent className="container content" content={content} />
      <h3>{subheading}</h3>
      </section>
      <div className="column is-10 is-offset-1">
      <Features gridItems={intro.blurbs} />
      </div>
      <section className="section full-width-text">
        <div className="columns mobile">
          <div className="column is-6 is-offset-1">
          <p>{description}</p>
          </div>
          <div className="column is-4 second">
            <SubscribeForm />
          </div>
        </div>
      </section>
      </div>

    )
}

ServiceTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  subheading: PropTypes.string,
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
            subheading={frontmatter.subheading}
            title={frontmatter.title}
            content={data.markdownRemark.html}
            intro={frontmatter.intro}
            description={frontmatter.description}
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
      subheading
      description
      intro {
        blurbs {
          image {
            childImageSharp {
              gatsbyImageData(width: 360, quality: 64, layout: CONSTRAINED)
            }
          }
          heading
          subheading
          link
          text
        }
      }
    }
  }
}
`
