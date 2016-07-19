/**
 * Created by Piers on 18/07/2016.
 */
/**
 * Created by Piers on 12/07/2016.
 */
/**
 * Created by Piers on 08/07/2016.
 */
/**
 * @fileOverview Screeps module. policyAttackStructures.
 * @author Piers Shepperson
 */
"use strict";
var gc = require("gc");
var raceSwordsman = require("race.swordsman");
var PoolRequisition = require("pool.requisition");
var TaskMovePos = require("task.move.pos");
var TaskAttackId = require("task.attack.id");
var TaskAttackTarget = require("task.attack.target");
var TaskMoveFind = require("task.move.find");
var TaskWait = require("task.wait");
var TaskMoveRoom = require("task.move.room");
var Battle = require("battle");
/**
 * Abstract Policy
 * @module policyAttackStructures
 */
var policyHarvestKeeperSector = {
    MARSHALLING_RANGE: 6,
    State: {
        MOVING_OUT: "moving.out",
        MARSHALLING: "marshalling",
    },

    keeper: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
            TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,
            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
            ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,
            RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,
            ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,
            RANGED_ATTACK,ATTACK,RANGED_ATTACK,ATTACK,RANGED_ATTACK],

    initialisePolicy: function (newPolicy) {
        Memory.policies[newPolicy.id].status = this.State.MARSHALLING;
        return true;
    },

    getState: function(creep) {
        return undefined;
    },

    getTaskList: function (policy) {
        var taskList = [];
        return taskList;
    },

    draftNewPolicyId: function(oldPolicy) {
        return oldPolicy;
    },

    enactPolicy: function(currentPolicy) {
        switch(Memory.policies[newPolicy.id].status){
            case this.State.MARSHALLING:
                this.marshalling(currentPolicy);
                break;
            default:
        }
    },

    marshalling: function (policy) {
        Memory.policies[newPolicy.id].status = this.State.MARSHALLING;
        var myAttackCreeps = [];
        var creeps = _.filter(Game.creeps, function (creep) {
            return creep.memory.policyId == currentPolicy.id
        });
        for (var i = 0 ; i < creeps.length ; i++ ) {
            if (raceBase.occurrencesInBody(Game.creeps[i].body, ATTACK) > 0) {
                 if (Game.creeps[i].pos.inRangeTo(policy.marshallingPoint,this.MARSHALLING_RANGE)) {
                    myAttackCreeps.push(Game.creeps[i]);
                }
            }
        }
        if (0 > myAttackCreeps.length) {
            var battleOutcome = battle.quickCombat(this.keeper, myAttackCreeps);
            if (battleOutcome.length == myAttackCreeps.length) {
                movingOut(policy);
            }
        }
    },

    movingOut: function (policy) {
        Memory.policies[newPolicy.id].status = this.State.MOVING_OUT;
        var creeps = _.filter(Game.creeps, function (creep) {
            return creep.memory.policyId == currentPolicy.id
        });
        for (var i = 0 ; i < creeps.length ; i++ ) {
            if (Game.creeps[i].pos.inRangeTo(policy.marshallingPoint,this.MARSHALLING_RANGE)) {
                creeps[i].memory.tasks.taskList = this.moveKeeperRoomTaskList(policy);
            }
        }
    },

    moveKeeperRoomTaskList: function (policy) {

    }

};

module.exports = policyHarvestKeeperSector;





























