module.exports = {
    siteMetadata: {
      title: `static-contents`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${__dirname}/content`,
          name: `html`,
        },
      }
    ]
}