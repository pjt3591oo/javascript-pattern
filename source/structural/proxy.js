class FlightListAPI {
  getFlight() {
      // get master list of flights
      console.log('Generating flight List');
  }

  searchFlight (flightDetails) {
      // search through the flight list based on criteria
      console.log('Searching for flight');
  }
  
  addFlight(flightData) {
      // add a new flight to the database
      console.log('Adding new flight to DB');
  }
};
  
class FlightListProxy {
  constructor () {
    this.flightList = new FlightListAPI();
  }
  getFlight() {
    return this.flightList.getFlight();
  }

  searchFlight(flightDetails) {
    return this.flightList.searchFlight(flightDetails);
  }

  addFlight(flightData) {
    return this.flightList.addFlight(flightData);
  }
}
  
console.log("----------With Proxy----------")
const proxy = new FlightListProxy()
proxy.getFlight() // Generating flight List
