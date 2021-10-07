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

  return args;
}

module.exports = charNameShorthandParser;