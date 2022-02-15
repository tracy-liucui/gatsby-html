const { createContentDigest } = require("gatsby-core-utils");
const path = require('path');

exports.onCreateNode = async ({
  node, loadNodeContent, createNodeId, actions
}) => {

  // only care about html file
  if (node.internal.type !== 'File' || node.internal.mediaType !== 'text/html') return;
  
  const { createNode } = actions;

  // read the raw html content
  const nodeContent = await loadNodeContent(node);

  // set up the new node
  const htmlNodeContent = {
    id: createNodeId(node.relativePath), // required
    content: nodeContent,
    name: node.name, // take the file's name as identifier
    internal: {
      type: 'HTMLContent',
      contentDigest: createContentDigest(nodeContent), // required
    }
  }

  createNode(htmlNodeContent);
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const Template = path.resolve(__dirname, 'src/templates/layout.js')

  const result = await graphql(`
  {
    allHtmlContent {
      edges {
        node {
          name
          content
        }
      }
    }
  }
  `)

  if (result.errors) throw result.errors;
  result.data.allHtmlContent.edges.forEach(({ node }) => {
    createPage({
      path: node.name,
      component: Template,
      context: {
        name: node.name,
      }
    })
  })
}