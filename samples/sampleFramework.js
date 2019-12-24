//=====================================================================
// This sample framework is used to demonstrate using TeslaJS
//
// https://github.com/mseminatore/TeslaJS
//
// Copyright (c) 2016 Mark Seminatore
//
// Refer to included LICENSE file for usage rights and restrictions
//=====================================================================
"use strict";

var fs = require('fs');
var tjs = require('../teslajs');
require('colors');

function logo() {
    console.log("\n");
    console.log("TTTTT EEEEE SSSSS L     AAAAA     J SSSSS");
    console.log("  T   EEEEE S     L     AAAAA     J S");
    console.log(" TTT        s     L               J S");
    console.log("  T   EEEEE SSSSS L     AAAAA     J SSSSS");
    console.log("  T             S L     A   A     J     S");
    console.log("  T   EEEEE     S L     A   A J   J     S");
    console.log("  T   EEEEE SSSSS LLLLL A   A JJJJJ SSSSS");
    console.log("=========================================");
}

exports.SampleFramework = function SampleFramework(program, main) {
    this.program = program;
    this.tokenFound = false;
    this.main = main;

    this.run = function () {
        var options = {};
        tjs.vehicles(options, function (err, vehicles) {
            if (err) {
                console.log("\nError: " + err);
                return;
            }

            var vehicle = vehicles;
            options.vehicleID = "123";
            options.vehicle_id = "123";
            options.tokens = "";

            if (vehicle.state && vehicle.state.toUpperCase() == "OFFLINE") {
                console.log("\nResult: " + "Unable to contact vehicle, exiting!".bold.red);
                return;
            }

            var carType = tjs.getModel(vehicle);

            console.log("\nVehicle " + process.env.VIN.toString().green + " - " + carType.toString().green + " ( '" + vehicle.vehicle_state.vehicle_name.toString().cyan + "' ) is: " + "online".toString().toUpperCase().bold.green);

            if (main) {
                main(tjs, options);
            }
        });
    }
}
