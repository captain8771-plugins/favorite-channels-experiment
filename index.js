const { Plugin } = require('powercord/entities');
const Experiments = require("powercord/webpack").getModule(["ExperimentBuckets"], false)

module.exports = class favoriteChannels extends Plugin {
  startPlugin() {
    if (!Experiments.ExperimentStore.hasRegisteredExperiment("2021-09_favorites_server")) {
        Experiments.registerUserExperiment({
          buckets: [0, 1],
          clientFilter: null,
          description: ["Control", "Treatment 1: It is on."],
          title: "Enable fancy super-alpha favorites server.",
          type: "user",
          id: "2021-09_favorites_server"
        });
      }
    Experiments.overrideBucket("2021-09_favorites_server", 1) 
  }

  pluginWillUnload() {
    Experiments.overrideBucket("2021-09_favorites_server", 0) 
  }
}

