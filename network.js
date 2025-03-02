  // Your JSON data
  var users = [
    { "name": "User1", "followers": ["User9", "User6", "User5", "User2", "User8"], "imageUrl": "imgs/CP22g90.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User2", "followers": ["User9", "User4", "User6", "User8"], "imageUrl": "imgs/eCivfoJ.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User3", "followers": ["User2", "User1", "User7", "User10", "User9", "User5", "User4", "User6", "User8"], "imageUrl": "imgs/36HstGQ.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User4", "followers": ["User10", "User2", "User7", "User3"], "imageUrl": "imgs/3HUEClt.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User5", "followers": ["User1", "User2", "User9", "User4", "User8", "User7"], "imageUrl": "imgs/TgdWklv.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User6", "followers": [], "imageUrl": "imgs/y9SdHdJ.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User7", "followers": [], "imageUrl": "imgs/eCivfoJ.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User8", "followers": ["User6", "User9", "User5", "User3", "User2", "User4", "User7", "User10"], "imageUrl": "imgs/eCivfoJ.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User9", "followers": ["User1", "User2"], "imageUrl": "imgs/y9SdHdJ.jpg", "url": "https://www.mlnomads.com" },
    { "name": "User10", "followers": ["User8", "User5", "User4"], "imageUrl": "imgs/eCivfoJ.jpg", "url": "https://www.mlnomads.com" }
];

// Process data to create nodes and links
var nodes = users.map(user => ({ id: user.name, followerCount: user.followers.length }));
var links = users.flatMap(user => user.followers.map(follower => ({ source: user.name, target: follower })));

var svgWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var svgHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
svgHeight = 2*svgHeight / 4
svgWidth = svgWidth /2
var svg = d3.select("#tooltip").append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

var defs = svg.append("defs");
users.forEach(function(user) {
    defs.append("pattern")
        .attr("id", "user-image-" + user.name)
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("patternContentUnits", "objectBoundingBox")
        .append("image")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", user.imageUrl);
});


// Define a scale for node size
var maxNodeSize = Math.min(svgWidth, svgHeight) / 25; // Example calculation
var sizeScale = d3.scaleLinear()
    .domain([0, d3.max(nodes, d => d.followerCount)])
    .range([5, maxNodeSize]); // Min and max size of nodes

// Create the simulation
var simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100)) // Increase the distance
    .force("charge", d3.forceManyBody().strength(-100)) // Adjust the strength as needed
    .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2));

// Create links
var link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "link")
    .style("stroke", "#222")
    .style("stroke-opacity", .6)
    .style("stroke-width", 2);

// Create nodes
var node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", d => sizeScale(d.followerCount))
    .style("fill", d => "url(#user-image-" + d.id + ")")
    .on("dblclick", function(event, d) {
        // Open a new tab when the node is double-clicked
        var url = users.find(user => user.name === d.id).url;
        window.open(url, '_blank');
    })
    .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));


// Drag functions
function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    // Display user information
    displayUserInfo(d);

}
function displayUserInfo(userData) {
    var infoContent = document.getElementById('userInfoContent');
    infoContent.innerHTML = '<p>Name: ' + userData.id + '</p>' +
                            '<p>Followers: ' + userData.followerCount + '</p>';
    // Add more user details as needed
}

function clearUserInfo() {
    var infoContent = document.getElementById('userInfoContent');
    infoContent.innerHTML = ''; // Clear the content
}
function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    
    // Hide or clear user information
    clearUserInfo();

}

// Apply drag behavior
node.call(d3.drag()
    .on("start", dragStarted)
    .on("drag", dragged)
    .on("end", dragEnded)
    .filter(event => event.type === "touchstart" || !event.button));

// Tooltip
var tooltip = d3.select("div.tooltip");

node.on("mouseover", function(event, d) {
    tooltip.style("visibility", "visible")
           .html("User: " + d.id + "<br/>Followers: " + d.followerCount)
           .style("left", (event.pageX > window.innerWidth - 260 ? event.pageX - 250 : event.pageX + 15) + "px") // Adjust left position based on viewport width
           .style("top", (event.pageY + 30) + "px") // Adjust top position
           .transition()
           .duration(200)
           .style("opacity", 1);
})
.on("mouseout", function(event, d) {
    tooltip.transition()
           .duration(500)
           .style("opacity", 0)
           .on("end", function() { tooltip.style("visibility", "hidden"); });
});

// Update positions on tick
simulation.on("tick", function() {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("cx", d => d.x)
        .attr("cy", d => d.y);
});