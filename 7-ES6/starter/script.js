/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/
class TownElement {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }

  calculateAge() {
      return (new Date()).getFullYear() - this.buildYear;
  }
}

class Park extends TownElement{
  constructor(name, buildYear, treeNumber = 0, area = 0) {
    super(name, buildYear);
    this.treeNumber = treeNumber;
    this.area = area;
  }

  calculateTreeDensity() {
    if (this.area > 0) {
      return this.treeNumber/this.area;
    } 
    return 0;
  }
}

class Street extends TownElement {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.length = length;
    this.size = size;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, 'tiny');
    classification.set(2, 'small');
    classification.set(3, 'normal');
    classification.set(4, 'big');
    classification.set(5, 'huge');
    console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street`);
  }
}

class Town {
    constructor (parks, streets) {
        this.parks = parks;
        this.streets = streets;
    }

    calcStats(arr) {
        const sum = arr.reduce((prev, cur) => prev + cur, 0);
        return [sum, sum / arr.length];
    }

    calculateAgeOfParks() {
        const [total, avg] = this.calcStats(this.parks.map( p => p.calculateAge()));

        console.log(`Our ${this.parks.length} parks have an average age of ${avg} years`);
    }

    findParkWithTrees (limit) {
        const park = this.parks.find( p => p.treeNumber > limit);
        console.log(`${park.name} has more than ${limit} trees`);
    }

    calculateTreeDensity() {
        this.parks.forEach(park => {
            const dens = park.calculateTreeDensity();
            console.log(`${park.name} has a tree density of ${dens} trees per square km`);
            
        });
    }

    calculateStreetStatistics() {
        const [ total, avg ] = this.calcStats (this.streets.map( s => s.length));

        console.log(`Our ${this.streets.length} streets have a total length of ${total} km, with an average age of ${avg} km.`);

        
        this.streets.forEach(s => s.classifyStreet());
    }

    generateParksReport() {
        console.log('----PARKS REPORT----');
        this.calculateTreeDensity();
        this.calculateAgeOfParks();
        this.findParkWithTrees(1000);
    }


    generateStreetReport() {
        console.log('----Street REPORT----');
        this.calculateStreetStatistics();
    }
}

const parks = [ new Park('Green Park', 1900, 300, 500), 
              new Park('National Park', 1950, 10000, 500), 
              new Park('Oak Park', 1800, 20000, 50000)];

const streets = [ new Street('Ocean Ave', 1999, 10, 5),
                new Street('Evergreen St', 2008, 2, 2),
                new Street('4th St', 2015, 1, 1),
                new Street('Sunset Ave', 1982, 7)];

const town = new Town(parks, streets);
town.generateParksReport();
town.generateStreetReport();