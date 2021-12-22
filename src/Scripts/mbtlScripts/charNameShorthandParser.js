const charNameShorthandParser = (args) => {
  // Filter warc & arc
  if (args[0].match(/^warc$/i)) {
    args.shift();
    args.unshift("Arcueid Brunestud")
    return args;
  } else if (args[0].match(/^rarc$/i) || args[0].match(/^redarc$/i)) {
    args.shift();
    args.unshift("Red Arcueid")
    return args;
  } else if (args[0].match(/^red$/i) && args[1].match(/^arc/i)) {
    args.shift()
    args.shift()
    args.unshift("Red Arcueid");
    return args;
  } 

  // Filter Hisui & Kohaku from Hisui and Kohaku (individual character)
  if (args[0].match(/^maids/i) || args[0].match(/^[hk]&[hk]$/i) || args[0].match(/^[hk][hk]$/i)) {
    args.shift();
    args.unshift("Hisui & Kohaku")
    return args;
  } else if (args[0].match(/^[hk]$/i) && (args[1].match(/^&$/i) || (args[1].match(/^and$/i))) && (args[2].match(/^[hk]$/i))) {
    args.shift();
    args.shift();
    args.shift();
    args.unshift("Hisui & Kohaku")
    return args;
  } else if (args[0].match(/^hisui$/i) && (args[1].match(/^&$/i) || (args[1].match(/^and$/i))) && (args[2].match(/^kohaku$/i))) {
    args.shift();
    args.shift();
    args.shift();
    args.unshift("Hisui & Kohaku")
  } else if (args[0].match(/^kohaku$/i) && (args[1].match(/^&$/i) || (args[1].match(/^and$/i))) && (args[2].match(/^hisui$/i))) {
    args.shift();
    args.shift();
    args.shift();
    args.unshift("Hisui & Kohaku")
  } else if (args[0].match(/^hisui&kohaku/i) || args[0].match(/^kohaku&hisui/i) || args[0].match(/^hisuiandkohaku/i) || args[0].match(/^kohakuandhisui/i)) {
    args.shift();
    args.unshift("Hisui & Kohaku")
    return args;
  }
  return args;
}

module.exports = charNameShorthandParser;