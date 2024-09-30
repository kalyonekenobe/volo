const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const defaultSeederPattern = `const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  async up() {
    
  },

  async down() {
    
  },
};
`;

const main = async () => {
  const commandLineArguments = process.argv.slice(2);

  if (
    commandLineArguments.includes('--up') &&
    commandLineArguments.includes('--down') &&
    commandLineArguments.includes('--create')
  ) {
    console.error(
      'Cannot run seeders because of ambiguous parameters --up, --down or --create. Only one of them should be chosen.',
    );
    return;
  }

  if (commandLineArguments.includes('--create')) {
    const index = commandLineArguments.indexOf('--create');
    if (index == commandLineArguments.length - 1) {
      console.error('Cannot create new seeder file. No seeder name was specified.');
      return;
    }

    if (index <= commandLineArguments.length - 3) {
      console.error(
        'Cannot create new seeder file. Too much parameters for --create option were specified.',
      );
      return;
    }

    console.log(commandLineArguments);

    const now = new Date();
    const filename = `${now.getTime()}${now.getMilliseconds().toString().padStart(3, '0')}-${
      commandLineArguments[index + 1]
    }.seeder.js`;

    fs.writeFile(path.resolve(__dirname, `${filename}`), defaultSeederPattern, err => {
      if (err) {
        console.log(err);
        console.error(`An error occured on creating ${filename} file.`);
      } else {
        console.log(`${filename} was successfully created`);
      }
    });

    return;
  }

  await showTablesData();

  const revert = commandLineArguments.includes('--down');
  const files = await fs.promises.readdir(__dirname);

  let seeders = files?.filter(file => file.match(/[\w\d]+((\-|\.)[\w\d])*\.seeder\.js/i)) ?? [];

  if (revert) seeders = seeders.reverse();

  for (const file of seeders) {
    const { up, down } = (await import(`./${file}`)).default;

    if ((revert && !down) || (!revert && !up)) {
      console.error(
        `Cannot run seeders because for ${file}, ${
          revert ? '"down"' : '"up"'
        } function does not exist.`,
      );
    } else {
      revert ? await down() : await up();
    }
  }
};

const showTablesData = async () => {
  const prisma = new PrismaClient();

  console.log(await prisma.user.findMany());
};

main();
