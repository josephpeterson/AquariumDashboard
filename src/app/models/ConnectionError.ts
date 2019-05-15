export class ConnectionError
{
    public description:string = "Unable to resolve the AquariumApi service. Please check your internet connection and try again. You are unable to use this application offline and will not be able to retrieve information about your aquariums."
    public title:string = "Connection Error"
    constructor(public exception) {}
}
