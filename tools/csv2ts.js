const fs = require('fs');
const parse = require('csv-parse');
const transform = require('stream-transform');

const parser = parse();

const toJSON = o => '  '.concat(JSON.stringify(o, null, '  '), ',\n');

const transformer = transform((record, callback) => {
    let [id, name, lat, lng, year, length, width] = record;

    id = 'bridge-' + id.replace(/\s*/g, '').replace('/', '-');

    lat = parseFloat(lat);
    lng = parseFloat(lng);
    year = parseInt(year, 10);
    length = parseInt(length, 10);
    width = parseInt(width, 10);

    callback(null, toJSON({ id, name, lat, lng, year, length, width }));
});

const esmStart = "import { Bridge } from './bridge';\n\nexport const Bridges: Array<Bridge> = [\n";
const esmEnd = "];\n";

const input = fs.createReadStream('../bridge_condition_open_data_2017_update_final.csv');
const output = fs.createWriteStream('../src/app/bridges.ts', { flags: 'w' });

output.write(esmStart);
input.pipe(parser).pipe(transformer).on('end', () => output.end(esmEnd)).pipe(output);