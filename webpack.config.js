
const webpack5esmInteropRule = {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  };
  
config.module.rules = [ webpack5esmInteropRule, ...otherRules ]