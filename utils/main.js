function main(program) {
  Promise.resolve()
    .then(() => program())
    .then(
      (exitCode = 0) => {
        process.exit(exitCode);
      },
      error => {
        console.error(error);
        process.exit(1);
      },
    );
}

exports.main = main;
