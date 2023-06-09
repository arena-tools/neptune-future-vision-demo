// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const path = require('path')
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
    // Your existing module.exports
    // ? sourceMap for sentry
    productionBrowserSourceMaps: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};


const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
    // ? Hiding Production Code in browser
    hideSourceMaps: true,
    // ? To upload all of the files in static/chunks/ [[[This should improve Sentry's value]]]
    widenClientFileUpload: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);



