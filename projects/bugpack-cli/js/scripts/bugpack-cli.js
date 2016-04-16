/*
 * Copyright (c) 2015 airbug Inc. All rights reserved.
 *
 * bugpack-cli may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require("bugpack").loadContext(module, function(error, bugpack) {
    if (!error) {
        bugpack.loadExports(["Flows", "bugpack.BugPackCli"], function(error) {
            if (!error) {

                //-------------------------------------------------------------------------------
                // BugPack
                //-------------------------------------------------------------------------------

                var Flows           = bugpack.require('Flows');
                var BugPackCli      = bugpack.require('bugpack.BugPackCli');


                //-------------------------------------------------------------------------------
                // Simplify References
                //-------------------------------------------------------------------------------

                var $series         = Flows.$series;
                var $task           = Flows.$task;


                //-------------------------------------------------------------------------------
                // Script
                //-------------------------------------------------------------------------------

                var startTime = (new Date()).getTime();
                var bugPackCli = new BugPackCli();
                $series([
                    $task(function(flow) {
                        bugPackCli.configure(function(throwable) {
                            flow.complete(throwable);
                        });
                    }),
                    $task(function(flow) {
                        bugPackCli.run(process.argv, function(throwable) {
                            flow.complete(throwable);
                        });
                    })
                ]).execute(function(throwable) {
                    if (!throwable) {
                        var endTime = (new Date()).getTime();
                        console.log("bugpack ran successfully in " + (endTime - startTime) + " ms");
                    } else {
                        console.log(throwable.message);
                        console.log(throwable.stack);
                        console.log("bugpack encountered an error");
                        process.exit(1);
                    }
                });

            } else {
                console.log(error.message);
                console.log(error.stack);
                process.exit(1);
            }
        });
    } else {
        console.log(error.message);
        console.log(error.stack);
        process.exit(1);
    }
});
