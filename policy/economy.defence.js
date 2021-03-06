/**
 * Created by Piers on 08/08/2016.
 */
/**
 * Created by Piers on 19/07/2016.
 */
/**
 * @fileOverview Requisition object for using the pool
 * @author Piers Shepperson
 */
"use strict";
var roomOwned = require("room.owned");
var routeBase = require("route.base");
var RouteLinker = require("route.linker");
var RouteNeutralPorter = require("route.neutral.porter");
var RouteRemoteActions = require("route.remote.actions");
var RouteRepairer = require("route.repairer");
var RouteFlexiStoragePorter = require("route.flexi.storage.porter");
var gc = require("gc");
var policy = require("policy");
var raceClaimer = require("race.claimer");
var RoutePatrolRoom = require("route.patrol.room");
var RouteGiftCreep  = require("route.gift.creep");
var raceSwordsman = require("race.swordsman");
var raceWorker = require("race.worker");
var RouteWallBuilder = require("route.wall.builder");
/**
 * Requisition object for using the pool
 * @module economyDefence
 */

var economyDefence = {

    attachDefensivePatrol: function (room) {
        var matches = routeBase.filterBuildsF(room, function (build) {
            return build.type == gc.ROUTE_PATROL_ROOM
                && build.patrolRoom == room.name;
        });
        var size = raceBase.maxSizeRoom(gc.RACE_SWORDSMAN, room);
        var body = raceSwordsman.body(size);
        if (matches.length == 0) {
            var order = new RoutePatrolRoom(
                room.name,
                room.name,
                {roomName: room.name, x: 25, y: 25},
                body,
                CREEP_LIFE_TIME,
                room.name
            );
            routeBase.attachRoute(room.name, gc.ROUTE_PATROL_ROOM,
                order,gc.PRIORITY_ROOM_PATROL,room.name);
        }
    }

};
var respawn = CREEP_LIFE_TIME - flag.memory.claimerFrom.distance;
var order = new RoutePatrolRoom(
    room.name,
    flag.pos.roomName,
    {roomName: flag.pos.roomName, x: 25, y: 25},
    body,
    respawn,
    flag.name,
    gc.SWORDSMAN_NEUTRAL_PATROL_SIZE
);
//   console.log(flag,"attachPatrolCreep",JSON.stringify(order));
routeBase.attachRoute(room.name, gc.ROUTE_PATROL_ROOM,
    order,gc.PRIORITY_ROOM_PATROL,flag.name);

module.exports = economyDefence;


























