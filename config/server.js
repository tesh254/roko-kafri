module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "c49d34db847306593d94a937eb375a4d"),
    },
  },
  url: "http://localhost:1337"
});
