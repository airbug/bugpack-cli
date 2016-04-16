/*
 * Copyright (c) 2015 airbug Inc. All rights reserved.
 *
 * buildbug may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugpack.BuildPackCli')

//@Require('Class')
//@Require('bugcli.BugCli')
//@Require('bugpack.BugPackApi')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // Common Modules
    //-------------------------------------------------------------------------------

    var path            = require('path');


    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class           = bugpack.require('Class');
    var BugCli          = bugpack.require('bugcli.BugCli');
    var BugPackApi      = bugpack.require('buildbug.BugPackApi');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {BugCli}
     */
    var BugPackCli = Class.extend(BugCli, {

        _name: "buildbug.BuildBugCli",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         */
        _constructor: function() {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {BugPackApi}
             */
            this.bugPackApi     = new BugPackApi();
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {BugPackApi}
         */
        getBugPackApi: function() {
            return this.bugPackApi;
        },


        //-------------------------------------------------------------------------------
        // BugCli Methods
        //-------------------------------------------------------------------------------

        /**
         *
         */
        doConfigure: function(callback) {
            var _this = this;

            this.action({
                command: "help",
                default: true,
                options: [
                    {
                        name: "version",
                        required: false,
                        flags: [
                            '-v',
                            '--version'
                        ]
                    }
                ],
                executeMethod: function(action, callback) {
                    /** @type {CliOptionInstance} */
                    var versionOption   = action.getOption("version");
                    if (versionOption) {
                        _this.getBugPackApi().findVersion(function(throwable, version) {
                            if (!throwable) {
                                console.log("BugPack version " + version);
                            }
                            callback(throwable);
                        })
                    } else {
                        console.log(_this.generateHelpText());
                        callback();
                    }
                }
            });

            this.action({
                command: 'package',
                options: [
                    {
                        name: "target",
                        required: false,
                        flags: [
                            '-d',
                            '--directory'
                        ],
                        parameters: [
                            {
                                name: "directory"
                            }
                        ]
                    }
                ],
                executeMethod: function(cliBuild, cliAction) {
                    /** @type {CliOptionInstance} */
                    var targetOption    = cliBuild.getOption("target");
                    /** @type {CliOptionInstance} */
                    var debugOption     = cliBuild.getOption("debug");
                    /** @type {Array.<string>} */
                    var targetNames     = [];
                    /** @type {boolean} */
                    var debug           = false;

                    if (targetOption) {
                        var targetNamesString = targetOption.getParameter("targetNames");
                        targetNames = targetNamesString.split(",");
                    }
                    if (debugOption) {
                        debug = true;
                    }
                    var buildPath       = process.cwd();
                    var buildBugMaster  = new BuildBugMaster();
                    buildBugMaster.build(buildPath, {targetNames: targetNames, debug: debug}, callback);
                }
            });

            callback();
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('buildbug.BuildBugCli', BuildBugCli);
});
