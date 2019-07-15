// prod config

export const environment = {
  production: false,
  urls : {
    //aquariumApi : "http://65.29.174.115" //PI
    aquariumApi : "http://ec2-18-220-143-66.us-east-2.compute.amazonaws.com:8080" //AWS
  },
  environmentTag: "PROD"
};
