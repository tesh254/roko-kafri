module.export = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "kafri@roko.store",
        pass: "xVchapSalo254",
      },
    },
    settings: {
      defaultFrom: "kafri@roko.store",
      defaultReplyTo: "kafri@roko.store",
    },
  },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: "anotherone",
      api_key: "999489497197773",
      api_secret: "gCwKBoo4nXSmIpMqoJvNK2ASCdw",
    },
  },
});
