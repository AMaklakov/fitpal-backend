import oauthPlugin from 'fastify-oauth2'

export const GOOGLE_OAUTH_SETTINGS = {
  name: 'googleOAuth2',
  scope: ['profile email'],

  credentials: {
    client: {
      id: '<CLIENT_ID>',
      secret: '<CLIENT_SECRET>',
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION,
  },

  startRedirectPath: '/login/google',
  callbackUri: 'http://localhost:3000/login/google/callback',
}
