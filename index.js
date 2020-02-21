const server = require('./server.js');

const port = process.env.PORT || 5150;


server.listen(port, () => {
    console.log(`\n*****Quit looking up my port***** \n* * * * * * * * * * * * * \n_____*****${port}*****_____\n* * * * * * * * * * * * *`)
})