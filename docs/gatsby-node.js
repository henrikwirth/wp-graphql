const createExtensions = require("./create/createExtensions")


exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
        type File implements Node @infer {
            childMarkdownRemark: MarkdownRemark
        }

        type MarkdownRemark implements Node @infer {
            frontmatter: MarkdownRemarkFrontmatter
            fields: MarkdownRemarkFields
        }

        type MarkdownRemarkFields {
            image: String
            version: String
            slug: String
            graphManagerUrl: String
        }

        type MarkdownRemarkFrontmatter {
            title: String
            subtitle: String
            description: String
        }
    `)
}


exports.createPagesStatefully = async ({ graphql, actions, reporter }, options) => {

  console.log("--------> createPages", "Starting")

  await createExtensions({ actions, graphql, reporter }, options)


}
