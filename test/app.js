'use strict';
const EventEmitter = require("events").EventEmitter;

//question 1.1

function iteration(a, b, p, N) {
    let i = 0;
    while (i < N) {
        i = i + p;
        if (i % a == 0 && i % b == 0)
            console.log('buzz');
        else {
            if (i % a == 0) console.log('foo');
            if (i % b == 0) console.log('mit');
        }
    }
}

iteration(2, 3, 5, 20);

//question 1.2 complexit? n carr? : n: size of vector

function multiply(matrix, vector) {
    console.log(vector.length);
    let result = [];
    for (var i = 0; i < vector.length; i++ ) {
        let n = 0;
        console.log(matrix[i].length);

        for (let j = 0; j < vector.length; j++) {
            n += vector[j] * matrix[i][j]
        }
        console.log(n);
        result.push(n);
    }
    console.log(result);
    return result
}

var matrix = [[1, 2, 4], [1, 2, 5], [4, 5, 6]];
var vector = [1, 2 , 3];
console.log(multiply(matrix, vector));

//question 1.3
var phonebook = {};

function addToPhonebook(name, number, phoneBook) {
    phoneBook[name] = number;
}
function getNumber(name, phoneBook) {
    return phoneBook[name];
}
addToPhonebook('oussama', '0767130081', phonebook);
addToPhonebook('tim', '01245', phonebook);

console.log(phonebook);
console.log(getNumber('tim', phonebook));

//question 1.4
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    addEdge(source, destination) {
        if (!this.adjacencyList[source]) {
            this.addVertex(source);
        }
        if (!this.adjacencyList[destination]) {
            this.addVertex(destination);
        }
        this.adjacencyList[source].push(destination);
        this.adjacencyList[destination].push(source);
    }
    removeEdge(source, destination) {
        this.adjacencyList[source] = this.adjacencyList[source].filter(vertex => vertex !== destination);
        this.adjacencyList[destination] = this.adjacencyList[destination].filter(vertex => vertex !== source);
    }
    removeVertex(vertex) {
        while (this.adjacencyList[vertex]) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

    dfs(start) {
        const result = [];
        const stack = [start];
        const visited = {};
        visited[start] = true;
        let currentVertex;
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }
}

var graph = new Graph();


graph.addEdge('a', 'b'); 
graph.addEdge('a', 'e');
graph.addEdge('b', 'c');
graph.addEdge('e', 'f');
graph.addEdge('c', 'f');

console.log(graph.dfs('a'));
//1.5.1
/*
on lib?re pas la m?moire apr?s l'allocation, donc on va finir par ?puiser la m?moire (run out of memory) seg fault
1.5.2
Une raibow table est une table pr?calcul?e pour mettre en cache la sortie des fonctions de hachage cryptographiques, 
g?n?ralement pour d?chiffrer les hachages de mots de passe. Les tables sont g?n?ralement utilis?es pour r?cup?rer une fonction de d?rivation de cl? (ou de num?ros de carte de cr?dit, etc.)
jusqu'? une certaine longueur constitu?e d'un ensemble limit? de caract?res.

Une raibow table est inefficace contre les hachages ? sens unique qui incluent de gros "salt"
*/

//2.1 Decorateur :
var User = function (name) {
    this.name = name;

    this.say = function () {
        console.log("User: " + this.name);
    };
}

var DecoratedUser = function (user, occupation) {
    this.user = user;
    this.name = user.name;  // ensures interface stays the same
    this.occupation = occupation;

    this.say = function () {
        console.log("Decorated User: " + this.name + " is a " +
            this.occupation);
    };
}


    var user = new User("Oussama");
    user.say();

    var decorated = new DecoratedUser(user, "developer");
    decorated.say();

//2.2 Observable:
class User2 extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
        this.say = function () {
            this.emit("saying name", "User: " + this.name);
    }
     
};
}

const myUser = new User2("oussama");
myUser.on("saying name", sentence => console.log(sentence));
myUser.say();

//3.1
/*
 * 1-

Docker peut ?tre class? comme un outil dans la cat?gorie "Plateformes et conteneurs de machines virtuelles", tandis que VirtualBox est regroup? sous "Plateforme de virtualisation.
"Int?gration et d?veloppement rapides", "Isolation" et "Open source" sont les facteurs cl?s pour lesquels les d?veloppeurs envisagent Docker ; alors que "Gratuit", "Facile"  sont les principales raisons pour lesquelles VirtualBox est favoris?.
2-limiter pour r?duire la taille
3-
1-en utilisant SSH pour proteger le socket du docker daemon
2-en utilisant TLS (HTTPS) pour proteger le socket du docker daemon
3-en utilisant la securit? par defaut
 */
//3.2 consulter le fichier docker-compose dans cette solution