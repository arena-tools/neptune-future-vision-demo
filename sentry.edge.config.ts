import * as Sentry from '@sentry/nextjs';
import { Integrations } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.VERCEL_ENV,
    integrations: [new Integrations.BrowserTracing(), new Sentry.Replay()],
    // Adjust this value in production, or use tracesSampler for greater control
    release: process.env.VERCEL_GIT_COMMIT_SHA,
    tracesSampleRate: 0.2,
    // ...
    ignoreErrors: [/^Loading chunk.*failed.$/], // ignore chunk loading errors
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,
});
