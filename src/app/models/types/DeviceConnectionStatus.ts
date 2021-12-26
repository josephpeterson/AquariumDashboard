export enum DeviceConnectionStatus {
	Offline,
	Connecting,
	Connected,
	Renew,			//Someone needs to log into aquarium service within the Pi
	Online,			//We are all good!
}
