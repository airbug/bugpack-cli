/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugpack may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugpack.BugPackRegistryEntry')

//@Require('Class')
//@Require('IObjectable')
//@Require('Obj')
//@Require('Set')
//@Require('bugfs.BugFs')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class           = bugpack.require('Class');
    var IObjectable     = bugpack.require('IObjectable');
    var Obj             = bugpack.require('Obj');
    var Set             = bugpack.require('Set');
    var BugFs           = bugpack.require('bugfs.BugFs');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var BugPackRegistryEntry = Class.extend(Obj, {

        _name: "bugpack.BugPackRegistryEntry",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {BugPackRegistry} bugPackRegistry
         * @param {Path} relativePath
         */
        _constructor: function(bugPackRegistry, relativePath) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {boolean}
             */
            this.autoload           = false;

            /**
             * @private
             * @type {BugPackRegistry}
             */
            this.bugPackRegistry    = bugPackRegistry;

            /**
             * @private
             * @type {Set.<string>}
             */
            this.exportSet          = new Set();

            /**
             * @private
             * @type {Path}
             */
            this.relativePath       = relativePath;

            /**
             * @private
             * @type {Set.<string>}
             */
            this.requireSet        = new Set();
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {boolean}
         */
        getAutoload: function() {
            return this.autoload;
        },

        /**
         * @param {boolean} autoload
         */
        setAutoload: function(autoload) {
            this.autoload = autoload;
        },

        /**
         * @return {Set.<string>}
         */
        getExportSet: function() {
            return this.exportSet;
        },

        /**
         * @return {Path}
         */
        getRelativePath: function() {
            return this.relativePath;
        },

        /**
         * @return {Path}
         */
        getResolvedPath: function() {
            return BugFs.resolvePaths([this.bugPackRegistry.getRegistryRootPath(), this.relativePath]);
        },

        /**
         * @return {Set.<string>}
         */
        getRequireSet: function() {
            return this.requireSet;
        },


        //-------------------------------------------------------------------------------
        // IObjectable Implementation
        //-------------------------------------------------------------------------------

        /**
         * @return {Object}
         */
        toObject: function() {
            return {
                path: this.relativePath.getGivenPath(),
                exports: this.exportSet.toArray(),
                requires: this.requireSet.toArray(),
                autoload: this.autoload
            };
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {(Array.<string> | Collection.<string>)} exports
         */
        addAllExports: function(exports) {
            this.exportSet.addAll(exports);
        },

        /**
         * @param {(Array.<string> | Collection.<string>)} requires
         */
        addAllRequires: function(requires) {
            this.requireSet.addAll(requires);
        }
    });


    //-------------------------------------------------------------------------------
    // Interfaces
    //-------------------------------------------------------------------------------

    Class.implement(BugPackRegistryEntry, IObjectable);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugpack.BugPackRegistryEntry', BugPackRegistryEntry);
});
