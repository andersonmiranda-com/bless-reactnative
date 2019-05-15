
const settings = {
    production: {
        apiUrl: "http://blessback-env.rnsmfv3mt4.us-east-1.elasticbeanstalk.com/api"
    },
    development: {
        apiUrl: "http://192.168.1.51:3000/api"
    }
};

const env = "development";
//const env = "production";

export const config = settings[env];
