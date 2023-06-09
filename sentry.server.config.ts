// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { Integrations } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN,
    environment: 'production',
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 0.2,
    release: process.env.VERCEL_GIT_COMMIT_SHA,
    integrations: [new Integrations.BrowserTracing()],
    ignoreErrors: [/^Loading chunk.*failed.$/], // ignore chunk loading errors
    enabled: process.env.VERCEL_ENV === 'production',
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
});
