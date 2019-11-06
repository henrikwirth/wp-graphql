
const path = require('path');

//TODO: Get the template right
const docTemplate = path.resolve('src/gatsby-theme-apollo-docs/components/template.js')


const GET_ALL_FILES = `
    query GET_ALL_FILES($fileName:String) {
    
      allFile(filter: {name: {eq: $fileName}}) {
        nodes {
          name
          childMarkdownRemark {
            rawMarkdownBody
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
`

/**
 * Array to store all pages. We make paginated requests
 * to WordPress to get all pages, and once we have all pages,
 * then we iterate over them to create pages.
 *
 * @type {Array}
 */
const allFiles = []

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options) => {
  /**
   * This is the method from Gatsby that we're going
   * to use to create pages in our static site.
   */
  const { createPage } = actions

  /**
   * Fetch files method. This accepts variables to alter
   * the query.
   *
   * @param variables
   * @returns {Promise<*>}
   */
  const fetchFiles = async (variables) =>
    /**
     * Fetch pages using the GET_ALL_FILES query and the variables passed in.
     */
    await graphql(GET_ALL_FILES, variables).then(({ data }) => {
      /**
       * Extract the data from the GraphQL query results
       */
      const {
        allFile: {
          nodes,
        },
      } = data

      /**
       * Map over the files for later creation
       */
      nodes
      && nodes.map((node) => {
        allFiles.push(node)
      })

      /**
       * Once we're done, return all the pages
       * so we can create the necessary files with
       * all the data on hand.
       */
      return allFiles
    })

  /**
   * Kick off our `fetchFiles` method which will get us all
   * the files we need to create individual pages.
   */
  await fetchFiles({ fileName: 'README' }).then((readmeFiles) => {


    readmeFiles && readmeFiles.map((file) => {

      createPage({
        // Each file is required to have a `path` as well
        // as a template component. The `context` is
        // optional but is often necessary so the template
        // can query data specific to each file.
        path: `extension/${file.name}`,
        component: docTemplate,
        context: file,
      })

    })

    console.log("# ----- EXTENSIONS TOTAL ----- #", `${readmeFiles.length}`)
  })

}

