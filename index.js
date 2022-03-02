const path = require("path")
const yargs = require("yargs")
const { hideBin } = require("yargs/helpers")
const generator = require("./generator")

yargs(hideBin(process.argv))
  .command(
    "generate",
    "generates a tone list",
    (yargs) => yargs
      .options({
        "start": { type: "number", description: "Frequency start", demandOption: true },
        "end": { type: "number", description: "Frequency end", demandOption: true },
        "length": { type: "number", description: "File length in seconds", default: 0.5 },
        "output": { alias: "o", type: "string", description: "Output directory", default: path.join(__dirname, "output") },
      }),
    (argv) => {
      generator({
        frequencyStart: argv.start,
        frequencyEnd: argv.end,
        length: argv.length,
        outputDir: argv.output,
      })
    }
  )
  .parse()
