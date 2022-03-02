var tone = require('tonegenerator')
var header = require('waveheader');
var fs = require('fs');
var path = require('path')

module.exports = (options) => {
    // Extract all options
    const { frequencyStart, frequencyEnd, length, outputDir } = options

    if (!frequencyStart || !frequencyEnd) {
        throw new Error("Missing frequency start or end")
    }

    console.log(`Generating tones from ${frequencyStart} to ${frequencyEnd} (${length} seconds) to ${outputDir}`)

    for (var freq = frequencyStart; freq <= frequencyEnd; freq++) {
        console.log(`Writing file for frequency: ${freq}`)

        // Create folder
        var folder = path.resolve(outputDir)
        fs.mkdirSync(folder, { recursive: true })

        // Create file
        var file = fs.createWriteStream(path.resolve(folder, `${freq}.wav`))
        var samples = tone({ freq, lengthInSecs: length, volume: tone.MAX_16 })

        // Write data to it
        file.write(header(samples.length * 2, {
            bitDepth: 16
        }))

        var data = Int16Array.from(samples)

        var size = data.length * 2 // 2 bytes per sample
        buffer = Buffer.allocUnsafe(size)

        data.forEach((value, index) => {
            buffer.writeInt16LE(value, index * 2)
        })

        file.write(buffer)
        file.end()
    }
}
