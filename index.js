/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
 // this module is used to take input from the user and perform processes on the answer
import inquirer from 'inquirer'; 

// this module is used to convert the text into qr-code and save it as png, svg, etc.
import qr from "qr-image"; 

// this module is used to perform CURD operation on a file.
import fs from "fs"; 

inquirer
// Here you will ask questions to the user
  .prompt([
    // Here you can ask questions to the user 
    // The "message" is used to ask questions to the user there are many more which you can view at https://www.npmjs.com/package/inquirer#documentation here it is specified that the question can be of many types i.e types of questions

    {message:"Type in your URL: ", 

    name:"URL",  // the name attribute is used to store the answer you have given to the question
    }
  ])


//   Here you will expect answers from the user 
  .then((answers) => { // the users answer will be stored in the "answers" attribute in object from with a key value pair 

    const url= answers.URL; // in url the URL you have inputted is stored

    // Here the qr-image modle is used to convert the url into a QR and save the image as png
    var qr_svg = qr.image(url); // you can also put an type  

    // this function puts the text or url you provided in the qr-code (This process of putting text into img is called as pipeing(maybe: search on google) )
    qr_svg.pipe(fs.createWriteStream(`./qrcodes/${url.substring(12,17)}.png`));

    // Here we will keep the record of all the url's of which we created qr-codes in the "message.txt" file where each url will be in comma separated format
    fs.appendFile("message.txt",", "+url,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("File saved successfully");
        }
    })
  })
   //the phase of error catching happens here...
  .catch((error) => {
    if (error.isTtyError) {
         // if while taing the input from the user an conerting it into qr code any error occurs the this will throw that error for us to view
      console.log(error);
    } else {
        //if no error occurs then a thank you message will be shown to tell that qr-code was generated successfully....
      console.log("Thank You!"); 
    }
  });
