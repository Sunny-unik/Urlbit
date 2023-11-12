const fs = require("fs-extra");

fs.copy("public", "dist/public")
  .then(() => console.log("Public directory copied successfully!"))
  .catch((err) => console.error(err));

fs.copy("src/views", "dist/src/views")
  .then(() => console.log("Views directory copied successfully!"))
  .catch((err) => console.error(err));
