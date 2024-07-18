/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import fs from "fs";
import qr from "qr-image";
import inquirer from "inquirer";

// Creating a prompt for the user using the Inquirer npm package
inquirer.prompt([{
    // Name of the prompt
    name: "url",
    // The prompt
    message: "Please enter a url you would like to transform",
    type: "input"
}]).then(function(answer) {
    // Creating a qr code based on the user's inputted answer, making it a type png file
    var qr_svg = qr.image(answer.url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));

    // Writing the url the user entered into a txt file named userUrl.txt
    fs.writeFile("userUrl.txt", answer.url, (err) => {
        if(err) throw err;
    })
}).catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

