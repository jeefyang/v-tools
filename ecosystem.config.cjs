module.exports = {
    apps: [{
      name: "vtools",
      port: "3013",
      exec_mode: "cluster",
      instance: "max",
      script: './.output/server/index.mjs',
      watch: ['./.output']
    }],
  };
  