const loadtest = require('loadtest');

const GETORDERS = {
    url: 'http://localhost:5000/api/orders',
    maxRequests: 100,
    method: "GET",
    concurrency: 10,
};

const GETORDERSID = {
    url: 'http://localhost:5000/api/orders/99',
    maxRequests: 100,
    method: "GET",
    concurrency: 10,
};

const GETPRODUCTSID = {
    url: 'http://localhost:5000/api/products/16',
    maxRequests: 100,
    method: "GET",
    concurrency: 10,
};

const GETPROFIT = {
    url: 'http://localhost:5000/api/profits',
    maxRequests: 100,
    method: "GET",
    concurrency: 10,
};

const GETUSER = {
    url: 'http://localhost:5000/api/allusers',
    maxRequests: 100,
    method: "GET",
    concurrency: 10,
};

const GETWAREHOUSES = {
    url: 'http://localhost:5000/api/warehouses',
    maxRequests: 100,
    method: "GET",
    concurrency: 10,
};

function statusCallback(err, result) {
    if(err) {
        throw err;
    }
    console.log('Total requests: ', result.totalRequests);
    console.log('Request elapsed seconds: ', result.totalTimeSeconds);
    console.log('Requests per second: ', result.rps);
    console.log('Request mean latency: ', result.meanLatencyMs, " ms");

    console.log("Percentage of the requests served within a certain time")
    Object.keys(result.percentiles).map(percentile =>
    {
        console.log(`${percentile}%  ${result.percentiles[percentile]}ms`)
    })
}

loadtest.loadTest(GETPROFIT, statusCallback); //+-
loadtest.loadTest(GETWAREHOUSES, statusCallback); //+
loadtest.loadTest(GETUSER, statusCallback); //+
loadtest.loadTest(GETORDERS, statusCallback); //-
loadtest.loadTest(GETORDERSID, statusCallback); //+
loadtest.loadTest(GETPRODUCTSID, statusCallback); //+