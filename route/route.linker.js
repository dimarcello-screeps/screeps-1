/**
 * Created by Piers on 23/07/2016.
 */
/**
 * Created by Piers on 16/07/2016.
 */
/**
 * Created by Piers on 12/07/2016.
 */
/**
 * @fileOverview Screeps module. Task move object.
 * @author Piers Shepperson
 */
"use strict";
var gc = require("gc");
var stats = require("stats");
var roleBase = require("role.base");
var raceWorker = require("race.worker");
var raceBase = require("race.base");
var raceWorker = require("rase.worker");
/**
 * Task move object. Used when we need to find the object to move to.
 * @module RouteLinker
 */

function  RouteLinker  (room, flagName) {
    this.type = gc.ROUTE_LINKER;
    this.owner = room;
    this.flagName = flagName;
    var flag = Game.flags[flagName];
    if (flag) {
        var workerParts = flag.memory.porterFrom.energyCapacity / (HARVEST_POWER * ENERGY_REGEN_TIME);
        if (room != flag.pos.roomName) workerParts++;
        this.size = Math.min(raceWorker.maxSizeRoom(room), workerParts);
        this.respawnRate = CREEP_LIFE_TIME - flag.memory.porterFrom.distance - CREEP_SPAWN_TIME;
    }
    this.due = 0;
}

RouteLinker.prototype.spawn = function (build, spawn, room ) {
    console.log("trying to spawn RouteLinker");
    var body = raceWorker.body(build.size);
    var name = stats.createCreep(spawn, body, undefined, undefined);
    if (_.isString(name)) {
        roleBase.switchRoles(Game.creeps[name],
            gc.ROLE_NEUTRAL_HARVESTER,
            Game.flags[build.flagName]);
    }
    return name;
};

module.exports = RouteLinker;





























