const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "capa back end coding test api",
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:3000/`,
      description: "for local use",
    },
  ],
};

export default swaggerDef;
